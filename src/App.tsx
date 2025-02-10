import Grid from './components/Grid';
import ResetButton from './components/ResetButton';
import { useGridState } from './hooks/useGridState';
import './styles/animations.css';

function App() {
  // Call the custom hook once to manage the grid state.
  const {
    blackBoxes,
    isResetting,
    resetBoxes,
    handleBoxClick,
    isBoxBlack,
    getBoxAnimation,
  } = useGridState();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
           Assessment
        </h1>

        <div className="mb-8">
          {/* Pass the hook's state and callbacks to the Grid component */}
          <Grid
            size={9}
            handleBoxClick={handleBoxClick}
            isBoxBlack={isBoxBlack}
            getBoxAnimation={getBoxAnimation}
            isResetting={isResetting}
          />
        </div>
        {/* This is the reset button used to reset the grid */}
        <ResetButton
          onClick={resetBoxes}
          disabled={blackBoxes.length === 0 || isResetting}
          isResetting={isResetting}
        />
      </div>
    </div>
  );
}

export default App;
