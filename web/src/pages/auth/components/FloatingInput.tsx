import React, { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './FloatingInput.module.css';

export type FloatingInputState = 'default' | 'error' | 'success';

interface FloatingInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'placeholder'
> {
  label: string;
  state?: FloatingInputState;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      label,
      state = 'default',
      error,
      success,
      hint,
      leftIcon,
      showPasswordToggle = false,
      type = 'text',
      className,
      id,
      value,
      defaultValue,
      onFocus,
      onBlur,
      disabled,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;
    const messageId = `${inputId}-message`;
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const resolvedValue = value ?? defaultValue ?? '';
    const hasValue = String(resolvedValue).length > 0;
    const floated = focused || hasValue;
    const resolvedState = error ? 'error' : success ? 'success' : state;
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={styles.wrapper}>
        <div
          className={[
            styles.field,
            styles[resolvedState],
            leftIcon ? styles.hasLeftIcon : '',
            showPasswordToggle ? styles.hasPasswordToggle : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

          <input
            {...props}
            ref={ref}
            id={inputId}
            type={inputType}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder=" "
            className={[styles.input, className].filter(Boolean).join(' ')}
            aria-invalid={resolvedState === 'error'}
            aria-describedby={error || success || hint ? messageId : undefined}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
          />

          <label
            htmlFor={inputId}
            className={[styles.label, floated ? styles.labelFloated : ''].join(' ')}
          >
            {label}
          </label>

          {showPasswordToggle && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={disabled}
            >
              {showPassword ? (
                <EyeOff size={18} aria-hidden="true" />
              ) : (
                <Eye size={18} aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {(error || success || hint) && (
          <p
            id={messageId}
            className={[
              styles.message,
              error ? styles.messageError : '',
              success ? styles.messageSuccess : '',
              hint && !error && !success ? styles.messageHint : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role={error ? 'alert' : undefined}
          >
            {error ?? success ?? hint}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';
