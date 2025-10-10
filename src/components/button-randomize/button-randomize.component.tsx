import { useState, type MouseEvent, forwardRef } from 'react';
import clsx from 'clsx';

import { Dice } from '@/components/dice';
import type { ButtonRandomizeProps } from './button-randomize.props';
import { getCssVariable } from '@/helpers/css-variables';

export const ButtonRandomize = forwardRef<HTMLButtonElement, ButtonRandomizeProps>(
  ({ className, disabled, onClick, onRandomizeStart }, ref) => {
    const [isThrowing, setIsThrowing] = useState(false);

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
      if (isThrowing) return;

      onRandomizeStart?.();
      setIsThrowing(true);

      setTimeout(
        () => {
          setIsThrowing(false);
          onClick?.(e);
        },
        parseInt(getCssVariable('--dice-animate-duration')),
      );
    };

    return (
      <button ref={ref} className="[all:unset]" style={{ display: 'block' }} disabled={disabled} onClick={clickHandler}>
        <div
          className={clsx(
            'absolute w-full h-full flex items-center justify-center rounded-full transition-transform duration-200 transition-ease',
            disabled ? 'cursor-default' : 'cursor-pointer hover:scale-120',
            className,
          )}
        >
          <Dice throw={isThrowing} disabled={disabled} />
        </div>
      </button>
    );
  },
);
