import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Auth.module.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Sign in :', username);
  };

  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faTwitter} className={styles.logo} />
      <h3 className={styles.title}>Connect to Hackatweet</h3>

      <input
        type='text'
        placeholder='Username'
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.button} onClick={handleSubmit}>
        Sign in
      </button>
    </div>
  );
}

export default SignIn;
