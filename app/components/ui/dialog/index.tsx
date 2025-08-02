import {
  DialogPortal,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
} from "./dialog-parts";
import { Dialog } from "./dialog-root";
import { DialogTitle, DialogDescription } from "./dialog-typography";

const DialogClose = DialogTrigger;
const DialogOverlay = DialogPortal;

export {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogDescription,
};
