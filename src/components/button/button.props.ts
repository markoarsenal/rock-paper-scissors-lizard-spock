import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  size?: 'small' | 'medium';
  direction?: 'horizontal' | 'vertical';
  noAnimation?: boolean;
};
