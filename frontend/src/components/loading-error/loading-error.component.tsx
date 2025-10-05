import computerSad from '@/assets/images/computer-sad.png';
import { Button } from '@/components/button';
import RefreshIcon from '@/assets/icons/rotate.svg?react';

export const LoadingError = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-8">
      <img src={computerSad} alt="Error" className="h-[300px]" />
      <h3 className="text-2xl font-bold">Ahhh! Something went wrong.</h3>
      <Button onClick={() => window.location.reload()}>
        Try again <RefreshIcon />
      </Button>
    </div>
  );
};
