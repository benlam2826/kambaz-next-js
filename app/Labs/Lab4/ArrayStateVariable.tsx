"use client";
import { useState } from "react";
import { UseSelector } from "react-redux";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => setArray((a) => [...a, Math.floor(Math.random() * 100)]);
  const deleteElement = (index: number) => setArray((a) => a.filter((_, i) => i !== index));

  return (
    <div id="wd-array-state-variables" className="card border rounded-3" style={{ maxWidth: 340 }}>
      <div className="card-body p-3">
        <h2 className="h5 card-title mb-2">Array State Variable</h2>
        <button
          onClick={addElement}
          className="btn btn-success btn-sm rounded-2 px-2 mb-3 shadow-sm">
          Add Element
        </button>
        <ul className="list-group list-group-flush">
          {array.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex align-items-center justify-content-between py-2">
              <span className="fw-semibold">{item}</span>
              <button
                onClick={() => deleteElement(index)}
                className="btn btn-danger btn-sm rounded-2 px-2 shadow-sm">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
