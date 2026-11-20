import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import SignUp from './SignUp';
import SignIn from './SignIn';

function Login() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);

  useEffect(() => {
    if (user) router.push('/home');
  }, [user, router]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      <main className={styles.main}>
        <section className={styles.visual}>
          <span className={styles.logoBig}>
            <FontAwesomeIcon icon={faTwitter} />
          </span>
        </section>
        <section className={styles.content}>
          <span className={styles.logoSmall}>
            <FontAwesomeIcon icon={faTwitter} />
          </span>
          <h1 className={styles.title}>
            Découvrez ce qui
            <br />
            se passe
          </h1>
          <h2 className={styles.subtitle}>
            Rejoignez Hackatweet dès aujourd&rsquo;hui.
          </h2>
          <div className={styles.actions}>
            <button
              type='button'
              className={`${styles.btn} ${styles.btnBlue}`}
              onClick={() => setModal('signup')}
            >
              S&rsquo;inscrire
            </button>
            <p className={styles.already}>Avez-vous déjà un compte ?</p>
            <button
              type='button'
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={() => setModal('signin')}
            >
              Se connecter
            </button>
          </div>
        </section>
      </main>
      {modal && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modal} role='dialog' aria-modal='true'>
            <button
              type='button'
              className={styles.close}
              aria-label='Fermer'
              onClick={closeModal}
            >
              ✕
            </button>

            {modal === 'signup' ? (
              <SignUp
                onSuccess={closeModal}
                onSwitch={() => setModal('signin')}
              />
            ) : (
              <SignIn
                onSuccess={closeModal}
                onSwitch={() => setModal('signup')}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
