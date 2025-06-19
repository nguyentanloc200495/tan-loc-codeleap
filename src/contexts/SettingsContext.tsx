import { ReactNode, useEffect, createContext, useMemo, useCallback } from 'react';
// hooks
import useLocalStorage from 'hooks/useLocalStorage';
// utils
import getColorPresets, { colorPresets, defaultPreset } from 'utils/getColorPresets';
// config
import { defaultSettings } from 'config';
// @type
import {
  ThemeMode,
  ThemeLayout,
  ThemeContrast,
  ThemeDirection,
  ThemeColorPresets,
  SettingsContextProps,
} from 'components/settings/type';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},

  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},

  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},

  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},

  // Color
  onChangeColor: () => {},
  setColor: defaultPreset,
  colorOption: [],

  // Stretch
  onToggleStretch: () => {},

  // Reset
  onResetSetting: () => {},
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
    themeLayout: initialState.themeLayout,
    themeStretch: initialState.themeStretch,
    themeContrast: initialState.themeContrast,
    themeDirection: initialState.themeDirection,
    themeColorPresets: initialState.themeColorPresets,
  });

  const isArabic = localStorage.getItem('i18nextLng') === 'ar';

  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      setSettings({
        ...settings,
        themeDirection: lang === 'ar' ? 'rtl' : 'ltr',
      });
    },
    [settings, setSettings]
  );

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
  }, [isArabic, onChangeDirectionByLang]);

  // Mode

  const onToggleMode = useCallback(() => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  }, [settings, setSettings]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        ...settings,
        themeMode: (event.target as HTMLInputElement).value as ThemeMode,
      });
    },
    [settings, setSettings]
  );

  // Direction

  const onToggleDirection = useCallback(() => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === 'rtl' ? 'ltr' : 'rtl',
    });
  }, [settings, setSettings]);

  const onChangeDirection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        ...settings,
        themeDirection: (event.target as HTMLInputElement).value as ThemeDirection,
      });
    },
    [settings, setSettings]
  );

  // Layout

  const onToggleLayout = useCallback(() => {
    setSettings({
      ...settings,
      themeLayout: settings.themeLayout === 'vertical' ? 'horizontal' : 'vertical',
    });
  }, [settings, setSettings]);

  const onChangeLayout = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        ...settings,
        themeLayout: (event.target as HTMLInputElement).value as ThemeLayout,
      });
    },
    [settings, setSettings]
  );

  // Contrast

  const onToggleContrast = useCallback(() => {
    setSettings({
      ...settings,
      themeContrast: settings.themeContrast === 'default' ? 'bold' : 'default',
    });
  }, [settings, setSettings]);

  const onChangeContrast = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        ...settings,
        themeContrast: (event.target as HTMLInputElement).value as ThemeContrast,
      });
    },
    [settings, setSettings]
  );

  // Color

  const onChangeColor = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        ...settings,
        themeColorPresets: (event.target as HTMLInputElement).value as ThemeColorPresets,
      });
    },
    [settings, setSettings]
  );

  // Stretch

  const onToggleStretch = useCallback(() => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    });
  }, [settings, setSettings]);

  // Reset

  const onResetSetting = useCallback(() => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeContrast: initialState.themeContrast,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets,
    });
  }, [setSettings]);

  const valueMemo = useMemo(
    () => ({
      ...settings,

      // Mode
      onToggleMode,
      onChangeMode,

      // Direction
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,

      // Layout
      onToggleLayout,
      onChangeLayout,

      // Contrast
      onChangeContrast,
      onToggleContrast,

      // Stretch
      onToggleStretch,

      // Color
      onChangeColor,
      setColor: getColorPresets(settings.themeColorPresets),
      colorOption: colorPresets.map((color) => ({
        name: color.name,
        value: color.main,
      })),

      // Reset
      onResetSetting,
    }),
    [
      settings,
      onToggleMode,
      onChangeMode,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      onToggleLayout,
      onChangeLayout,
      onChangeContrast,
      onToggleContrast,
      onToggleStretch,
      onChangeColor,
      onResetSetting,
    ]
  );

  return <SettingsContext.Provider value={valueMemo}>{children}</SettingsContext.Provider>;
}

export { SettingsProvider, SettingsContext };
