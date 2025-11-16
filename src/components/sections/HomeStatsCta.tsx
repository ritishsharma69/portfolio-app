import { useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

function useCountUp(target: number, durationMs = 1200) {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (ts: number) => {
      if (start.current == null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / durationMs);
      setVal(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return val;
}

export default function HomeStatsCta() {
  const years = useCountUp(5);
  const projects = useCountUp(50);
  const clients = useCountUp(100);

  return (
    <Stack spacing={4} sx={{ mt: { xs: 6, md: 8 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={900}>{years}+</Typography>
          <Typography color="text.secondary">Years Experience 💼</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={900}>{projects}+</Typography>
          <Typography color="text.secondary">Projects Completed 🚀</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={900}>{clients}+</Typography>
          <Typography color="text.secondary">Happy Clients 😊</Typography>
        </Paper>
      </Box>

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          🚀 Ready to bring your ideas to life?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Let's create something amazing together!
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained">Start a Project</Button>
          <Button variant="outlined">Schedule Call</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

