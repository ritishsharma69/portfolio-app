import { Box, LinearProgress, Stack, Typography } from '@mui/material';

function SkillRow({ label, value }: { label: string; value: number }) {
  return (
    <Stack spacing={0.5} sx={{ my: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" fontWeight={600}>{label}</Typography>
        <Typography variant="body2" color="text.secondary">{value}%</Typography>
      </Stack>
      <LinearProgress variant="determinate" value={value} sx={{ height: 8, borderRadius: 4 }} />
    </Stack>
  );
}

export default function HomeAboutSkills() {
  return (
    <Box>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Technical Skills</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>Frontend</Typography>
          <SkillRow label="React.js" value={95} />
          <SkillRow label="TypeScript" value={90} />
          <SkillRow label="JavaScript" value={92} />
          <SkillRow label="Vue.js" value={85} />
          <SkillRow label="Angular" value={80} />
          <SkillRow label="Next.js" value={90} />
        </Box>
        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>Backend</Typography>
          <SkillRow label="Node.js" value={95} />
          <SkillRow label="Express.js" value={95} />
          <SkillRow label="MongoDB" value={85} />
          <SkillRow label="PostgreSQL" value={90} />
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 3, mt: 3 }}>
        <Box>
          <Typography fontWeight={700} sx={{ mb: 1 }}>DevOps & Cloud</Typography>
          <SkillRow label="AWS" value={80} />
          <SkillRow label="Docker" value={90} />
          <SkillRow label="CI/CD" value={85} />
        </Box>
      </Box>
    </Box>
  );
}

