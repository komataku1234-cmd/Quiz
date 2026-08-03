import { useState } from 'react';
import { Container, Typography, Box, Button, Paper, Chip, Stack } from '@mui/material';
import { motion } from 'motion/react';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';

export default function App() {
  const [count, setCount] = useState(0);

  const techStack = [
    'React 19',
    'TypeScript',
    'Vite',
    'MUI v9',
    'Emotion',
    'Jotai',
    'Motion',
    'React Hook Form',
    'Yup',
    'Storybook 10',
    'Vitest',
    'oxlint',
  ];

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#f8fafc',
            border: '1px solid #334155',
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
            <RocketLaunchIcon sx={{ fontSize: 40, color: '#38bdf8' }} />
            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: '#f8fafc' }}>
              React Starter Kit
            </Typography>
          </Box>

          <Typography variant="body1" color="#94a3b8" paragraph sx={{ mb: 4 }}>
            開発環境がセットアップされました。このスターターキットを使用して新しい開発を始めることができます。
          </Typography>

          <Box my={4}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CodeIcon />}
              onClick={() => setCount((prev) => prev + 1)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1.1rem',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #0284c7 0%, #2563eb 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #0369a1 0%, #1d4ed8 100%)',
                },
              }}
            >
              Counter: {count}
            </Button>
          </Box>

          <Box mt={4} pt={3} borderTop="1px solid #334155">
            <Typography variant="subtitle2" color="#94a3b8" mb={2}>
              組み込みライブラリ & 技術スタック
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center">
              {techStack.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  icon={<CheckCircleOutlineIcon style={{ color: '#38bdf8' }} />}
                  variant="outlined"
                  sx={{
                    color: '#e2e8f0',
                    borderColor: '#475569',
                    backgroundColor: 'rgba(51, 65, 85, 0.4)',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}
