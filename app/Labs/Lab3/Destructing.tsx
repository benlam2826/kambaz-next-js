export default function Destructing() {
  const person = { name: "John", age: 25 };
  const { name, age } = person; // object destructuring

  const numbers = ["one", "two", "three"];
  const [first, second, third] = numbers; // array destructuring

  return (
    <div id="wd-destructing">
      <h2>Destructing</h2>
      <h3>Object Destructing</h3>
      <div>
        const &#123; name, age &#125; =
        &#123; name: "John", age: 25 &#125;
      </div>
      <br />
      name = {name} <br />
      age = {age}

      <h3>Array Destructing</h3>
      <div>
        const [first, second, third] = ["one","two","three"]
      </div>
      <br />
      first = {first} <br />
      second = {second} <br />
      third = {third}
      <hr />
    </div>
  );
}