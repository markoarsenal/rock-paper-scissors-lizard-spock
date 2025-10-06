import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import type { DrawerProps } from './drawer.props';
import { getCssVariable } from '@/helpers/css-variables';

import styles from './drawer.module.scss';

export const Drawer: FC<PropsWithChildren<DrawerProps>> = ({ open, onClose, children }) => {
  const [renderDrawer, setRenderDrawer] = useState(open);
  const closeHandler = () => onClose();

  useEffect(() => {
    // Remove the drawer from the DOM after the animation
    if (!open) {
      setTimeout(() => setRenderDrawer(false), parseInt(getCssVariable('--drawer-animate-duration')));
    } else setRenderDrawer(true);
  }, [open]);

  useEffect(() => {
    // Close the drawer when the escape key is pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      {renderDrawer &&
        createPortal(
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 backdrop-blur-sm" onClick={closeHandler} />
            <div
              className={clsx(
                'w-full absolute inset-0 left-auto bg-white shadow-[-4px_0_10px_rgba(0,0,0,0.15)] animate__animated animate__faster transition !duration-100 md:w-[600px]',
                styles.drawer,
                open && 'animate__slideInRight',
                !open && 'animate__slideOutRight',
              )}
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
