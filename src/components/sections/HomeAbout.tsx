import { useLayoutEffect, useRef } from 'react';
import { Box, Chip, Paper, Stack, Typography, Button } from '@mui/material';
import HomeAboutSkills from './HomeAboutSkills';
import gsap from 'gsap';

interface Props { showTitle?: boolean }
export default function HomeAboutSection({ showTitle = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, { opacity: 0, y: 16, duration: 0.6, stagger: 0.06, ease: 'power2.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Stack ref={ref as any} spacing={4} sx={{ mt: { xs: 6, md: 10 } }}>
      {/* Title */}
      {showTitle && <Typography variant="h4" fontWeight={800}>🎯 About Me</Typography>}

      {/* Intro */}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '340px 1fr' }, gap: 3, alignItems: 'center' }}>
          <Box sx={{ position: 'relative', height: 240, borderRadius: 2, bgcolor: 'grey.200', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, transition: 'transform 300ms', '&:hover': { transform: 'scale(1.04)' } }} />
          </Box>
          <Stack spacing={1.5}>
            <Typography variant="h6" fontWeight={800}>🚀 Passionate Developer</Typography>
            <Typography color="text.secondary">
              I'm a creative problem solver who loves building digital experiences that make a real impact.
              I develop responsive web and mobile applications with modern stacks and strong UX focus.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {['📍 Based in India','📧 ritishfj@gmail.com','📱 +91 76819 09401'].map(s => <Chip key={s} label={s} variant="outlined" />)}
            </Stack>
          </Stack>
        </Box>
      </Paper>

      {/* My Journey */}
      <Box>
        <Typography variant="h5" fontWeight={800} gutterBottom>My Journey</Typography>
        <Stack spacing={3}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography fontWeight={700} gutterBottom>🎓 Education</Typography>
            <Stack component="ul" sx={{ m: 0, pl: 3 }}>
              <li><Typography>Chitkara University — B.E. CSE (CGPA 9.4) • Aug 2020 – Aug 2024</Typography></li>
              <li><Typography>Modern Senior Secondary School — Class 12th (78%) • Apr 2019 – Mar 2020</Typography></li>
            </Stack>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography fontWeight={700} gutterBottom>🏆 Achievements</Typography>
            <Stack component="ul" sx={{ m: 0, pl: 3 }}>
              <li><Typography>Delivered performant, responsive apps across web and mobile platforms</Typography></li>
              <li><Typography>Improved performance and load times up to 40% with optimized data pipelines</Typography></li>
              <li><Typography>Collaborated with clients and cross‑functional teams for smooth deliveries</Typography></li>
              <li><Typography>Active open‑source contributor and continuous learner</Typography></li>
            </Stack>
          </Paper>
      {/* My Story */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>My Story</Typography>
        <Stack component="ul" sx={{ m: 0, pl: 3 }}>
          <li><Typography>Started with Computer Science degree in 2018</Typography></li>
          <li><Typography>First role as Junior Developer at a startup</Typography></li>
          <li><Typography>Grew into full‑stack development quickly</Typography></li>
          <li><Typography>Led major project in 2021</Typography></li>
          <li><Typography>Now helping businesses build amazing digital products</Typography></li>
        </Stack>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          “Every line of code I write is a step towards making technology more accessible and user‑friendly.”
        </Typography>
      </Paper>

        </Stack>
      </Box>

      {/* Skills */}
      <Box>
        <Typography variant="h5" fontWeight={800} gutterBottom>Skills & Expertise</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <HomeAboutSkills />
        </Paper>
      </Box>

      {/* Resume Download */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" gap={2}>
          <Box>
            <Typography variant="h6" fontWeight={800}>📄 Resume</Typography>
            <Typography color="text.secondary">Updated: December 2024 • Format: PDF</Typography>
          </Box>
          <Button variant="contained" href="#" target="_blank" rel="noopener">Download Resume PDF</Button>
        </Stack>
      </Paper>

      {/* Interests */}
      <Box>
        <Typography variant="h5" fontWeight={800} gutterBottom>Personal Interests</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {['🎮 Gaming','📚 Reading','🏃‍♂️ Running','✈️ Travel','📷 Photography','🎵 Music','☕ Coffee','🧩 Problem Solving'].map(s => <Chip key={s} label={s} variant="outlined" />)}
        </Stack>
      </Box>

      {/* CTA */}
      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>Let’s connect</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>I’m always excited to discuss new opportunities and collaborate on meaningful projects.</Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained">Download Resume</Button>
          <Button variant="outlined">Contact Me</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

