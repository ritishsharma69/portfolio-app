import { useParams } from 'react-router-dom';
import { Box, Breadcrumbs, Chip, Divider, Link, Stack, Typography } from '@mui/material';

export default function ProjectDetail() {
  const { slug } = useParams();

  // Placeholder content; in real use, fetch by slug
  const title = (slug || '').replace(/-/g, ' ').replace(/\b\w/g, (s) => s.toUpperCase()) || 'Project';

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/projects">Projects</Link>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>

      <Typography variant="h3" fontWeight={900} gutterBottom>{title}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>A concise case study of {title} — goals, approach, and outcomes.</Typography>

      <Box sx={{ position: 'relative', aspectRatio: '16/9', borderRadius: 2, bgcolor: 'grey.200', mb: 3 }} />

      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" fontWeight={800} gutterBottom>Overview</Typography>
          <Typography color="text.secondary">This section outlines the problem, constraints, and overall solution direction.</Typography>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} gutterBottom>Tech Stack</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {['React','TypeScript','Node.js','MongoDB','Vite','MUI'].map(t => <Chip key={t} label={t} />)}
          </Stack>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} gutterBottom>Key Features</Typography>
          <Stack component="ul" sx={{ m: 0, pl: 3 }}>
            {['Responsive UI','Authentication','Payments','Analytics','CI/CD'].map(f => <li key={f}><Typography>{f}</Typography></li>)}
          </Stack>
        </Box>
        <Divider />
        <Typography>More sections can go here: Architecture, Challenges, Performance results, Screenshots, etc.</Typography>
      </Stack>
    </Box>
  );
}

