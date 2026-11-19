import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import Avatar from './Avatar';
import Tweet from './Tweet';

const user = { firstname: 'John', username: 'JohnCena' };
const tweets = [
  {
    id: 3,
    author: { firstname: 'John', username: 'JohnCena' },
    content: "YOU CAN'T SEE ME ! #cenation",
    createdAt: Date.now() - 10 * 1000,
    likes: ['JohnCena'],
  },
  {
    id: 2,
    author: { firstname: 'Antoine', username: 'AntoineLeProf' },
    content: 'Welcome to #hackatweet guys 😎',
    createdAt: Date.now() - 5 * 60 * 60 * 1000,
    likes: [],
  },
  {
    id: 1,
    author: { firstname: 'Antoine', username: 'AntoineLeProf' },
    content: 'First! #hackatweet #first',
    createdAt: Date.now() - 5 * 60 * 60 * 1000 - 60 * 1000,
    likes: ['AntoineLeProf'],
  },
];

function Home() {
  return (
    <div className={styles.main}>
      <aside className={styles.leftColumn}>
        <span className={styles.logo}>
          <FontAwesomeIcon icon={faTwitter} />
        </span>

        <div>
          <div className={styles.user}>
            <Avatar />
            <div>
              <p className={styles.firstname}>{user.firstname}</p>
              <p className={styles.username}>@{user.username}</p>
            </div>
          </div>
          <button type='button' className={styles.logout}>
            Se déconnecter
          </button>
        </div>
      </aside>

      <main className={styles.center}>
        <h2 className={styles.columnTitle}>Accueil</h2>

        <div className={styles.newTweet}>
          <textarea className={styles.textarea} placeholder='Quoi de neuf ?' />
          <div className={styles.newTweetFooter}>
            <span className={styles.counter}>0/280</span>
            <button type='button' className={styles.tweetButton}>
              Tweeter
            </button>
          </div>
        </div>

        {tweets.length === 0 ? (
          <p className={styles.empty}>Aucun tweet pour le moment.</p>
        ) : (
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              {...tweet}
              isMine={tweet.author.username === user.username}
            />
          ))
        )}
      </main>
      <aside className={styles.rightColumn}>
        <h2 className={styles.columnTitle}>Tendances</h2>

        <div className={styles.trendsBox}>
          <div className={styles.trend}>
            <p className={styles.trendName}>#hackatweet</p>
            <p className={styles.trendCount}>2 Tweets</p>
          </div>
          <div className={styles.trend}>
            <p className={styles.trendName}>#first</p>
            <p className={styles.trendCount}>1 Tweet</p>
          </div>
          <div className={styles.trend}>
            <p className={styles.trendName}>#cenation</p>
            <p className={styles.trendCount}>1 Tweet</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Home;
