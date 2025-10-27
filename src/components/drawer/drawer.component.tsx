import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import type { DrawerProps } from './drawer.props';
import { getCssVariable } from '@/helpers/css-variables';
import XIcon from '@/assets/icons/x.svg?react';
import { triggerHaptic } from '@/helpers/haptic';

import styles from './drawer.module.scss';

export const Drawer: FC<PropsWithChildren<DrawerProps>> = ({ open, onClose, children }) => {
  const [renderDrawer, setRenderDrawer] = useState(open);
  const closeHandler = () => {
    triggerHaptic();
    onClose();
  };

  useEffect(() => {
    // Remove the drawer from the DOM after the animation
    if (!open) {
      setTimeout(() => setRenderDrawer(false), parseInt(getCssVariable('--drawer-animate-duration')));
    } else setRenderDrawer(true);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        // Blur the currently focused element to prevent focus return
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        onClose();
      }
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
          <div id="drawer" className="fixed inset-0 z-50">
            <div className="absolute inset-0 backdrop-blur-sm hidden md:block" onClick={closeHandler} />
            <div
              className={clsx(
                'w-full absolute inset-0 left-auto bg-white shadow-[-4px_0_10px_rgba(0,0,0,0.15)] animate__animated animate__faster transition !duration-100',
                'md:w-[600px]',
                styles.drawer,
                open && 'animate__slideInRight',
                !open && 'animate__slideOutRight',
              )}
            >
              <button
                onClick={closeHandler}
                className="absolute top-4 left-4 p-2 rounded-lg bg-gray-100  cursor-pointer z-10 transition-transform duration-200 hover:scale-110"
                aria-label="Close drawer"
              >
                <XIcon className="w-8 h-8 text-gray-700" />
              </button>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
