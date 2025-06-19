import { ReactNode, createContext, useState, useEffect, useMemo, useCallback } from 'react';
// hooks
import useResponsive from 'hooks/useResponsive';

// ----------------------------------------------------------------------

export type CollapseDrawerContextProps = {
  isCollapse?: boolean;
  collapseClick: boolean;
  collapseHover: boolean;
  onToggleCollapse: VoidFunction;
  onHoverEnter: VoidFunction;
  onHoverLeave: VoidFunction;
};

const initialState: CollapseDrawerContextProps = {
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
};

const CollapseDrawerContext = createContext(initialState);

type CollapseDrawerProviderProps = {
  children: ReactNode;
};

function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
  const isDesktop = useResponsive('up', 'xl');

  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false,
      });
    }
  }, [isDesktop]);

  const handleToggleCollapse = useCallback(() => {
    setCollapse({ ...collapse, click: !collapse.click });
  }, [collapse]);

  const handleHoverEnter = useCallback(() => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  }, [collapse]);

  const handleHoverLeave = useCallback(() => {
    setCollapse({ ...collapse, hover: false });
  }, [collapse]);

  const valueMemo = useMemo(
    () => ({
      isCollapse: collapse.click && !collapse.hover,
      collapseClick: collapse.click,
      collapseHover: collapse.hover,
      onToggleCollapse: handleToggleCollapse,
      onHoverEnter: handleHoverEnter,
      onHoverLeave: handleHoverLeave,
    }),
    [collapse, handleToggleCollapse, handleHoverEnter, handleHoverLeave]
  );

  return (
    <CollapseDrawerContext.Provider value={valueMemo}>{children}</CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
