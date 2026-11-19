import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar';
import timeAgo from '../utils/timeAgo';
import styles from '../styles/Tweet.module.css';

function Tweet({ author, content, createdAt, likes, isMine }) {
  return (
    <article className={styles.tweet}>
      <div className={styles.header}>
        <Avatar />
        <p>
          <span className={styles.firstname}>{author.firstname}</span>{' '}
          <span className={styles.details}>
            @{author.username} · {timeAgo(createdAt)}
          </span>
        </p>
      </div>

      <p className={styles.content}>{content}</p>

      <div className={styles.actions}>
        <span className={styles.action}>
          <FontAwesomeIcon icon={faHeart} /> {likes.length}
        </span>
        {isMine && (
          <span className={styles.action}>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        )}
      </div>
    </article>
  );
}

export default Tweet;
