"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalWrapper = ({ children }: { children: ReactNode }) => {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
};

export default ModalWrapper;