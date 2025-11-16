import { useLayoutEffect, useRef } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import gsap from 'gsap';

const projects = [
  { id: 'khushiya', title: 'Khushiya Store', desc: 'E‑commerce platform (MERN)', stack: ['React', 'Node', 'MongoDB'], to: '/projects', img: '/images/khushiyanstore-image.png' },
  { id: 'restaurant', title: 'Restaurant Booking App', desc: 'MERN booking system', stack: ['React', 'Node', 'MongoDB'], to: '/projects', img: '/images/restaurant-app.png' },
  { id: 'news', title: 'News App', desc: 'Angular + Ionic mobile app', stack: ['Angular', 'Ionic'], to: '/projects', img: '/images/news-app.png' },
];

export default function HomeFeaturedProjects() {
  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', { opacity: 0, y: 14, duration: 0.55, stagger: 0.07, ease: 'power2.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Box sx={{ mt: { xs: 5, md: 8 } }} ref={ref as any}>
      <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={800}>🏆 Featured Work</Typography>
        <Button component={RouterLink} to="/projects">View all projects →</Button>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {projects.map(p => (
          <Card key={p.id} className="feat-card" sx={{ transition: 'transform 200ms ease, box-shadow 200ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
            {p.img ? (
              <CardMedia component="img" image={p.img} alt={`${p.title} screenshot`} sx={{ height: 160, objectFit: 'cover' }} />
            ) : (
              <CardMedia component="div" sx={{ height: 160, bgcolor: 'grey.200' }} />
            )}
            <CardContent>
              <Typography variant="h6">{p.title}</Typography>
              <Typography color="text.secondary">{p.desc}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {p.stack.map(s => (<Chip key={s} label={s} size="small" />))}
              </Stack>
            </CardContent>
            <CardActions>
              <Button size="small" component={RouterLink} to={p.to} variant="outlined">View More</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

