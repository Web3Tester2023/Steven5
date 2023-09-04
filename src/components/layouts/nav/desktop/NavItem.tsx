import React from "react";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

import { ListItem } from "./styles";
import { NavItemDesktopProps } from "../types";

// ----------------------------------------------------------------------
export const NavItem = forwardRef<HTMLDivElement, NavItemDesktopProps>(
  (
    { item, open, isOffset, active, subItem, isExternalLink, ...other },
    ref
  ) => {


    const { title, path, children } = item;


    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const featured = document.getElementById(path);

      if (featured) {
        const topOffset = featured.getBoundingClientRect().top;

        window.scrollTo({
          top: window.pageYOffset + topOffset,
          behavior: "smooth",
        });
      }
    };


    const renderContent = (
      <ListItem
        ref={ref}
        disableRipple
        isOffset={isOffset}
        subItem={subItem}
        active={active}
        open={open}
        {...other}
      >
        {title}
      </ListItem>
    );

    // ExternalLink
    if (isExternalLink) {
      return <a href={"#" + path}>{renderContent}</a>;
    }

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <a href={"#" + path} onClick={handleLinkClick}>
        {renderContent}
      </a>
    );
  }
);
