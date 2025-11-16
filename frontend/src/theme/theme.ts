import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export type Mode = 'light' | 'dark';

const getDesignTokens = (mode: Mode): ThemeOptions => ({
  palette: {
    mode,
    primary: { main: '#3B82F6' }, // blue
    secondary: { main: '#10B981' }, // green
    background: {
      default: mode === 'light' ? '#F8FAFC' : '#0B1220',
      paper: mode === 'light' ? '#FFFFFF' : '#0F172A',
    },
    text: {
      primary: mode === 'light' ? '#0F172A' : '#E5E7EB',
      secondary: mode === 'light' ? '#475569' : '#94A3B8',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          textUnderlineOffset: '2px',
          transition: 'color 120ms',
          '&:hover': { color: theme.palette.primary.main },
        }),
      },
    },
  },
});

export const createAppTheme = (mode: Mode) => createTheme(getDesignTokens(mode));

// Optional helper to include CssBaseline alongside ThemeProvider easily
export const Baseline = CssBaseline;

