"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(7);

  return (
    <div id="wd-counter-use-state" className="mb-3">
      <h2>Counter: {count}</h2>
      <div className="d-flex gap-2">
        <button
          onClick={() => setCount(count + 1)}
          id="wd-counter-up-click"
          className="btn btn-success btn-sm rounded-2 px-2">Up
        </button>
        <button
          onClick={() => setCount(count - 1)}
          id="wd-counter-down-click"
          className="btn btn-danger btn-sm rounded-2 px-2">Down
        </button>
      </div>
      <hr />
    </div>
  );
}
