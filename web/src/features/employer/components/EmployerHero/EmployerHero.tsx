import styles from './EmployerHero.module.css';
import { Button } from '../../../../components/ui/Button';
import { Link } from 'react-router-dom';

export const EmployerHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Enterprise Staffing & <span className={styles.highlight}>Precision Hiring</span>
          </h1>
          <p className={styles.subtitle}>
            Leverage our AI-driven talent acquisition platform to scale your workforce quickly,
            respond to seasonal demand, and secure professionals who perform.
          </p>
          <div className={styles.actions}>
            <Link to="/register?intent=employer">
              <Button size="lg" className={styles.primaryBtn}>
                Start Hiring
              </Button>
            </Link>
            <Button size="lg" variant="outline" className={styles.secondaryBtn}>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
