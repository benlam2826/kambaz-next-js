"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import { FaUserPlus, FaUserCircle } from "react-icons/fa";

export default function AccountNavigation() {
  const pathname = usePathname();
  const active = (href: string) => pathname === href;

  return (
    <ListGroup
      id="wd-account-navigation"
      className="wd list-group fs-5 rounded-0"
      style={{ minWidth: 220 }}
    >
      <ListGroupItem
        as={Link}
        href="/Account/Signin"
        className={`border-0 ${active("/Account/Signin") ? "active" : "text-danger"}`}
      >
        <VscAccount className="me-2" /> Sign in
      </ListGroupItem>
      <br />
      <ListGroupItem
        as={Link}
        href="/Account/Signup"
        className={`border-0 ${active("/Account/Signup") ? "active" : "text-danger"}`}
      >
        <FaUserPlus className="me-2" /> Sign up
      </ListGroupItem>
      <br />
      <ListGroupItem
        as={Link}
        href="/Account/Profile"
        className={`border-0 ${active("/Account/Profile") ? "active" : "text-danger"}`}
      >
        <FaUserCircle className="me-2" /> Profile
      </ListGroupItem>
    </ListGroup>
  );
}