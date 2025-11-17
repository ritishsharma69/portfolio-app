import { useLayoutEffect, useRef } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import gsap from 'gsap';

export default function HomeHero() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-item', { opacity: 0, y: 18, duration: 0.6, stagger: 0.08, ease: 'power2.out' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={root as any} className="home-hero" sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
      alignItems: 'center',
      gap: { xs: 3, md: 6 },
      py: { xs: 4, md: 6 },
    }}>
      {/* Headshot placeholder (image to be provided later) */}
      <Box className="hero-item" sx={{ position: 'relative', justifySelf: { xs: 'center', md: 'start' } }}>
        <Box sx={{
          width: { xs: 220, md: 280 },
          height: { xs: 220, md: 280 },
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #eaeaea, #f8f8f8)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06), inset 0 0 0 8px rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 300ms ease, box-shadow 300ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12), inset 0 0 0 8px rgba(0,0,0,0.08)',
          },
        }}>
          <Box component="img" src="/images/profilepic2.jpeg" alt="Ritish profile"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>

      {/* Text + CTAs */}
      <Stack className="hero-item" spacing={2}>
        <Typography variant="h3" fontWeight={800}>👋 Hi, I'm Ritish</Typography>
        <Typography variant="h5" color="text.secondary">🚀 Full Stack Developer</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 640 }}>
          "I build digital experiences that users love."
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ mt: 1, flexWrap: 'wrap' }}>
          <Button component={RouterLink} to="/projects" size="medium" variant="contained">View My Work</Button>
          <Button component={RouterLink} to="/contact" size="medium" variant="outlined">Contact</Button>
          <Button size="medium" variant="text" startIcon={<DownloadIcon />} href="/RitishS_Resume.pdf" download="RitishS_Resume.pdf">
            Download CV
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

