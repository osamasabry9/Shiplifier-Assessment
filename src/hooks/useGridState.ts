import { useState, useCallback, useRef, useEffect } from 'react';

export const useGridState = (onReset?: () => void) => {
  // States for grid management.
  const [blackBoxes, setBlackBoxes] = useState<number[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [resetIndex, setResetIndex] = useState<number>(0);
  const [lastClicked, setLastClicked] = useState<number | null>(null);

  // Refs for keeping track of timers.
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup timers when the hook unmounts.
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      if (resetIntervalRef.current) clearInterval(resetIntervalRef.current);
    };
  }, []);

  // Handle grid box click.
  const handleBoxClick = useCallback(
    (index: number) => {
      if (!blackBoxes.includes(index) && !isResetting) {
        setLastClicked(index);
        setBlackBoxes((prev) => [...prev, index]);

        // Clear any existing timeout before setting a new one.
        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = setTimeout(() => {
          setLastClicked(null);
        }, 300);
      }
    },
    [blackBoxes, isResetting]
  );

  // Reset the grid boxes sequentially.
  const resetBoxes = useCallback(() => {
    if (blackBoxes.length === 0) return;

    // Clear any existing timers.
    if (resetIntervalRef.current) clearInterval(resetIntervalRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

    setIsResetting(true);
    setResetIndex(0);

    const totalBoxes = blackBoxes.length;
    let currentIndex = 0;

    resetIntervalRef.current = setInterval(() => {
      if (currentIndex >= totalBoxes) {
        clearInterval(resetIntervalRef.current!);
        setIsResetting(false);
        setBlackBoxes([]);
        setResetIndex(0);
        setLastClicked(null);
        onReset?.();
      } else {
        setResetIndex(currentIndex);
        currentIndex++;
      }
    }, 150); // Faster animation interval.
  }, [blackBoxes.length, onReset]);

  // Determine if a box should be displayed as black.
  const isBoxBlack = useCallback(
    (index: number) => {
      if (!isResetting) return blackBoxes.includes(index);
      return blackBoxes.includes(index) && blackBoxes.indexOf(index) >= resetIndex;
    },
    [blackBoxes, isResetting, resetIndex]
  );

  // Determine the appropriate animation class for a box.
  const getBoxAnimation = useCallback(
    (index: number) => {
      if (lastClicked === index) return 'animate-click';
      if (isResetting && blackBoxes[resetIndex] === index) return 'animate-reset';
      return '';
    },
    [lastClicked, isResetting, blackBoxes, resetIndex]
  );

  return {
    blackBoxes,
    isResetting,
    lastClicked,
    resetIndex,
    handleBoxClick,
    resetBoxes,
    isBoxBlack,
    getBoxAnimation,
  };
};
