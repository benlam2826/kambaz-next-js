"use client";

import { Provider } from "react-redux";
import store from "../store";
import type { ReactNode } from "react";
import { Row, Col } from "react-bootstrap";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <div className="container-fluid p-0">
        <Row className="m-0">
          <Col xs={12} md={3} lg={2} className="p-0">
            <AccountNavigation />
          </Col>
          <Col className="p-4">
            {children}
          </Col>
        </Row>
      </div>
    </Provider>
  );
}
