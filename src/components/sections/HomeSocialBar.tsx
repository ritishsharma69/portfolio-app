import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

export default function HomeSocialBar() {
  const links = [
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#' },
    { icon: <GitHubIcon />, label: 'GitHub', href: '#' },
    { icon: <EmailIcon />, label: 'Email', href: 'mailto:ritishfj@gmail.com' },
    { icon: <TwitterIcon />, label: 'Twitter/X', href: '#' },
  ];

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

