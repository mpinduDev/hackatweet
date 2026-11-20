const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/users');
const Tweet = require('../models/tweets');

const suffix = Date.now();
const author = {
  firstname: 'Auteur',
  username: `auteur_${suffix}`,
  password: 'secret123',
};
const other = {
  firstname: 'Autre',
  username: `autre_${suffix}`,
  password: 'secret123',
};
let authorToken;
let otherToken;
let tweetId;

beforeAll(async () => {
  const res1 = await request(app).post('/users/signup').send(author);
  authorToken = res1.body.user.token;
  const res2 = await request(app).post('/users/signup').send(other);
  otherToken = res2.body.user.token;
});

afterAll(async () => {
  const users = await User.find({
    username: { $in: [author.username, other.username] },
  });
  await Tweet.deleteMany({ author: { $in: users.map((user) => user._id) } });
  await User.deleteMany({
    username: { $in: [author.username, other.username] },
  });
  await mongoose.connection.close();
});

describe('POST /tweets', () => {
  it('refuse un tweet sans token', async () => {
    const res = await request(app).post('/tweets').send({ content: 'Bonjour' });

    expect(res.statusCode).toBe(401);
  });

  it('refuse un token invalide', async () => {
    const res = await request(app)
      .post('/tweets')
      .set('Authorization', 'Bearer faux_token')
      .send({ content: 'Bonjour' });

    expect(res.statusCode).toBe(401);
  });

  it('refuse un tweet vide', async () => {
    const res = await request(app)
      .post('/tweets')
      .set('Authorization', `Bearer ${authorToken}`)
      .send({ content: '   ' });

    expect(res.statusCode).toBe(400);
  });

  it('refuse un tweet de plus de 280 caractères', async () => {
    const res = await request(app)
      .post('/tweets')
      .set('Authorization', `Bearer ${authorToken}`)
      .send({ content: 'a'.repeat(281) });

    expect(res.statusCode).toBe(400);
  });

  it("crée un tweet au nom de l'utilisateur du token", async () => {
    const res = await request(app)
      .post('/tweets')
      .set('Authorization', `Bearer ${authorToken}`)
      .send({ content: 'Mon premier tweet #test' });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.tweet.content).toBe('Mon premier tweet #test');
    expect(res.body.tweet.author).toEqual({
      firstname: 'Auteur',
      username: author.username,
    });
    expect(res.body.tweet.likes).toEqual([]);
    expect(res.body.tweet.createdAt).toEqual(expect.any(Number));
    tweetId = res.body.tweet.id;
  });
});

describe('GET /tweets', () => {
  it('renvoie la liste des tweets, avec le nouveau tweet', async () => {
    const res = await request(app).get('/tweets');

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.tweets.some((tweet) => tweet.id === tweetId)).toBe(true);
  });
});

describe('PUT /tweets/:id/like', () => {
  it('ajoute un like', async () => {
    const res = await request(app)
      .put(`/tweets/${tweetId}/like`)
      .set('Authorization', `Bearer ${otherToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tweet.likes).toEqual([other.username]);
  });

  it('retire le like au deuxième appel', async () => {
    const res = await request(app)
      .put(`/tweets/${tweetId}/like`)
      .set('Authorization', `Bearer ${otherToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.tweet.likes).toEqual([]);
  });

  it('renvoie 404 pour un tweet inexistant', async () => {
    const res = await request(app)
      .put('/tweets/123/like')
      .set('Authorization', `Bearer ${otherToken}`);

    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /tweets/:id', () => {
  it("refuse la suppression par quelqu'un d'autre que l'auteur", async () => {
    const res = await request(app)
      .delete(`/tweets/${tweetId}`)
      .set('Authorization', `Bearer ${otherToken}`);

    expect(res.statusCode).toBe(403);
  });

  it("supprime le tweet quand c'est l'auteur", async () => {
    const res = await request(app)
      .delete(`/tweets/${tweetId}`)
      .set('Authorization', `Bearer ${authorToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);

    const tweet = await Tweet.findById(tweetId);
    expect(tweet).toBeNull();
  });
});
