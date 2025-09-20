import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Lab 1</h1>

      {/* Required: name + section */}
      <h2 id="wd-student-name">Benjamin Lam</h2>
      <p id="wd-section">Section: <b>CS4550-1</b></p>

      {/* Required: link back to Kambaz */}
      <p>
        <Link href="/" id="wd-kambaz-link">Kambaz (Home)</Link>
      </p>

      {/* Required: links to each lab */}
      <h3>Lab Exercises</h3>
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
      </ul>

      {/* Required: GitHub repo link with id="wd-github" */}
      <h3>Source Code</h3>
      <p>
        <a
          id="wd-github"
          href="https://github.com/benlam2826/kambaz-next-js"
          target="_blank"
        >
          github.com/benlam2826/kambaz-next-js
        </a>
      </p>
    </div>
  );
}