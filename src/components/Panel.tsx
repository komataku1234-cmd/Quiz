import type { ReactNode } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';

export type AppMode = 'author' | 'play';

type PanelProps = {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  children: ReactNode;
};

export default function Panel({ mode, onModeChange, children }: PanelProps) {
  return (
    <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ px: 3, pt: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          QuizArena
        </Typography>
        <Tabs
          value={mode}
          onChange={(_, value: AppMode) => onModeChange(value)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab value="play" label="プレイモード" />
          <Tab value="author" label="作問モード" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Paper>
  );
}
