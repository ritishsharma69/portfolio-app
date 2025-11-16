import { useRef, useState, useLayoutEffect } from 'react';
import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { getSettings } from '@/lib/api';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

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

type Settings = { email?: string; phone?: string; socials?: { linkedin?: string; github?: string; instagram?: string; x?: string; behance?: string } };

export function Header({ mode, onToggleMode }: Props) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const appbarRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    if (!appbarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(appbarRef.current, { y: -60, opacity: 0, duration: 0.6, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, []);

  // Load settings for socials/cta
  useLayoutEffect(() => {
    getSettings().then(setSettings).catch(() => setSettings(null));
  }, []);

  const linkedinHref = settings?.socials?.linkedin || 'https://www.linkedin.com/in/ritish-sharma-qstn';
  const githubHref = settings?.socials?.github || 'https://github.com/ritishsharma69';
  const instagramHref = settings?.socials?.instagram || 'https://www.instagram.com/ritishsharmaa?igsh=MWM3eXB0c3J4YnByaQ==';

  const DrawerContent = (
    <Box component="nav" aria-label="Mobile navigation" sx={{ width: 280 }} onClick={() => setOpen(false)}>
      <Box sx={{ p: 2 }}>
        <Typography component={RouterLink} to="/" variant="h6" sx={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'text.primary', fontWeight: 800, letterSpacing: 0.3, fontFamily: '"Aeonik Trial", Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial' }}>
          Ritish Sharma
        </Typography>
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
        <Toolbar disableGutters sx={{ gap: 1, height: { xs: 56, md: 64 }, overflow: 'visible' }}>
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
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary', fontWeight: 800, letterSpacing: 0.3, fontFamily: '"Aeonik Trial", Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial' }}
          >
            Ritish Sharma
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

          <Stack direction="row" spacing={0.5} alignItems="center">
            {/* Socials (icons) */}
            <IconButton component="a" href={linkedinHref} target="_blank" rel="noopener" aria-label="LinkedIn" size="small" color="inherit">
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton component="a" href={githubHref} target="_blank" rel="noopener" aria-label="GitHub" size="small" color="inherit">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton component="a" href={instagramHref} target="_blank" rel="noopener" aria-label="Instagram" size="small" color="inherit">
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={onToggleMode} color="inherit" aria-label="Toggle theme">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Stack>
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

