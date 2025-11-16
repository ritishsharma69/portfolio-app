import { Box } from '@mui/material';
import HomeHero from '@/components/sections/HomeHero';
import HomeSocialBar from '@/components/sections/HomeSocialBar';
import HomeFeaturedProjects from '@/components/sections/HomeFeaturedProjects';
import HomeStatsCta from '@/components/sections/HomeStatsCta';

export default function Home() {
  return (
    <Box>
      <HomeHero />
      <HomeSocialBar />
      <HomeFeaturedProjects />

      <HomeStatsCta />
    </Box>
  );
}

