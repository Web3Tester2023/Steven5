import React from "react";
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, BoxProps } from '@mui/material';

import LogoImg from '../../assets/image/logo.png'

// ----------------------------------------------------------------------
export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(({ disabledLink = false, sx, ...other }, ref) => {

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        height: 20,
        display: 'inline-flex',
        alignItems:"center",
        ...sx,
      }}
      {...other}
    >
      <img alt=""
        src={LogoImg} className="w-[200px] h-[50px]"
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
}
);