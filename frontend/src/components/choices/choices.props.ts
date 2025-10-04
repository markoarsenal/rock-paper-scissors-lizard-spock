export enum Choice {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors',
  LIZARD = 'lizard',
  SPOCK = 'spock',
}

export type ChoicesProps = {
  value?: Choice;
  onSelect?: (choice: Choice) => void;
};
