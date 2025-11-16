import { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { getSettings } from '@/lib/api';

type Settings = { email?: string; socials?: { linkedin?: string; github?: string; instagram?: string; x?: string } };

export default function HomeSocialBar() {
  const [settings, setSettings] = useState<Settings | null>(null);
  useEffect(() => { getSettings().then(setSettings).catch(() => setSettings(null)); }, []);

  const linkedinHref = settings?.socials?.linkedin || 'https://www.linkedin.com/in/ritish-sharma-qstn';
  const githubHref = settings?.socials?.github || 'https://github.com/ritishsharma69';
  const instagramHref = settings?.socials?.instagram || 'https://www.instagram.com/ritishsharmaa?igsh=MWM3eXB0c3J4YnByaQ==';

  const links = [
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: linkedinHref },
    { icon: <GitHubIcon />, label: 'GitHub', href: githubHref },
    { icon: <InstagramIcon />, label: 'Instagram', href: instagramHref },
    settings?.email && { icon: <EmailIcon />, label: 'Email', href: `mailto:${settings.email}` },
  ].filter(Boolean) as Array<{ icon: JSX.Element; label: string; href: string }>;

  if (!links.length) return null;

  return (
    <Box sx={{ py: 2 }}>
      <Stack direction="row" spacing={1}>
        {links.map((l) => (
          <Tooltip title={l.label} key={l.label}>
            <IconButton component="a" href={l.href} target="_blank" rel="noopener" sx={{
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 200ms ease',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: 2 },
            }}>
              {l.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
}

