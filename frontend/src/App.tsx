import { ThemeProvider } from '@mui/material/styles';
import { Baseline } from '@/theme/theme';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Layout } from '@/components/layout/Layout';
import AppRoutes from '@/routes/Router';

function App() {
  const { theme, mode, toggle } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <Baseline />
      <Layout mode={mode} onToggleMode={toggle}>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
