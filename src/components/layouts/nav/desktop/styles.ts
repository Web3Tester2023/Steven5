import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Paper, ListSubheader, ListItemButton } from '@mui/material';

import { bgBlur } from '../../../../utils/cssStyles';
import { NavItemDesktopProps } from '../types';

type ListItemProps = Omit<NavItemDesktopProps, 'item'>;

// ----------------------------------------------------------------------
export const ListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open' && prop !== 'isOffset' && prop !== 'subItem',
})<ListItemProps>(({ theme }) => {
  return {
    ...theme.typography.subtitle2,
    padding: 0,
    height: '100%',
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      opacity: 0.48,
      backgroundColor: 'transparent',
    }
  };
});

// ----------------------------------------------------------------------
export const StyledMenu = styled(Paper)(({ theme }) => ({
  ...bgBlur({
    opacity: 0.94,
    color: theme.palette.background.default,
  }),
  top: 72,
  left: 0,
  right: 0,
  margin: 'auto',
  display: 'grid',
  position: 'fixed',
  alignItems: 'flex-start',
  zIndex: theme.zIndex.modal,
  padding: theme.spacing(5, 1, 1, 3),
  boxShadow: theme.customShadows.dialog,
  maxWidth: theme.breakpoints.values.lg,
  gridTemplateColumns: 'repeat(12, 1fr)',
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
}));

// ----------------------------------------------------------------------
export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  padding: 0,
  fontSize: 11,
  color: theme.palette.text.primary,
}));
