"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as coursesClient from "../../../client";

interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!cid) return;
      try {
        const enrolledUsers = await coursesClient.findUsersForCourse(cid);
        setUsers(enrolledUsers);
      } catch (e) {
        console.error("Failed to fetch users for course:", e);
      }
    };

    load();
  }, [cid]);

  return (
    <div id="wd-people-table" className="container">
      <h3>People</h3>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-4 text-secondary" />
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
