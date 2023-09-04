import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { List, Drawer, IconButton } from '@mui/material';

import { Logo } from '../../../logo/Logo';
import { NAV } from '../../../../config-global';
import { Scrollbar } from '../../../scrollbar/Scrollbar';

import { NavProps } from '../types';
import NavList from './NavList';
import { Iconify } from '../../../iconify/Iconify';

// ----------------------------------------------------------------------
export default function NavMobile({ isOffset, data }: NavProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          ml: 1,
          color: 'text.primary',
        }}
      >
        <Iconify icon="eva:menu-2-fill" width={30} />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
            backgroundColor: theme.palette.background.default
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
