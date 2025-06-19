import { useState } from 'react';

// ----------------------------------------------------------------------

export default function useTabs(defaultValues?: string) {
  const [currentTab, setCurrentTab] = useState(defaultValues || '');

  return {
    currentTab,
    onChangeTab: (_: React.SyntheticEvent<Element, Event>, newValue: any) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
