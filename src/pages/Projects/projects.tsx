import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import gsap from 'gsap';

type Category = 'ALL' | 'WEB APPS' | 'MOBILE' | 'OPEN SOURCE' | 'FREELANCE';
const categories: Category[] = ['ALL', 'WEB APPS', 'MOBILE', 'OPEN SOURCE', 'FREELANCE'];

const featured = {
  title: 'E-Commerce Platform',
  blurb: 'Full-featured online store with modern UI/UX',
  features: ['Product catalog & search', 'Shopping cart & checkout', 'Payment integration', 'Admin dashboard', 'Real-time notifications'],
  stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Docker'],
};

const items = [
  { id: 1, title: 'Chat App', desc: 'Real-time messaging platform', stack: ['React', 'Socket.io'], category: 'WEB APPS' as Category },
  { id: 2, title: 'Analytics Dashboard', desc: 'Analytics & metrics platform', stack: ['React', 'D3.js'], category: 'WEB APPS' as Category },
  { id: 3, title: 'AI Tool', desc: 'ML-powered content generator', stack: ['Python', 'TensorFlow'], category: 'OPEN SOURCE' as Category },
  { id: 4, title: 'Task Management', desc: 'Project management tool', stack: ['Vue', 'Express'], category: 'WEB APPS' as Category },
  { id: 5, title: 'Weather App', desc: 'Weather forecast with maps', stack: ['React', 'OpenWeather'], category: 'WEB APPS' as Category },
  { id: 6, title: 'Portfolio', desc: 'Personal website showcase', stack: ['Next.js', 'Framer'], category: 'WEB APPS' as Category },
  { id: 7, title: 'Blog CMS', desc: 'Content management system', stack: ['Strapi', 'GraphQL'], category: 'FREELANCE' as Category },
  { id: 8, title: 'Crypto App', desc: 'Crypto portfolio tracker', stack: ['React', 'CoinGecko'], category: 'WEB APPS' as Category },
  { id: 9, title: 'Recipe App', desc: 'Recipe sharing platform', stack: ['Flutter', 'Firebase'], category: 'MOBILE' as Category },
];

export default function Projects() {
  const [tab, setTab] = useState<Category>('ALL');
  const filtered = useMemo(() => (tab === 'ALL' ? items : items.filter(i => i.category === tab)), [tab]);
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, { opacity: 0, y: 12, duration: 0.5, stagger: 0.05, ease: 'power2.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={ref as any}>
      <Typography variant="h3" fontWeight={800} gutterBottom>My Projects</Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" allowScrollButtonsMobile sx={{ mb: 3 }}>
        {categories.map(c => (
          <Tab key={c} value={c} label={c} sx={{ textTransform: 'none', fontWeight: 600 }} />
        ))}
      </Tabs>

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, alignItems: 'center' }}>
          <Box sx={{ position: 'relative', aspectRatio: '16/10', borderRadius: 2, overflow: 'hidden', bgcolor: 'grey.200' }}>
            <Box sx={{ position: 'absolute', inset: 0, transition: 'transform 300ms', '&:hover': { transform: 'scale(1.03)' } }} />
          </Box>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight={800}>🏆 {featured.title}</Typography>
              <Chip label="Featured" color="secondary" size="small" />
            </Stack>
            <Typography color="text.secondary">{featured.blurb}</Typography>
            <Box component="ul" sx={{ m: 0, pl: 3 }}>
              {featured.features.map(f => (
                <li key={f}><Typography variant="body2">{f}</Typography></li>
              ))}
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {featured.stack.map(s => (<Chip key={s} label={s} size="small" sx={{ mr: 1, mb: 1 }} />))}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button variant="contained">Live Demo</Button>
              <Button variant="outlined">Source Code</Button>
              <Button href={`/projects/${slugify(featured.title)}`}>Case Study</Button>
              <Button>Tech Blog</Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {filtered.map(p => (
          <Card key={p.id}>
            <CardMedia component="div" sx={{ height: 160, bgcolor: 'grey.300' }} />
            <CardContent>
              <Typography variant="h6">{p.title}</Typography>
              <Typography color="text.secondary">{p.desc}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                {p.stack.slice(0,3).map(s => (<Chip key={s} label={s} size="small" />))}
                {'tags' in p && (p as any).tags?.map((t: string) => (<Chip key={t} label={t} size="small" color="secondary" variant="outlined" />))}
              </Stack>
            </CardContent>
            <CardActions>
              <Stack direction="row" spacing={1} sx={{ px: 1, pb: 1 }}>
                <Button size="small" variant="outlined">Demo</Button>
                <Button size="small" variant="contained">Code</Button>
                {'slug' in p && <Button size="small" href={`/projects/${(p as any).slug}`}>Case Study</Button>}
              </Stack>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>Open Source Contributions</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography>🌟 React Component Library - 500+ GitHub stars</Typography>
            <Typography>🌟 Node.js API Boilerplate - 300+ GitHub stars</Typography>
            <Typography>🌟 VS Code Extension - 1K+ downloads</Typography>
            <Box>
              <Button>View on GitHub →</Button>
            </Box>
          </Stack>
        </Paper>
      </Box>

      <Paper variant="outlined" sx={{ mt: 6, p: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>Want to collaborate?</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>Have an interesting project idea? Let's build something amazing together!</Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained">Start a Project</Button>
          <Button variant="outlined">View Resume</Button>
        </Stack>
      </Paper>
    </Box>
  );
}

