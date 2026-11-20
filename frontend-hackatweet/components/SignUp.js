import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { API_URL } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Auth.module.css';

function SignUp({ onSuccess, onSwitch }) {
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = 'Le prénom est obligatoire.';
    if (!username.trim())
      newErrors.username = "Le nom d'utilisateur est obligatoire.";
    if (password.length < 6)
      newErrors.password =
        'Le mot de passe doit contenir au moins 6 caractères.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, username, password }),
      });
      const data = await response.json();

      if (!data.result) {
        setErrors({ form: data.error });
        return;
      }

      dispatch(login(data.user));
      setFirstname('');
      setUsername('');
      setPassword('');
      onSuccess();
    } catch (error) {
      setErrors({ form: 'Impossible de joindre le serveur.' });
    }
  };
  const fieldClass = (name) =>
    errors[name] ? `${styles.field} ${styles.invalid}` : styles.field;

  return (
    <>
      <span className={styles.logo}>
        <FontAwesomeIcon icon={faTwitter} />
      </span>
      <h3 className={styles.title}>Créez votre compte Hackatweet</h3>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div>
          <div className={fieldClass('firstname')}>
            <input
              type='text'
              placeholder='Prénom'
              autoComplete='given-name'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <p className={styles.error}>{errors.firstname}</p>
        </div>
        <div>
          <div className={fieldClass('username')}>
            <input
              type='text'
              placeholder="Nom d'utilisateur"
              autoComplete='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className={styles.error}>{errors.username}</p>
        </div>
        <div>
          <div className={fieldClass('password')}>
            <input
              type='password'
              placeholder='Mot de passe'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className={styles.error}>{errors.password}</p>
        </div>
        <p className={styles.error}>{errors.form}</p>
        <button className={styles.submit} type='submit'>
          S&rsquo;inscrire
        </button>
      </form>
      <p className={styles.switch}>
        Vous avez déjà un compte ?{' '}
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            onSwitch();
          }}
        >
          Se connecter
        </a>
      </p>
    </>
  );
}

export default SignUp;
