"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setAssignments } from "../reducer";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../../../../Assignments/client";

export default function AssignmentEditor() {
  const { cid } = useParams<{ cid: string }>();
  const search = useSearchParams();
  const aid = search.get("aid");
  const router = useRouter();

  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (s: RootState) => s.assignmentsReducer
  );

  const existing = assignments.find((a) => a._id === aid) ?? null;

  const [form, setForm] = useState({
    name: "",
    description: "",
    points: 100,
    due: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name ?? "",
        description: existing.description ?? "",
        points: existing.points ?? 100,
        due: existing.due ? existing.due.slice(0, 10) : "",
        availableFrom: existing.availableFrom
          ? existing.availableFrom.slice(0, 10)
          : "",
        availableUntil: existing.availableUntil
          ? existing.availableUntil.slice(0, 10)
          : "",
      });
    }
  }, [existing]);

  const save = async () => {
    if (!cid) return;

    if (existing) {
      const updated = await client.updateAssignment({
        ...existing,
        ...form,
      });

      dispatch(
        setAssignments(
          assignments.map((a) => (a._id === existing._id ? updated : a))
        )
      );
    } else {
      const created = await client.createAssignment(cid, form);

      dispatch(setAssignments([...assignments, created]));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="p-3" style={{ maxWidth: 640 }}>
      <h3>{existing ? "Edit Assignment" : "New Assignment"}</h3>
      <FormControl
        className="mb-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        rows={4}
        className="mb-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <FormControl
        type="number"
        className="mb-2"
        value={form.points}
        onChange={(e) =>
          setForm({ ...form, points: Number(e.target.value || 0) })
        }
      />
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Due</label>
          <FormControl
            type="date"
            value={form.due}
            onChange={(e) => setForm({ ...form, due: e.target.value })}
          />
        </div>
        <div className="col">
          <label className="form-label">Available From</label>
          <FormControl
            type="date"
            value={form.availableFrom}
            onChange={(e) =>
              setForm({ ...form, availableFrom: e.target.value })
            }
          />
        </div>
        <div className="col">
          <label className="form-label">Available Until</label>
          <FormControl
            type="date"
            value={form.availableUntil}
            onChange={(e) =>
              setForm({ ...form, availableUntil: e.target.value })
            }
          />
        </div>
      </div>
      <div className="d-flex gap-2">
        <Button onClick={save}>Save</Button>
        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
