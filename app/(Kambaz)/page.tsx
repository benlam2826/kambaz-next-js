import Link from "next/link";

export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <h1>Kambaz</h1>
      <p>Welcome to Kambaz. Use the links below to navigate.</p>
      <ul>
        <li>
          <Link href="/Labs" id="wd-labs-link-on-kambaz">
            Go to Lab Exercises
          </Link>
        </li>
        <li>
          <Link href="/Account/Signin" id="wd-account-signin-link">
            Sign in to Account
          </Link>
        </li>
        <li>
          <Link href="/Dashboard" id="wd-dashboard-link-on-kambaz">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}