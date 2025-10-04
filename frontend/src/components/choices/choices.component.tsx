import clsx from 'clsx';

import rock from '@/assets/images/play1.png';
import paper from '@/assets/images/play2.png';
import scissors from '@/assets/images/play3.png';
import lizard from '@/assets/images/play4.png';
import spock from '@/assets/images/play5.png';

import styles from './choices.module.scss';

const options = [
  {
    image: rock,
    label: 'Rock',
    angle: 0,
  },
  {
    image: paper,
    label: 'Paper',
    angle: 72,
  },
  {
    image: scissors,
    label: 'Scissors',
    angle: 144,
  },
  {
    image: lizard,
    label: 'Lizard',
    angle: 216,
  },
  {
    image: spock,
    label: 'Spock',
    angle: 288,
  },
];

export const Choices = () => {
  return (
    <div className="aspect-square w-2/3 max-w-2/3 max-h-2/3 relative">
      {options.map(({ angle, label, image }) => {
        const angleInRadians = (angle * Math.PI) / 180;
        const radius = 40;
        const x = 50 + radius * Math.sin(angleInRadians);
        const y = 50 - radius * Math.cos(angleInRadians);

        return (
          <div
            key={label}
            className={clsx(
              styles.choiceWrapper,
              'w-1/4 absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full animate__animated animate__pulse animate__infinite animate__delay-1s transition-transform duration-200 transition-ease hover:scale-110',
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            <div
              className={clsx(
                styles.choice,
                'p-2 border-4 border-white aspect-square rounded-full bg-main shadow-default cursor-pointer animate__animated animate__zoomInDown',
              )}
            >
              <img src={image} alt={label} className="w-full h-full object-contain" />
              <h3 className="text-white text-2xl text-shadow-sm absolute -top-8 z-10">{label}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
