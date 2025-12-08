"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({
    role: "USER",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const signup = async () => {
    setError(null);
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      redirect("/Profile");
    } catch (e: any) {
      const message =
        e?.response?.data?.message ||
        e?.message ||
        "Signup failed. Try again.";
      setError(message);
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <FormControl
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        className="mb-2"
        placeholder="first name"
      />
      <FormControl
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        className="mb-2"
        placeholder="last name"
      />
      <FormControl
        value={user.dob}
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
        className="mb-2"
        placeholder="date of birth"
        type="date"
      />
      <FormControl
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-3"
        placeholder="email"
        type="email"
      />
      <label className="form-label fw-semibold">Role</label>
      <select
        className="form-select mb-3"
        value={user.role}
        onChange={(e) =>
          setUser({
            ...user,
            role: e.target.value,
          })
        }
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      {error && <div className="text-danger mb-2">{error}</div>}
      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        Sign up
      </button>
      <br />
      <Link href="/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
