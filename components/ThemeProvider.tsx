"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
