import { React, useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [pass, setPass] = useState(null);
  const [findId, setFindId] = useState([]);
  const [checkId, setCheckId] = useState(false);

  const idValue = (event) => {
    setId(String(event.target.value));
  };

  const passValue = (event) => {
    setPass(String(event.target.value));
  };

  const nameValue = (event) => {
    setName(String(event.target.value));
  };

  const onSubmit = (event) => {
    Axios.post("http://localhost:3002/Create/insert", {
      createName: name,
      createId: id,
      createPass: pass,
    }).then(() => {
      alert("successful insert");
    });
  };

  // useEffect(() => {
  //   Axios.get("http://localhost:3002/Create/get").then((response) => {
  //     setFindId(response.data);
  //   });
  // }, []);

  // const idCheckTF = (event) => {
  //   for (const i in findId) {
  //     if (findId[i].id !== id) {
  //       setCheckId(false);
  //     } else {
  //       setCheckId(true);
  //     }
  //   }
  // };

  return (
    <div className="App">
      <h1>Create Your email</h1>

      <form>
        <label>name</label>
        <input type="text" value={name} onChange={nameValue} />
        <label>id</label>
        <input type="text" value={id} onChange={idValue} />

        <label>password</label>
        <input
          type="password"
          value={pass}
          onChange={passValue}
          disabled={checkId}
        />
        <button onClick={onSubmit}>Create</button>
      </form>
    </div>
  );
}

export default App;
