import type { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-account" className="d-flex">
      <div className="d-none d-md-block me-3">
        <AccountNavigation />
      </div>
      <div className="flex-fill" style={{ maxWidth: 720 }}>
        {children}
      </div>
    </div>
  );
}