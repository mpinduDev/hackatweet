import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        + <FontAwesomeIcon icon={faTwitter} className={styles.bigLogo} />
      </div>

      <div className={styles.rightSection}>
        <FontAwesomeIcon icon={faTwitter} className={styles.logo} />

        <h1 className={styles.title}>See what's happening</h1>
        <h2 className={styles.subtitle}>Join Hackatweet today.</h2>

        <button className={styles.signUpButton}>Sign up</button>
        <p className={styles.text}>Already have an account?</p>
        <button className={styles.signInButton}>Sign in</button>
      </div>
    </div>
  );
}

export default Login;
