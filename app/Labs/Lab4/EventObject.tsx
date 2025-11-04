"use client";
import { useState } from "react";

type SafeEventShape = Record<string, unknown>;

export default function EventObject() {
  const [event, setEvent] = useState<SafeEventShape | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.outerHTML;
    const plain: SafeEventShape = {
      type: e.type,
      timeStamp: e.timeStamp,
      target,
      detail: (e as unknown as { detail?: unknown }).detail,
    };
    setEvent(plain);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}