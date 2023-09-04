import React from 'react';
import { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { GlobalStyles } from './globalStyles';
import { customShadows } from './customShadows';
import componentsOverride from './overrides'

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeOptions: ThemeOptions = useMemo(() => ({
    palette: palette(),
    typography: typography,
    shape: { borderRadius: 8 },
    shadows: shadows(),
    customShadows: customShadows(),
  }), [])

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />

        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}