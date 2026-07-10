import styles from './Textarea.module.css';

interface TextareaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Textarea = ({ children, className, ...props }: TextareaProps) => {
  return (
    <div className={[styles.textarea, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
