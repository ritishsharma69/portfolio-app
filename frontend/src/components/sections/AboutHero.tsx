import { Box, Stack, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function AboutHero() {
  return (
    <Box sx={{ pt: { xs: 2, md: 1 }, pb: { xs: 2, md: 1 } }}>
      <Stack spacing={1.5}>
        <Typography variant="h3" fontWeight={900} component="h1">
          About Me
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 800 }}>
          I’m a developer focused on building fast, accessible, and delightful digital products. Here’s my journey, skills, and how to reach me.
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ pt: 0.5 }}>
          <Button variant="contained" component={RouterLink} to="/contact">Contact Me</Button>
          <Button variant="outlined" component={RouterLink} to="/projects">View Projects</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

