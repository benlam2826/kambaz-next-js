"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";

type PeopleTableProps = {
    users?: any[];
    fetchUsers: () => void;
};

export default function PeopleTable({
    users = [],
    fetchUsers,
}: PeopleTableProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);

    return (
        <div id="wd-people-table">
            {showDetails && (
                <PeopleDetails
                    uid={showUserId}
                    onClose={() => {
                        setShowDetails(false);
                        fetchUsers();
                    }}
                />
            )}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <span
                                    className="text-decoration-none"
                                    onClick={() => {
                                        setShowDetails(true);
                                        setShowUserId(user._id);
                                    }}
                                    style={{ cursor: "pointer" }}>
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>{" "}
                                    <span className="wd-last-name">{user.lastName}</span>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}