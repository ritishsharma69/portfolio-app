import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import gsap from 'gsap';

type Category = 'ALL' | 'WEB' | 'MOBILE' | 'OPEN SOURCE' | 'FREELANCE';
const categories: Category[] = ['ALL', 'WEB', 'MOBILE', 'OPEN SOURCE', 'FREELANCE'];



type Project = {
  title: string;
  slug: string;
  shortDesc: string;
  features: string[];
  tech: string[];
  tags: string[];
  links: { demo?: string; code?: string };
  featured?: boolean;
};


const STATIC_PROJECTS: Project[] = [
  {
    title: 'Khushiya Store',
    slug: 'khushiya-store',
    shortDesc: 'E‑commerce platform (MERN)',
    features: ['Product catalog', 'Cart & checkout', 'Order tracking'],
    tech: ['React', 'Node', 'MongoDB'],
    tags: ['Web', 'E‑commerce'],
    links: {},
    featured: false,
  },
  {
    title: 'Restaurant Booking App',
    slug: 'restaurant-booking-app',
    shortDesc: 'MERN restaurant table booking system',
    features: ['Table reservations', 'Admin management', 'Email confirmations'],
    tech: ['React', 'Node', 'MongoDB'],
    tags: ['Web', 'Bookings'],
    links: {},
    featured: false,
  },
  {
    title: 'News App',
    slug: 'news-app',
    shortDesc: 'Angular + Ionic mobile news application',
    features: ['Category filters', 'Offline reading', 'Push notifications'],
    tech: ['Angular', 'Ionic'],
    tags: ['Mobile'],
    links: {},
    featured: false,
  },
];

const featuredFallback = {
  title: 'Khushiya Store',
  blurb: 'E‑commerce platform (MERN)',
  features: ['Product catalog', 'Cart & checkout', 'Order tracking'],
  stack: ['React', 'Node', 'MongoDB'],
};

// helper to create URL-friendly slugs
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Projects() {
  const [tab, setTab] = useState<Category>('ALL');
  const [projects] = useState<Project[]>(STATIC_PROJECTS);
  const featuredSlug = slugify(featuredFallback.title);
  const filtered = useMemo(() => projects.filter(p => slugify(p.title) !== featuredSlug), [projects]);
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
            <Box component="img" src="/images/khushiyanstore-image.png" alt="Khushiyan Store screenshot"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 300ms', '&:hover': { transform: 'scale(1.03)' } }}
            />
          </Box>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight={800}>🏆 {featuredFallback.title}</Typography>
              <Chip label="Featured" color="secondary" size="small" />
            </Stack>
            <Typography color="text.secondary">{featuredFallback.blurb}</Typography>
            <Box component="ul" sx={{ m: 0, pl: 3 }}>
              {featuredFallback.features.map((f) => (
                <li key={f}><Typography variant="body2">{f}</Typography></li>
              ))}
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {featuredFallback.stack.map((s) => (<Chip key={s} label={s} size="small" sx={{ mr: 1, mb: 1 }} />))}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                component="a"
                href="https://khushiyan.store"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
              <Button
                variant="outlined"
                component="a"
                href="https://github.com/ritishsharma69"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {filtered.map((p) => (
          <Card key={p.slug}>
            <CardMedia component="div" sx={{ height: 160, bgcolor: 'grey.300', backgroundImage: p.slug === 'restaurant-booking-app' ? `url(/images/restaurant-app.png)` : p.slug === 'news-app' ? `url(/images/news-app.png)` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <CardContent>
              <Typography variant="h6">{p.title}</Typography>
              <Typography color="text.secondary">{p.shortDesc}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                {p.tech.slice(0,3).map((s) => (
                  <Chip key={s} label={s} size="small" />
                ))}
                {p.tags?.map((t) => (
                  <Chip key={t} label={t} size="small" color="secondary" variant="outlined" />
                ))}
              </Stack>
            </CardContent>
            <CardActions>
              <Stack direction="row" spacing={1} sx={{ px: 1, pb: 1 }}>
                {p.links?.demo && (
                  <Button size="small" variant="outlined" href={p.links.demo} target="_blank" rel="noopener">Demo</Button>
                )}
                {p.links?.code && (
                  <Button size="small" variant="contained" href={p.links.code} target="_blank" rel="noopener">Code</Button>
                )}

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
          <Button
            variant="outlined"
            component="a"
            href="/RitishS_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

