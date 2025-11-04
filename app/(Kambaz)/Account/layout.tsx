"use client";

import { Provider } from "react-redux";
import store from "../store";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="container-fluid p-0">{children}</div>
    </Provider>
  );
}