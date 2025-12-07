"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
    const { uid } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    const fetchUsers = async () => {
        const data = await client.findAllUsers();
        setUsers(data);
    };

    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const data = await client.findUsersByRole(role);
            setUsers(data);
        } else {
            fetchUsers();
        }
    };

    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const data = await client.findUsersByPartialName(name);
            setUsers(data);
        } else {
            fetchUsers();
        }
    };

    const createUser = async () => {
        const user = await client.createUser({
            firstName: "New",
            lastName: `User${users.length + 1}`,
            username: `newuser${Date.now()}`,
            password: "password123",
            email: `email${users.length + 1}@neu.edu`,
            section: "S101",
            role: "STUDENT",
        });
        setUsers([...users, user]);
    };

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    return (
        <div>
            <h3>Users</h3>
            <button
                onClick={createUser}
                className="float-end btn btn-danger wd-add-people">
                <FaPlus className="me-2" />
                Users
            </button>
            <FormControl
                onChange={(e) => filterUsersByName(e.target.value)}
                placeholder="Search people"
                className="float-start w-25 me-2 wd-filter-by-name"
            />
            <select
                value={role}
                onChange={(e) => filterUsersByRole(e.target.value)}
                className="form-select float-start w-25 wd-select-role">
                <option value="">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrators</option>
            </select>
            <div className="clearfix mb-3" />
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}
