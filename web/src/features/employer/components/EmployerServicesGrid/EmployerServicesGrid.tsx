import { Card } from '../../../../components/ui/Card';
import styles from './EmployerServicesGrid.module.css';
import { ArrowRight, Briefcase, Users, BrainCircuit, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Briefcase className={styles.icon} />,
    title: 'Permanent Placement',
    desc: 'Targeted sourcing and cultural fit evaluation to secure professionals who stay and perform.',
    link: '/employers/permanent',
  },
  {
    icon: <Users className={styles.icon} />,
    title: 'Flexible Staffing',
    desc: 'Manage your flexible staffing end-to-end to scale your workforce quickly.',
    link: '/employers/flexible',
  },
  {
    icon: <BrainCircuit className={styles.icon} />,
    title: 'AI Screening',
    desc: 'Proprietary algorithms match candidate skills to your precise requirements.',
    link: '/employers/ai',
  },
  {
    icon: <LineChart className={styles.icon} />,
    title: 'Workforce Analytics',
    desc: 'Real-time labor market insights to optimize your hiring strategy.',
    link: '/employers/analytics',
  },
];

export const EmployerServicesGrid = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Recruitment Solutions</h2>
          <p className={styles.subtitle}>
            End-to-end talent acquisition designed for modern enterprises.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Card key={service.title} variant="elevated" className={styles.card}>
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <Link to={service.link} className={styles.link}>
                Learn more <ArrowRight size={16} />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
