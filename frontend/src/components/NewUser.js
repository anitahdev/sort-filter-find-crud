import { useState } from "react";
export default function NewUser() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [lastName, setLastName] = useState("");

  const getYearsToShow = () => {
    let currentYear = new Date().getFullYear();
    let yearsArr = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      yearsArr.push(i);
    }
    return yearsArr;
  };
  const yearsToShow = getYearsToShow();
  const getAge = (e) => {
    let current = new Date().getFullYear();
    setAge(current - e.target.value);
  };
  function clearState() {}
  const handleSubmit = () => {
    fetch("http://127.0.0.1:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: name,
        last_name: lastName,
        age: age,
      }),
    })
      .then((response) => response.json())

      .catch((error) => {
        console.error("Error:", error);
      });
    clearState();
  };
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ name, age, lastName });
        }}
      >
        <input
          type="text"
          placeholder="Imię"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          onChange={(e) => setLastName(e.target.value)}
        />
        <select name="ages" onChange={(e) => getAge(e)}>
          <option disabled selected>
            -- select an option --
          </option>
          {yearsToShow.map((d) => (
            <option value={d} key={d}>
              {d}
            </option>
          ))}
        </select>
        <div>
          <h3>dane nowego użytkownika</h3>
          <label>Imię: </label>
          <p>{name}</p>
          <label>Nazwisko: </label>
          <p>{lastName}</p>
          <label>Wiek: </label>
          <p>{age}</p>
          <button type="submit">dodaj użytkownika</button>
        </div>
      </form>
    </div>
  );
}
