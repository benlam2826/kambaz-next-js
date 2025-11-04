"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../../Assignments/reducer";
import { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import type { Assignment } from "../../../../Database/types";

type EditableAssignment = Pick<
  Assignment,
  "name" | "description" | "points" | "due" | "availableFrom" | "availableUntil"
>;

const emptyForm: EditableAssignment = {
  name: "",
  description: "",
  points: 100,
  due: "",
  availableFrom: "",
  availableUntil: "",
};

export default function AssignmentEditor() {
  const { cid } = useParams<{ cid: string }>();
  const search = useSearchParams();
  const aid = search.get("aid");
  const router = useRouter();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (s: RootState) => s.assignmentsReducer.assignments
  );

  const [form, setForm] = useState<EditableAssignment>(emptyForm);
  const [editingTarget, setEditingTarget] = useState<Assignment | null>(null);

  useEffect(() => {
    if (aid) {
      const found = assignments.find((a) => a._id === aid) ?? null;
      setEditingTarget(found);
      if (found) {
        const { name, description, points, due, availableFrom, availableUntil } = found;
        setForm({
          name,
          description,
          points,
          due: (due ?? "").slice(0, 10),
          availableFrom: (availableFrom ?? "").slice(0, 10),
          availableUntil: (availableUntil ?? "").slice(0, 10),
        });
      }
    } else {
      setEditingTarget(null);
      setForm(emptyForm);
    }
  }, [aid, assignments]);

  const save = () => {
    if (editingTarget) {
      dispatch(updateAssignment({ ...editingTarget, ...form }));
    } else {
      dispatch(addAssignment({ course: cid!, ...form }));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const cancel = () => router.push(`/Courses/${cid}/Assignments`);

  return (
    <div className="p-3" id="wd-assignment-editor" style={{ maxWidth: 640 }}>
      <h3>{editingTarget ? "Edit Assignment" : "New Assignment"}</h3>

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
        className="mb-2"
        type="number"
        placeholder="Points"
        value={form.points}
        onChange={(e) => setForm({ ...form, points: Number(e.target.value || 0) })}
      />

      <div className="row">
        <div className="col">
          <label className="form-label small">Due date</label>
          <FormControl
            type="date"
            value={form.due || ""}
            onChange={(e) => setForm({ ...form, due: e.target.value })}
          />
        </div>
        <div className="col">
          <label className="form-label small">Available from</label>
          <FormControl
            type="date"
            value={form.availableFrom || ""}
            onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
          />
        </div>
        <div className="col">
          <label className="form-label small">Available until</label>
          <FormControl
            type="date"
            value={form.availableUntil || ""}
            onChange={(e) => setForm({ ...form, availableUntil: e.target.value })}
          />
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <Button onClick={save}>Save</Button>
        <Button variant="secondary" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
