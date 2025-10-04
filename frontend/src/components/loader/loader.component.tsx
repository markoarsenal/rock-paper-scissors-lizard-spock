import type { FC } from 'react';
import styles from './loader.module.scss';
import type { LoaderProps } from './loader.props';
import clsx from 'clsx';

export const Loader: FC<LoaderProps> = ({ text, className }) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-6 px-12 py-4 items-center justify-center animate__animated animate__zoomInDown',
        className,
      )}
    >
      {text && (
        <h3 className="text-3xl text-center font-bold text-shadow-sm animate__animated animate__pulse animate__infinite">
          {text}
        </h3>
      )}
      <div className={styles.loader}></div>
    </div>
  );
};
