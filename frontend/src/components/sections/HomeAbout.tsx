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
            <Box component="img" src="/images/profileipic.jpeg" alt="Ritish profile"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(0.86)', transition: 'transform 300ms', '&:hover': { transform: 'scale(0.96)' } }}
            />
          </Box>
          <Stack spacing={1.5}>
            <Typography variant="h6" fontWeight={800}>🚀 Passionate Developer</Typography>
            <Typography color="text.secondary">
              I’m a creative problem solver who loves building digital products that make a real impact.
              With experience across web and mobile platforms, I specialize in crafting responsive applications using modern stacks like Vue.js, React, TypeScript, and Angular — always with a strong focus on performance and user experience.
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
            <Typography fontWeight={700} gutterBottom>💼 Experience</Typography>
            <Stack component="ul" sx={{ m: 0, pl: 3 }}>
              <li><Typography>Aman Technologies (2025 – Present): Building full-stack applications with Vue.js, TypeScript, and Scala/Spark, delivering responsive UIs and real-time data integration.</Typography></li>
              <li><Typography>SkyIt (2025): Developed the company website with React, TypeScript, and Tailwind CSS, boosting visual appeal and responsiveness.</Typography></li>
              <li><Typography>Netgen IT Solutions (2024): Created cross-platform apps and booking portals, improving performance by 40% and UI consistency by 30%.</Typography></li>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography fontWeight={700} gutterBottom>🏆 Achievements</Typography>
            <Stack component="ul" sx={{ m: 0, pl: 3 }}>
              <li><Typography>Delivered responsive, cross-platform apps and booking portals for clients across industries.</Typography></li>
              <li><Typography>Improved performance & load times by up to 40% with optimized data pipelines and APIs.</Typography></li>
              <li><Typography>Built interactive dashboards and reservation systems with clean, mobile-first design.</Typography></li>
              <li><Typography>Strong collaborator — worked with clients and teams for smooth, feedback-driven deliveries.</Typography></li>
            </Stack>
          </Paper>
      {/* My Story */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>My Story</Typography>
        <Typography component="div" color="text.secondary">
          From writing my first programs during my Computer Science degree to delivering full-stack solutions for startups and IT companies, my journey has been all about continuous growth and impact.
        </Typography>
        <Typography component="div" color="text.secondary" sx={{ mt: 1 }}>
          I’ve evolved from building simple web apps to designing end-to-end digital products that are fast, scalable, and user-friendly. Today, I’m helping businesses bring their ideas to life — one project at a time.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
          “For me, every project is not just about code — it’s about creating experiences that people love to use.”
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
          <Button variant="contained" href="/ritish_Resume.pdf" download="Ritish_Resume.pdf">Download Resume PDF</Button>
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
          <Button variant="contained" href="/ritish_Resume.pdf" download="Ritish_Resume.pdf">Download Resume</Button>
          <Button variant="outlined">Contact Me</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

