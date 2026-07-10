const fs = require('fs');
const path = require('path');

const uiComponents = [
  'Button', 'Badge', 'Input', 'Select', 'Textarea', 'Card', 
  'Modal', 'Drawer', 'Spinner', 'Avatar'
];

const getTemplate = (name) => {
  return `import styles from './${name}.module.css';

interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const ${name} = ({ children, className, ...props }: ${name}Props) => {
  return (
    <div className={[styles.${name.toLowerCase()}, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
`;
};

const getCssTemplate = (name) => {
  return `.${name.toLowerCase()} {
  /* Add ${name} styles here */
}
`;
};

uiComponents.forEach(comp => {
  const dir = path.join(__dirname, 'src/components/ui', comp);
  fs.mkdirSync(dir, { recursive: true });
  
  // Component
  let compContent = getTemplate(comp);
  
  // Special cases for inputs/buttons
  if (comp === 'Button') {
    compContent = `import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ children, className, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  const classes = [
    styles.button,
    styles[\`variant-\${variant}\`],
    styles[\`size-\${size}\`],
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
`;
  } else if (comp === 'Input') {
    compContent = `import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substr(2, 9);
    return (
      <div className={styles.wrapper}>
        {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
        <input 
          id={inputId}
          ref={ref} 
          className={[styles.input, error && styles.hasError, className].filter(Boolean).join(' ')} 
          {...props} 
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
`;
  } else if (comp === 'Card') {
    compContent = `import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'flat';
}

export const Card = ({ children, variant = 'default', className, ...props }: CardProps) => {
  return (
    <div className={[styles.card, styles[\`variant-\${variant}\`], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
`;
  }

  fs.writeFileSync(path.join(dir, `${comp}.tsx`), compContent);
  fs.writeFileSync(path.join(dir, `${comp}.module.css`), getCssTemplate(comp));
  fs.writeFileSync(path.join(dir, `index.ts`), `export * from './${comp}';\n`);
});

console.log('UI Components scaffolded!');
