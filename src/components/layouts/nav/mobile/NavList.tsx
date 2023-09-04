import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import useActiveLink from '../../../../hooks/useActiveLink';
import { NavItemProps } from '../types';
import NavItem from './NavItem';

// ----------------------------------------------------------------------

type NavListProps = {
  item: NavItemProps;
};

export default function NavList({ item }: NavListProps) {
  const { path } = item;
  const { pathname } = useLocation();
  const { isExternalLink } = useActiveLink(path);
  const [open, setOpen] = useState(false);

  return (
    <NavItem
      item={item}
      open={open}
      onClick={() => setOpen(!open)}
      active={pathname === path}
      isExternalLink={isExternalLink}
    />
  );
}
