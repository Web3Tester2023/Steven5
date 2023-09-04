import React from 'react'
import { Stack } from '@mui/material';

import { NavProps } from '../types';
import NavList from './NavList';

// ----------------------------------------------------------------------
export default function NavDesktop({ isOffset, data }: NavProps) {
  return (
    <Stack component="nav"
      direction="row"
      spacing={5}
      sx={{
        mr: 5,
        height: 1
      }}
    >
      {data.map((link) => (
        <NavList item={link}
          isOffset={isOffset}
          key={link.title}
        />
      ))}
    </Stack>
  );
}
