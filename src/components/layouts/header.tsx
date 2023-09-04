import React from "react";
import { useRef } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container, BoxProps } from '@mui/material';

import { Logo } from "../logo/Logo";
import { HEADER } from '../../config-global'
import { navConfig } from "./nav/config-navigation";

import { bgBlur } from "../../utils/cssStyles";
import NavMobile from "./nav/mobile/NavMobile";
import NavDesktop from "./nav/desktop/NavDesktop";
import useResponsive from "../../hooks/useResponsive";
import useOffSetTop from "../../hooks/useOffSetTop";

export const Header = () => {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const isDesktop = useResponsive('up', 'md');
  const isOffset = useOffSetTop(50);


  return (
    <AppBar ref={carouselRef}
      sx={{ boxShadow: 0 }}
      color="transparent"
    >
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: isOffset ? HEADER.H_MAIN_DESKTOP - 16 : HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default })
          })
        }}
      >
        <Container maxWidth={'xl'}
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Logo />
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}
          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  )
}

// ----------------------------------------------------------------------
const Shadow = ({ sx, ...other }: BoxProps) => {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
