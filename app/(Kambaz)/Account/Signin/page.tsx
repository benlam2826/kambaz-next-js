"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) {
      return;
    }
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div className="wd-signin-screen">
      <h1>Sign in</h1>

      <FormControl
        className="wd-username mb-2"
        placeholder="username"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        className="wd-password mb-2"
        type="password"
        placeholder="password"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button className="wd-signin-btn w-100 mb-2" onClick={signin}>
        Sign in
      </Button>

      <Link href="/Account/Signup" className="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}