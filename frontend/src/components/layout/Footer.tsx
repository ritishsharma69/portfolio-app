import { useEffect, useState } from 'react';
import { Container, Box, Typography, Link, Stack, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { getSettings } from '@/lib/api';

const INSTAGRAM_FALLBACK = 'https://www.instagram.com/ritishsharmaa?igsh=MWM3eXB0c3J4YnByaQ==';

type Settings = { email?: string; phone?: string; socials?: { [k: string]: string } };

export function Footer() {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState<Settings | null>(null);
  useEffect(() => { getSettings().then(setSettings).catch(() => setSettings(null)); }, []);

  const linkedinHref = settings?.socials?.linkedin || 'https://www.linkedin.com/in/ritish-sharma-qstn';
  const githubHref = settings?.socials?.github || 'https://github.com/ritishsharma69';
  const instagramHref = settings?.socials?.instagram || INSTAGRAM_FALLBACK;

  return (
    <Box component="footer" sx={{ py: 6 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2">© {year} Ritish. All rights reserved.</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {settings?.email && <Link href={`mailto:${settings.email}`} color="inherit" underline="hover">{settings.email}</Link>}
          {settings?.phone && <Typography color="text.secondary">{settings.phone}</Typography>}
          <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
            <IconButton component="a" href={linkedinHref} target="_blank" rel="noopener" aria-label="LinkedIn" size="small" color="inherit">
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton component="a" href={githubHref} target="_blank" rel="noopener" aria-label="GitHub" size="small" color="inherit">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton component="a" href={instagramHref} target="_blank" rel="noopener" aria-label="Instagram" size="small" color="inherit">
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

