"use client";

import * as React from "react";

import { DialogContent, DialogTrigger } from "./dialog-parts";

interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  onOpenChange,
  defaultOpen = false,
  open: controlledOpen,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen =
    controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (open: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(open);
    }
    onOpenChange?.(open);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === DialogTrigger) {
          return React.cloneElement(
            child as React.ReactElement<{ onClick?: () => void }>,
            {
              onClick: () => handleOpenChange(true),
            }
          );
        }

        if (child.type === DialogContent) {
          return React.cloneElement(
            child as React.ReactElement<{
              open?: boolean;
              onClose?: () => void;
            }>,
            {
              open: isOpen,
              onClose: () => handleOpenChange(false),
            }
          );
        }

        return child;
      })}
    </>
  );
};

export { Dialog };
