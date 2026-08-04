import { useEffect, useRef, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

type TimerProps = {
  timeLimit: number;
  isRunning: boolean;
  onTimeout: () => void;
};

export default function Timer({ timeLimit, isRunning, onTimeout }: TimerProps) {
  const [remaining, setRemaining] = useState(timeLimit);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  // T-1: 問題（timeLimit）が切り替わるたびに残り時間をリセットする
  useEffect(() => {
    setRemaining(timeLimit);
  }, [timeLimit]);

  // T-2, T-3: playing 中のみカウントダウンし、停止時・アンマウント時は必ず解除する
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          onTimeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLimit]);

  const progress = Math.max(0, Math.min(100, (remaining / timeLimit) * 100));
  const isUrgent = remaining <= 5;

  return (
    <Box sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={0.5}>
        <Typography variant="body2" color="text.secondary">
          残り時間
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={isUrgent ? 'error.main' : 'text.primary'}
        >
          {remaining}秒
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={isUrgent ? 'error' : 'primary'}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
}
