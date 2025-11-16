import { Box, Container, Link } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import type { ReactNode } from 'react';

export function Layout({ children, mode, onToggleMode }: { children: ReactNode; mode: 'light' | 'dark'; onToggleMode: () => void }) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Link href="#main" sx={{ position: 'absolute', left: -9999, top: 8, zIndex: 2000, '&:focus': { left: 8 } }}>Skip to content</Link>
      <Header mode={mode} onToggleMode={onToggleMode} />
      <Container id="main" component="main" maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 3, md: 6 } }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

