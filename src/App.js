import { React, useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [findId, setFindId] = useState([]);
  const [checkId, setCheckId] = useState(false);

  const idValue = (event) => {
    setId(event.target.value);
  };

  const passValue = (event) => {
    setPass(event.target.value);
  };

  const nameValue = (event) => {
    setName(event.target.value);
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

  useEffect(() => {
    Axios.get("http://localhost:3002/Create/get").then((response) => {
      setFindId(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Create Your email</h1>

      <form>
        <label>name</label>
        <input type="text" value={name} onChange={nameValue} />
        <label>id</label>
        <input type="text" value={id} onChange={idValue} />
        {checkId ? <label>동일한 아이디가 존재합니다</label> : null}
        <label>password</label>
        <input type="password" value={pass} onChange={passValue} />
        <button onClick={onSubmit}>Create</button>
      </form>
    </div>
  );
}

export default App;
