import React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------
export interface ScrollbarProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
