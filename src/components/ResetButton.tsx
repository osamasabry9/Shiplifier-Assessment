import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ResetButtonProps {
  onClick: () => void;
  disabled: boolean;
  isResetting: boolean;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick, disabled, isResetting }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-all duration-200 ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
      }`}
      aria-label={isResetting ? 'Resetting grid...' : 'Reset grid'}
    >
      <RotateCcw className={`w-5 h-5 ${isResetting ? 'animate-spin' : ''}`} />
      {isResetting ? 'Resetting...' : 'Reset Grid'}
    </button>
  );
};

ResetButton.displayName = 'ResetButton';

export default ResetButton;
