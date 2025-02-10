import  { memo } from 'react';

interface BoxProps {
  index: number;
  isBlack: boolean;
  isResetting: boolean;
  animationClass: string;
  onClick: (index: number) => void;
}

const Box = memo(({ index, isBlack, isResetting, animationClass, onClick }: BoxProps) => (
  <button
    onClick={() => onClick(index)}
    className={
      `
      aspect-square rounded-lg border-2 border-gray-200
      transition-all duration-300 ease-in-out
      hover:border-gray-300 hover:shadow-lg
      ${isBlack ? 'bg-gray-900' : 'bg-white'}
      ${animationClass}
      `
    }
    disabled={isResetting}
    aria-label={`Grid box ${index + 1}`}
  />
));

Box.displayName = 'Box';

export default Box;
