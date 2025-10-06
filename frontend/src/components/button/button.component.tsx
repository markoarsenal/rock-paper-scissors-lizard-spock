import { useState, useRef, useEffect, forwardRef } from 'react';
import clsx from 'clsx';

import type { ButtonProps } from './button.props';
import { getCssVariable } from '@/helpers/css-variables';

import styles from './button.module.scss';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled, size = 'medium', direction = 'horizontal', onClick, noAnimation, ...props },
    ref,
  ) => {
    const [clickClassName, setClickClassName] = useState('');
    const timeout = useRef<number | null>(null);

    const localClickHandler = () => {
      if (!clickClassName && !noAnimation) {
        setClickClassName(styles.animate);
        timeout.current = setTimeout(() => setClickClassName(''), parseInt(getCssVariable('--btn-animate-duration')));
      }
    };

    useEffect(() => {
      return () => {
        if (timeout.current) clearTimeout(timeout.current);
      };
    }, []);

    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          size === 'small' && styles.small,
          direction === 'vertical' && styles.vertical,
          disabled && styles.disabled,
          clickClassName,
          className,
        )}
        onClick={e => {
          localClickHandler();
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);
