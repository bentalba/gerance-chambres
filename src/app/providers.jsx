"use client";

import { ToastProvider } from "@/composants.jsx";

export function Providers({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
