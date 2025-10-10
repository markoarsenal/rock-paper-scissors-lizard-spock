import { useCallback, useMemo, useRef, type FC } from 'react';
import clsx from 'clsx';

import { type ChoicesProps } from './choices.props';
import { choiceOptions } from '@/shared/choice-options';
import { ButtonRandomize } from '@/components/button-randomize';
import { getRandomNumberInRange } from '@/helpers/random-number';
import { useKeyboardControls } from './use-keyboard-controls';

import styles from './choices.module.scss';

export const Choices: FC<ChoicesProps> = ({ value, onSelect }) => {
  const choices = useMemo(() => Object.values(choiceOptions), []);
  const randomizeButtonRef = useRef<HTMLButtonElement>(null);

  const randomizeHandler = () => {
    const number = getRandomNumberInRange(1, 5);
    onSelect?.(choices[number - 1].name);
  };

  const randomizeKeyboardHandler = useCallback(() => {
    randomizeButtonRef.current?.click();
  }, []);

  const selectKeyboardHandler = useCallback((num: number) => onSelect?.(choices[num].name), [choices, onSelect]);

  useKeyboardControls({
    onRandomize: randomizeKeyboardHandler,
    onSelect: selectKeyboardHandler,
  });

  return (
    <div className="aspect-square w-2/3 max-w-2/3 max-h-2/3 mt-12 relative">
      {choices.map(({ value: choiceValue, label, image, name }) => {
        const angle = (choiceValue - 1) * 72;
        const angleInRadians = (angle * Math.PI) / 180;
        const radius = 40;
        const x = 50 + radius * Math.sin(angleInRadians);
        const y = 50 - radius * Math.cos(angleInRadians);

        const isSelected = value === name;

        return (
          <button
            key={label}
            className={clsx(
              styles.choiceWrapper,
              'w-1/4 h-0 pt-[25%] absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full',
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
            onClick={() => onSelect?.(name)}
          >
            <div
              className={clsx(
                styles.choice,
                'absolute top-0 left-0 w-full h-full p-2 border-2 rounded-full bg-main shadow-default animate__animated animate__zoomInDown',
                'lg:border-4',
                isSelected ? 'border-black' : 'border-white',
                !value && 'active:scale-90 active:shadow-secondary',
              )}
            >
              <img src={image} alt={label} className="w-full h-full object-contain" />
              <h3
                className={clsx(
                  'text-md text-shadow-sm absolute -top-8 z-10',
                  'lg:text-2xl',
                  isSelected && 'text-black',
                )}
              >
                {label}
              </h3>
            </div>
          </button>
        );
      })}
      <div className="w-1/4 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate__animated animate__zoomInDown">
        <ButtonRandomize ref={randomizeButtonRef} disabled={Boolean(value)} onClick={randomizeHandler} />
      </div>
    </div>
  );
};
