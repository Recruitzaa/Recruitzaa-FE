import styles from './AuthPage.module.css';
import logo from '../../assets/logo.png';

export const AuthPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.brandPanel}>
        <img src={logo} alt="Recruitzaa" />
        <h1>Recruitzaa Executive UI/UX Prototype</h1>
        <p>High-fidelity corporate web applications and candidate portals built with clean typography, structured navigation, and instant role-based access.</p>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.card}>
          <div className={styles.tabs}>
            <button className={styles.active}>Job Seeker</button>
            <button>Employer</button>
          </div>
          <h2>Sign in to continue</h2>
          <p>Use your email or Google account to access the correct portal.</p>
          <input placeholder="Email address" />
          <input placeholder="Password" type="password" />
          <button className={styles.primary}>Continue</button>
        </div>
      </section>
    </div>
  );
};
