const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/users');

const testUser = {
  firstname: 'Test',
  username: `test_${Date.now()}`,
  password: 'secret123',
};

afterAll(async () => {
  await User.deleteOne({ username: testUser.username });
  await mongoose.connection.close();
});

describe('POST /users/signup', () => {
  it('crée un utilisateur et renvoie son token', async () => {
    const res = await request(app).post('/users/signup').send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.user.username).toBe(testUser.username);
    expect(res.body.user.token).toEqual(expect.any(String));
    expect(res.body.user.password).toBeUndefined();
  });

  it('enregistre le mot de passe haché, pas en clair', async () => {
    const user = await User.findOne({ username: testUser.username });

    expect(user.password).not.toBe(testUser.password);
  });

  it('refuse un nom d’utilisateur déjà pris', async () => {
    const res = await request(app).post('/users/signup').send(testUser);

    expect(res.statusCode).toBe(409);
    expect(res.body.result).toBe(false);
  });

  it('refuse des champs manquants', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({ username: 'x' });

    expect(res.statusCode).toBe(400);
    expect(res.body.result).toBe(false);
  });

  it('refuse un mot de passe de moins de 6 caractères', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        firstname: 'A',
        username: `court_${Date.now()}`,
        password: '123',
      });

    expect(res.statusCode).toBe(400);
  });
});

describe('POST /users/signin', () => {
  it('connecte un utilisateur avec le bon mot de passe', async () => {
    const res = await request(app)
      .post('/users/signin')
      .send({ username: testUser.username, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.user.firstname).toBe('Test');
    expect(res.body.user.token).toEqual(expect.any(String));
  });

  it('refuse un mauvais mot de passe', async () => {
    const res = await request(app)
      .post('/users/signin')
      .send({ username: testUser.username, password: 'mauvais' });

    expect(res.statusCode).toBe(401);
    expect(res.body.result).toBe(false);
  });

  it('refuse un utilisateur inconnu', async () => {
    const res = await request(app)
      .post('/users/signin')
      .send({ username: 'personne_ici', password: 'secret123' });

    expect(res.statusCode).toBe(401);
  });
});
