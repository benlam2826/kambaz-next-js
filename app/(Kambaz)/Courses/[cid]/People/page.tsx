"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../client";

export default function CoursePeoplePage() {
    const { cid } = useParams<{ cid: string }>();
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        if (!cid) return;
        const data = await client.findUsersForCourse(cid as string);
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return (
        <div>
            <h3>People</h3>
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}