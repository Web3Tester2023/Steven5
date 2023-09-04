import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useActiveLink from '../../../../hooks/useActiveLink';
import { NavItemProps } from '../types';
import { NavItem } from './NavItem';

// ----------------------------------------------------------------------
type NavListProps = {
  item: NavItemProps;
  isOffset: boolean;
};

export default function NavList({ item, isOffset }: NavListProps) {
  const { path, children } = item;
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const { active, isExternalLink } = useActiveLink(path, false);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
  }, [pathname]);

  const handleOpenMenu = () => {
    if (children) {
      setOpenMenu(true);
    }
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <NavItem
      item={item}
      isOffset={isOffset}
      active={active}
      open={openMenu}
      isExternalLink={isExternalLink}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
    />
  );
}