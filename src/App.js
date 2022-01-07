import axios from "axios";
import react, { useEffect, useState } from "react";
import { NavItem } from "react-bootstrap";

export default function App() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

function MyComponent() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [list, setlist] = useState([]);

  let getfirst = (e) => {
    setfirstname(e.target.value);
  };

  let getlast = (e) => {
    setlastname(e.target.value);
  };

  let getsubmit = async () => {
    const url = "http://localhost:8000/addUser";
    const body = { firstname: firstname, lastname: lastname };
    await axios.post(url, body);
    const newlist = [body, ...list];
    setlist(newlist);
    setfirstname("");
    setlastname("");
  };

  let seeall = async () => {
    const url = "http://localhost:8000/selectUser";
    let result = await axios.get(url);
    const list = result.data;
    const newlist = [...list];
    setlist(newlist);
  };

  useEffect(() => seeall());

  return (
    <div>
      <div>
        <input
          type="text"
          value={firstname}
          placeholder="enter firstname"
          onChange={getfirst}
        />
      </div>
      <div>
        <input
          type="text"
          value={lastname}
          placeholder="enter lastname"
          onChange={getlast}
        />
      </div>
      <div>
        <input type="button" value="submit" onClick={getsubmit} />
        <input type="button" value="seeall" onClick={seeall} />
      </div>
      {list.map((item, index) => (
        <div key={index}>
          {item.firstname} {item.lastname}
        </div>
      ))}
    </div>
  );
}
