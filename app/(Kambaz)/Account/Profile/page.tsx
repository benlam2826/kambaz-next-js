"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { Button, FormControl } from "react-bootstrap";
import { RootState } from "../../store";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

type ProfileType = {
  _id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: string;
};

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [profile, setProfile] = useState<ProfileType>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }
    setProfile(currentUser as ProfileType);
  }, [currentUser]);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  return (
    <div className="wd-profile-screen" style={{ maxWidth: 520 }}>
      <h3>Profile</h3>
      {!!currentUser && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            placeholder="username"
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            type="password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            placeholder="password"
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            placeholder="First Name"
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            placeholder="Last Name"
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            placeholder="email"
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            value={profile.role}
            onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })
            }>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button
            onClick={updateProfile}
            className="w-100 mb-2"
            id="wd-update-profile-btn">
            Update
          </Button>

          <Button
            onClick={signout}
            className="w-100 mb-2"
            id="wd-signout-btn"
            variant="danger">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
