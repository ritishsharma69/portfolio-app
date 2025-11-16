import { Box, Divider } from '@mui/material';
import AboutHero from '@/components/sections/AboutHero';
import HomeAboutSection from '@/components/sections/HomeAbout';

export default function About() {
  return (
    <Box>
      <AboutHero />
      <Divider sx={{ my: { xs: 3, md: 4 } }} />
      <HomeAboutSection showTitle={false} />
    </Box>
  );
}

