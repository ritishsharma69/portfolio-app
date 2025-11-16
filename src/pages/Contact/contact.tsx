import { useState } from 'react';
import { Box, Paper, Stack, TextField, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Chip, Divider, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      form.message,
    ];
    const mailto = `mailto:ritishfj@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    try {
      window.location.href = mailto;
      setStatus('idle');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={800} gutterBottom>Get In Touch</Typography>

      {/* Hero message */}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>Let's discuss your next big idea!</Typography>
        <Typography color="text.secondary">I'm always excited to work on interesting projects and help bring visions to life.</Typography>
      </Paper>

      {/* Main contact section */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box component="form" noValidate onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField label="Full Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth error={!!errors.name} helperText={errors.name} />
              <TextField label="Email Address" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required fullWidth error={!!errors.email} helperText={errors.email} />
              <TextField label="Subject" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required fullWidth error={!!errors.subject} helperText={errors.subject} />
              <TextField label="Your Message" name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required fullWidth multiline minRows={5} error={!!errors.message} helperText={errors.message} />
              {status === 'error' && <Alert severity="error">Could not open your mail client. Please email me directly at ritishfj@gmail.com.</Alert>}
              <Button variant="contained" type="submit" disabled={status === 'sending'}>Send Message 🚀</Button>
            </Stack>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            <Typography>📧 ritishfj@gmail.com</Typography>
            <Typography>📱 +91 76819 09401</Typography>
            <Typography>📍 India</Typography>
            <Typography>🕒 Mon–Fri, 9 AM – 6 PM (IST)</Typography>
            <Divider />
            <Typography fontWeight={700}>Social Links</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {['LinkedIn','GitHub','Twitter','Instagram','Behance'].map(s => (
                <Chip key={s} label={s} variant="outlined" />
              ))}
            </Stack>
            <Divider />
            <Typography fontWeight={700}>Quick Response</Typography>
            <Typography color="text.secondary">⚡ Usually respond within 24 hours. Free consultation available.</Typography>
          </Stack>
        </Paper>
      </Box>

      {/* Services Offered */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>Services Offered</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
          {[
            { icon: '🎨', title: 'WEB DEV', bullets: ['Frontend','React/Vue','UI/UX'], price: '$50/hr' },
            { icon: '⚙️', title: 'BACKEND', bullets: ['APIs','Databases','Cloud'], price: '$60/hr' },
            { icon: '📱', title: 'MOBILE', bullets: ['iOS','Android','Hybrid'], price: '$70/hr' },
          ].map(card => (
            <Paper key={card.title} variant="outlined" sx={{ p: 2 }}>
              <Typography fontSize={28}>{card.icon}</Typography>
              <Typography variant="h6" fontWeight={800}>{card.title}</Typography>
              <Stack component="ul" sx={{ m: 0, pl: 3 }}>
                {card.bullets.map(b => (<li key={b}><Typography>{b}</Typography></li>))}
              </Stack>
              <Typography sx={{ mt: 1 }} color="text.secondary">Starting at {card.price}</Typography>
            </Paper>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mt: 3 }}>
          {[
            { icon: '☁️', title: 'DEVOPS', bullets: ['AWS/Azure','Docker','CI/CD'], price: '$80/hr' },
            { icon: '🎯', title: 'CONSULTING', bullets: ['Tech Stack','Architecture','Strategy'], price: '$100/hr' },
            { icon: '🚀', title: 'MENTORING', bullets: ['Code Review','Career Guide','Skill Dev'], price: '$40/hr' },
          ].map(card => (
            <Paper key={card.title} variant="outlined" sx={{ p: 2 }}>
              <Typography fontSize={28}>{card.icon}</Typography>
              <Typography variant="h6" fontWeight={800}>{card.title}</Typography>
              <Stack component="ul" sx={{ m: 0, pl: 3 }}>
                {card.bullets.map(b => (<li key={b}><Typography>{b}</Typography></li>))}
              </Stack>
              <Typography sx={{ mt: 1 }} color="text.secondary">Starting at {card.price}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* FAQ */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>FAQ</Typography>
        {[
          { q: 'How long does a typical project take?', a: 'Most projects are completed within 2-8 weeks.' },
          { q: 'Do you work with international clients?', a: 'Yes! I work with clients globally across timezones.' },
          { q: "What's your preferred communication method?", a: 'Email, Slack, or video calls - whatever works best.' },
          { q: 'Do you provide ongoing support?', a: 'Yes, I offer maintenance and support packages.' },
        ].map(item => (
          <Accordion key={item.q}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Location & Availability */}
      <Paper variant="outlined" sx={{ mt: 6, p: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Typography>🌍 Based in India (GMT +5:30)</Typography>
        <Typography>🕒 Mon–Fri, 9 AM – 6 PM</Typography>
        <Typography>📅 Weekend consultations by appointment</Typography>
        <Typography>✈️ Open to travel for larger projects</Typography>
        <Button variant="contained" sx={{ mt: 2 }} href="mailto:ritishfj@gmail.com?subject=Schedule%20a%20Call">Schedule a Call 📞</Button>
      </Paper>
    </Box>
  );
}

