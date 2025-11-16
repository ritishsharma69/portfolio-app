import { useRef, useState, useLayoutEffect } from 'react';
import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface Props {
  mode: 'light' | 'dark';
  onToggleMode: () => void;
}

const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

export function Header({ mode, onToggleMode }: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const appbarRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    if (!appbarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(appbarRef.current, { y: -60, opacity: 0, duration: 0.6, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, []);

  const DrawerContent = (
    <Box component="nav" aria-label="Mobile navigation" sx={{ width: 280 }} onClick={() => setOpen(false)}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={800}>Ritish</Typography>
      </Box>
      <Divider />
      <List>
        {nav.map((n) => (
          <ListItemButton
            key={n.to}
            component={RouterLink}
            to={n.to}
            selected={location.pathname === n.to}
            aria-current={location.pathname === n.to ? 'page' : undefined}
            sx={(theme) => ({ '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2, borderRadius: 4 } })}
          >
            <ListItemText primary={n.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar ref={appbarRef} position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <IconButton
            ref={menuBtnRef}
            color="inherit"
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-haspopup="true"
            aria-controls="mobile-nav"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}>
            Ritish
          </Typography>

          <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5 }}>
            {nav.map((n) => (
              <Button
                key={n.to}
                component={RouterLink}
                to={n.to}
                color={location.pathname === n.to ? 'primary' : 'inherit'}
                aria-current={location.pathname === n.to ? 'page' : undefined}
                sx={(theme) => ({ '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2, borderRadius: 4 } })}
              >
                {n.label}
              </Button>
            ))}
          </Box>

          <IconButton onClick={onToggleMode} color="inherit" aria-label="Toggle theme">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        id="mobile-nav"
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
          setTimeout(() => menuBtnRef.current?.focus(), 0);
        }}
        ModalProps={{ keepMounted: true }}
      >
        {DrawerContent}
      </Drawer>
    </AppBar>
  );
}

