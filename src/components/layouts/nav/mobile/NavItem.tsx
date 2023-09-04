import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Link, ListItemText, ListItemIcon } from '@mui/material';

import { NavItemMobileProps } from '../types';
import { ListItem } from './styles';

// ----------------------------------------------------------------------

export default function NavItem({ item, open, active, isExternalLink, ...other }: NavItemMobileProps) {
  const { title, path, icon, children } = item;

  const renderContent = (
    <ListItem active={active} {...other}>
      <ListItemIcon> {icon} </ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItem>
  );

  // ExternalLink
  if (isExternalLink) {
    return (
      <Link href={path} target="_blank" rel="noopener" underline="none">
        {renderContent}
      </Link>
    );
  }

  // Has child
  if (children) {
    return renderContent;
  }

  // Default
  return (
    <Link component={RouterLink} to={path} underline="none">
      {renderContent}
    </Link>
  );
}
