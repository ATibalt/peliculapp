// @src/hooks/useMediaQuery.js
import { useEffect, useState } from 'react';

const useMediaQuery = () => {
  const [state, setState] = useState({
    windowWidth: window.innerWidth
  });

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window.innerWidth;
      setState({ windowWidth: currentWindowWidth });
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [state.windowWidth]);

  return state.windowWidth;
};

export default useMediaQuery;
