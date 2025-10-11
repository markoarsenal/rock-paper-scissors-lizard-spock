import { useEffect, useState, type FC } from 'react';
import clsx from 'clsx';

import type { ScoreLineProps } from './score-line.props';
import { Button } from '@/components/button';
import { Drawer } from '@/components/drawer';
import { ScoreHistory } from '@/components/score-history';
import ListIcon from '@/assets/icons/list.svg?react';

export const ScoreLine: FC<ScoreLineProps> = ({ roundResults, className }) => {
  const playerScore = roundResults.filter(({ result }) => result === 'win').length;
  const computerScore = roundResults.filter(({ result }) => result === 'lose').length;

  let playerProgress = playerScore / (playerScore + computerScore);
  let computerProgress = computerScore / (playerScore + computerScore);

  if (playerScore === 0 && computerScore === 0) {
    playerProgress = 0.5;
    computerProgress = 0.5;
  }

  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 1024px)').matches);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isScoreListOpen, setIsScoreListOpen] = useState(false);

  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center gap-4 absolute top-1/2 left-4 -translate-y-1/2 text-3xl font-bold text-shadow-lg animate__animated animate__bounceIn animate__delay-1s',
        'lg:flex-row lg:top-12 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-0',
        className,
      )}
    >
      <div className="text-2xl lg:text-3xl">{playerScore}</div>
      <div className="h-[50vh] w-2 border-2 border-white rounded-xl overflow-hidden shadow-default relative lg:h-4 lg:w-[50vw] lg:border-4">
        <div
          className="w-full absolute top-0 left-0 bg-main lg:h-full transition-all duration-300"
          style={{ ...(isDesktop ? { width: `${playerProgress * 100}%` } : { height: `${playerProgress * 100}%` }) }}
        ></div>
        <div
          className="w-full absolute bottom-0 right-0 bg-secondary lg:h-full transition-all duration-300"
          style={{
            ...(isDesktop ? { width: `${computerProgress * 100}%` } : { height: `${computerProgress * 100}%` }),
          }}
        ></div>
      </div>
      <div className="text-2xl lg:text-3xl">{computerScore}</div>
      <div
        className={clsx(
          'absolute top-1/2 left-full ml-2 -translate-y-1/2',
          'lg:top-full lg:left-1/2 lg:ml-auto lg:-translate-x-1/2 lg:-translate-y-0',
        )}
      >
        <Button size="small" direction={isDesktop ? 'horizontal' : 'vertical'} onClick={() => setIsScoreListOpen(true)}>
          Score List
          <ListIcon width={20} height={20} />
        </Button>
      </div>
      <Drawer open={isScoreListOpen} onClose={() => setIsScoreListOpen(false)}>
        <ScoreHistory roundResults={roundResults} />
      </Drawer>
    </div>
  );
};
