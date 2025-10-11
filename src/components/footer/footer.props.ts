export interface FooterProps {
  gameStarted: boolean;
  resetButtonRef?: React.Ref<HTMLButtonElement>;
  onReset: () => void;
}
