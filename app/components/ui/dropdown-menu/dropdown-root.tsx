"use client";

import * as React from "react";

import { DropdownMenuTrigger, DropdownMenuContent } from "./dropdown-parts";

interface DropdownMenuProps {
  children?: React.ReactNode;
}

interface DropdownMenuContentProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const childArray = React.Children.toArray(children);
  const triggerChild = childArray.find(
    (child) => React.isValidElement(child) && child.type === DropdownMenuTrigger
  ) as React.ReactElement | undefined;

  const contentChild = childArray.find(
    (child) => React.isValidElement(child) && child.type === DropdownMenuContent
  ) as React.ReactElement | undefined;

  if (!triggerChild || !contentChild) return null;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Use any type to avoid TypeScript errors with onClick prop
  const trigger = React.cloneElement(
    triggerChild as React.ReactElement<{
      onClick: (event: React.MouseEvent<HTMLElement>) => void;
    }>,
    {
      onClick: handleClick,
    }
  );

  // Use any type to avoid TypeScript errors with anchorEl, open, and onClose props
  const content = React.cloneElement(
    contentChild as React.ReactElement<DropdownMenuContentProps>,
    {
      open,
      anchorEl,
      onClose: handleClose,
    }
  );

  return (
    <>
      {trigger}
      {content}
    </>
  );
};

export { DropdownMenu };
