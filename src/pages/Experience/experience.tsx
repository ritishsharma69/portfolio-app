import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Avatar, Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import gsap from 'gsap';
import { getExperience } from '@/lib/api';

type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  stack: string[];
};

const placeholder: Role[] = [
  {
    company: 'Company A',
    role: 'Senior Frontend Engineer',
    period: 'Aug 2023 — Present',
    location: 'Remote',
    summary: 'Lead UI engineer building performant, accessible web apps with modern stacks.',
    achievements: [
      'Shipped design‑system components used across 4 products',
      'Improved Lighthouse performance scores from 72 → 94',
      'Partnered with backend to reduce payload size by 35%'
    ],
    stack: ['React', 'TypeScript', 'MUI', 'Vite', 'GSAP']
  }
];

export default function Experience() {
  const [roles, setRoles] = useState<Role[] | null>(null);

  useEffect(() => {
    getExperience()
      .then((data) => setRoles(data.items))
      .catch(() => setRoles(placeholder));
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, { opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power2.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={ref as any}>
      <Typography variant="h3" fontWeight={900} gutterBottom>Experience</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Roles, responsibilities, and impact across recent positions.</Typography>

      <Stack spacing={3}>
        {(roles ?? placeholder).map((r, idx) => (
          <Paper key={`${r.company}-${idx}`} variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderLeft: theme => `3px solid ${theme.palette.primary.main}` }}>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 800 }}>{r.company[0]}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={800}>{r.role} <Typography component="span" color="text.secondary">@ {r.company}</Typography></Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip size="small" label={r.period} />
                    <Chip size="small" label={r.location} variant="outlined" />
                  </Stack>
                </Box>
              </Stack>

              <Typography>{r.summary}</Typography>

              <Box>
                <Typography variant="subtitle2" fontWeight={800} gutterBottom>Key contributions</Typography>
                <Stack component="ul" sx={{ m: 0, pl: 3 }}>
                  {r.achievements.map((a) => (
                    <li key={a}><Typography variant="body2">{a}</Typography></li>
                  ))}
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {r.stack.map((s) => (<Chip key={s} label={s} size="small" />))}
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" fontWeight={800} gutterBottom>Availability</Typography>
      <Typography color="text.secondary">Open to full‑time roles and selected freelance projects. Based in India (IST) with flexible collaboration across time zones.</Typography>
    </Box>
  );
}

