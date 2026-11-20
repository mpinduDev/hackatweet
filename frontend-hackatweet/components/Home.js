import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import Avatar from './Avatar';
import Tweet from './Tweet';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getTrends, extractHashtags } from '../utils/hashtags';
import { useSelector, useDispatch } from 'react-redux';
import { addTweet, toggleLike, deleteTweet } from '../reducers/tweets';
import { logout } from '../reducers/user';

function Home({ hashtag }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tweets = useSelector((state) => state.tweets.value);
  const [newTweet, setNewTweet] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(hashtag ? `#${hashtag}` : '');
  }, [hashtag]);

  useEffect(() => {
    if (!user) router.replace('/');
  }, [user, router]);

  const handleTweet = () => {
    const content = newTweet.trim();
    if (!content) return;
    const tweet = {
      id: Date.now(),
      author: user,
      content,
      createdAt: Date.now(),
      likes: [],
    };

    dispatch(addTweet(tweet));
    setNewTweet('');
  };

  const handleLike = (id) => {
    dispatch(toggleLike({ id, username: user.username }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTweet(id));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim().replace(/^#/, '').toLowerCase();
    if (!value) return;
    router.push(`/hashtag/${value}`);
  };

  const trends = getTrends(tweets);
  const visibleTweets = hashtag
    ? tweets.filter((tweet) =>
        extractHashtags(tweet.content).includes(`#${hashtag.toLowerCase()}`),
      )
    : tweets;
  if (!user) return null;
  return (
    <div className={styles.main}>
      <aside className={styles.leftColumn}>
        <Link href='/home'>
          <a className={styles.logo} aria-label='Accueil'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </Link>

        <div>
          <div className={styles.user}>
            <Avatar />
            <div>
              <p className={styles.firstname}>{user.firstname}</p>
              <p className={styles.username}>@{user.username}</p>
            </div>
          </div>
          <button
            type='button'
            className={styles.logout}
            onClick={() => dispatch(logout())}
          >
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className={styles.center}>
        <h2 className={styles.columnTitle}>
          {hashtag ? 'Hashtag' : 'Accueil'}
        </h2>

        {hashtag ? (
          <form className={styles.newTweet} onSubmit={handleSearch}>
            <input
              type='text'
              className={styles.searchInput}
              placeholder='Rechercher un hashtag'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        ) : (
          <div className={styles.newTweet}>
            <textarea
              className={styles.textarea}
              placeholder='Quoi de neuf ?'
              maxLength={280}
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
            />
            <div className={styles.newTweetFooter}>
              <span
                className={
                  newTweet.length === 280
                    ? `${styles.counter} ${styles.counterMax}`
                    : styles.counter
                }
              >
                {newTweet.length}/280
              </span>
              <button
                type='button'
                className={styles.tweetButton}
                onClick={handleTweet}
                disabled={!newTweet.trim()}
              >
                Tweeter
              </button>
            </div>
          </div>
        )}
        {visibleTweets.length === 0 ? (
          <p className={styles.empty}>
            {hashtag
              ? `Aucun tweet avec #${hashtag}.`
              : 'Aucun tweet pour le moment.'}
          </p>
        ) : (
          visibleTweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              {...tweet}
              isMine={tweet.author.username === user.username}
              isLiked={tweet.likes.includes(user.username)}
              onLike={() => handleLike(tweet.id)}
              onDelete={() => handleDelete(tweet.id)}
            />
          ))
        )}
      </main>
      <aside className={styles.rightColumn}>
        <h2 className={styles.columnTitle}>Tendances</h2>

        <div className={styles.trendsBox}>
          {trends.length === 0 ? (
            <p className={styles.empty}>Aucune tendance pour le moment.</p>
          ) : (
            trends.map((trend) => (
              <Link
                key={trend.hashtag}
                href={`/hashtag/${trend.hashtag.slice(1)}`}
              >
                <a
                  className={
                    trend.hashtag === `#${hashtag}`
                      ? `${styles.trend} ${styles.trendActive}`
                      : styles.trend
                  }
                >
                  <p className={styles.trendName}>{trend.hashtag}</p>
                  <p className={styles.trendCount}>
                    {trend.count} {trend.count > 1 ? 'Tweets' : 'Tweet'}
                  </p>
                </a>
              </Link>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

export default Home;
