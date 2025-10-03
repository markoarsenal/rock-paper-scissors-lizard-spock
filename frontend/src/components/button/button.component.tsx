import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import type { ButtonProps } from './button.props';
import styles from './button.module.scss';

export const Button = ({ children, className, ...props }: ButtonProps) => {
  const [clickClassName, setClickClassName] = useState('');
  const timeout = useRef<number | null>(null);

  const clickHandler = () => {
    if (!clickClassName) {
      setClickClassName(styles.animate);
      timeout.current = setTimeout(() => {
        setClickClassName('');
      }, 500); // Match the animation duration
    }
  };

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return (
    <button className={clsx(styles.button, clickClassName, className)} onClick={clickHandler} {...props}>
      {children}
    </button>
  );
};
