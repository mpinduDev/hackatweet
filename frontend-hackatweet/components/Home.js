import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const user = { firstname: 'John', username: 'JohnCena' };

function Home() {
  return (
    <div className={styles.main}>
      <aside className={styles.leftColumn}>
        <span className={styles.logo}>
          <FontAwesomeIcon icon={faTwitter} />
        </span>

        <div>
          <div className={styles.user}>
            <div className={styles.avatar} />
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

        <p className={styles.empty}>Aucun tweet pour le moment.</p>
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
