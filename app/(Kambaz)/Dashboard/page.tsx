import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" width={200} height={150} alt={"React"} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/algorithms.jpg" width={200} height={150} alt={"Algorithms"} />
            <div>
              <h5> CS3000 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Data Structures and Algorithms
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3450" className="wd-dashboard-course-link">
            <Image src="/images/cpluspluslogo.png" width={200} height={150} alt={"C++"} />
            <div>
              <h5> CS3450 Programming in C++ </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Programming in C++
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1500" className="wd-dashboard-course-link">
            <Image src="/images/fundies.jpg" width={200} height={150} alt={"Fundamentals"} />
            <div>
              <h5> CS1500 Fundamentals of Computer Science </h5>
              <p className="wd-dashboard-course-title">
                Basics of Computer Science
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1700" className="wd-dashboard-course-link">
            <Image src="/images/javalogo.jpg" width={200} height={150} alt={"Java"} />
            <div>
              <h5> CS1700 Java Programming </h5>
              <p className="wd-dashboard-course-title">
                Learn Java from Scratch
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1600" className="wd-dashboard-course-link">
            <Image src="/images/pythonlogo.png" width={200} height={150} alt={"Python"} />
            <div>
              <h5> CS1600 Python Programming </h5>
              <p className="wd-dashboard-course-title">
                Learn Python from Scratch
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4550" className="wd-dashboard-course-link">
            <Image src="/images/webdev.jpg" width={200} height={150} alt={"Web Development"} />
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Full Stack Web Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>

  );
}