import { memo } from 'react';
import Box from './Box';

interface GridProps {
  size?: number;
  isResetting: boolean;
  handleBoxClick: (index: number) => void;
  isBoxBlack: (index: number) => boolean;
  getBoxAnimation: (index: number) => string;
}

const Grid = memo(
  ({ size = 9, isResetting, handleBoxClick, isBoxBlack, getBoxAnimation }: GridProps) => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: size }).map((_, index) => (
          <Box
            key={index}
            index={index}
            isBlack={isBoxBlack(index)}
            isResetting={isResetting}
            animationClass={getBoxAnimation(index)}
            onClick={handleBoxClick}
          />
        ))}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
export default Grid;
