import { useState, forwardRef } from 'react';
import clsx from 'clsx';
import { triggerHaptic } from '@/helpers/haptic';

import type { ButtonProps } from './button.props';

import styles from './button.module.scss';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled, size = 'medium', direction = 'horizontal', onClick, noAnimation, ...props },
    ref,
  ) => {
    const [clickClassName, setClickClassName] = useState('');

    const localClickHandler = () => {
      if (!clickClassName && !noAnimation) setClickClassName(styles.animate);
    };

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
        onAnimationEnd={() => setClickClassName('')}
        onClick={e => {
          triggerHaptic();
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
