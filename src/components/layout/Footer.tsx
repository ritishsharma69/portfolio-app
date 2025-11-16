import { Container, Box, Typography, Link } from '@mui/material';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box component="footer" sx={{ py: 6 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2">© {year} Ritish. All rights reserved.</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
          <Link href="#" color="inherit" underline="hover">Terms</Link>
        </Box>
      </Container>
    </Box>
  );
}

