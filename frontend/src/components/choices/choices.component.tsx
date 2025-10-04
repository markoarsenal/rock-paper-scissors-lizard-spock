import type { FC } from 'react';
import clsx from 'clsx';

import styles from './choices.module.scss';
import { type ChoicesProps } from './choices.props';
import { options } from './options';
import { Button } from '@/components/button';
import DiceIcon from '@/assets/icons/dice.svg?react';

export const Choices: FC<ChoicesProps> = ({ value, onSelect }) => {
  return (
    <div className="aspect-square w-2/3 max-w-2/3 max-h-2/3 relative">
      {options.map(({ angle, label, image, value: choiceValue }) => {
        const angleInRadians = (angle * Math.PI) / 180;
        const radius = 40;
        const x = 50 + radius * Math.sin(angleInRadians);
        const y = 50 - radius * Math.cos(angleInRadians);

        const isSelected = value === choiceValue;

        return (
          <button
            key={label}
            className={clsx(
              styles.choiceWrapper,
              'w-1/4 absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full',
              isSelected && 'scale-110',
              value
                ? 'cursor-default'
                : 'animate__animated animate__pulse animate__infinite animate__delay-1s transition-transform duration-200 transition-ease cursor-pointer hover:scale-110 active:scale-90',
              value && styles.inactive,
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            onClick={() => onSelect?.(choiceValue)}
          >
            <div
              className={clsx(
                styles.choice,
                'p-2 border-4 aspect-square rounded-full bg-main shadow-default animate__animated animate__zoomInDown',
                isSelected ? 'border-black' : 'border-white',
                !value && 'active:scale-90 active:shadow-secondary',
              )}
            >
              <img src={image} alt={label} className="w-full h-full object-contain" />
              <h3 className={clsx('text-2xl text-shadow-sm absolute -top-8 z-10', isSelected && 'text-black')}>
                {label}
              </h3>
            </div>
          </button>
        );
      })}
      <div className="w-1/4 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
        <Button
          className={clsx(
            'w-full h-full !p-0 !rounded-full animate__animated animate__pulse animate__infinite animate__delay-1s',
            !value && 'active:scale-90 active:shadow-secondary',
          )}
        >
          <DiceIcon width={32} height={32} />
        </Button>
      </div>
    </div>
  );
};
