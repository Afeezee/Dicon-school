import type { ReactElement, ReactNode } from "react";

interface AdminFieldProps {
  children: ReactNode;
  hint?: string;
  label: string;
}

export default function AdminField({ children, hint, label }: AdminFieldProps): ReactElement {
  return (
    <label className="block space-y-2">
      <span className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">{label}</span>
      {children}
      {hint ? <span className="block text-sm leading-relaxed text-dicon-muted">{hint}</span> : null}
    </label>
  );
}