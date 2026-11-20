import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar';
import timeAgo from '../utils/timeAgo';
import styles from '../styles/Tweet.module.css';
import Link from 'next/link';
import { splitHashtags } from '../utils/hashtags';

function Tweet({
  author,
  content,
  createdAt,
  likes,
  isMine,
  isLiked,
  onLike,
  onDelete,
}) {
  return (
    <article className={styles.tweet}>
      <div className={styles.header}>
        <Avatar />
        <p>
          <span className={styles.firstname}>{author.firstname}</span>{' '}
          <span className={styles.details}>
            @{author.username} ·{' '}
            <span suppressHydrationWarning>{timeAgo(createdAt)}</span>
          </span>
        </p>
      </div>

      <p className={styles.content}>
        {splitHashtags(content).map((part, index) =>
          index % 2 === 1 ? (
            <Link key={index} href={`/hashtag/${part.slice(1).toLowerCase()}`}>
              <a className={styles.hashtag}>{part}</a>
            </Link>
          ) : (
            part
          ),
        )}
      </p>

      <div className={styles.actions}>
        <button
          type='button'
          className={
            isLiked ? `${styles.action} ${styles.liked}` : styles.action
          }
          onClick={onLike}
          aria-label={isLiked ? 'Retirer le like' : 'Aimer'}
        >
          <FontAwesomeIcon icon={faHeart} /> {likes.length}
        </button>
        {isMine && (
          <button
            type='button'
            className={`${styles.action} ${styles.delete}`}
            onClick={onDelete}
            aria-label='Supprimer le tweet'
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        )}
      </div>
    </article>
  );
}

export default Tweet;
