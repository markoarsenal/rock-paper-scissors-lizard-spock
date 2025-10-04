import type { FC } from 'react';

import styles from './dice.module.scss';
import clsx from 'clsx';
import { type DiceProps } from './dice.props';

export const Dice: FC<DiceProps> = ({ throw: isThrowing, disabled }) => {
  return (
    <div className={clsx(styles.diceWrap, disabled && styles.disabled)}>
      <div className={clsx(styles.dice, styles.rolling, isThrowing && styles.throw)}>
        <div className={clsx(styles.diceFace, styles.front)}></div>
        <div className={clsx(styles.diceFace, styles.up)}></div>
        <div className={clsx(styles.diceFace, styles.left)}></div>
        <div className={clsx(styles.diceFace, styles.right)}></div>
        <div className={clsx(styles.diceFace, styles.bottom)}></div>
        <div className={clsx(styles.diceFace, styles.back)}></div>
      </div>
    </div>
  );
};
