import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContent";
import { URL } from "../App";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
 async function login(ev) {
    ev.preventDefault();
   const response = await fetch(`${URL}/login`, {
      method: "POST",
      body: JSON.stringify({username,password}),
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
    });

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Wrong credentials'); 
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className="form-design login" onSubmit={login}>
      <h1>Sign In</h1>

      <div>
        <input
          type="text"
          id="name"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </div>
      <button className="btn">Login</button>

      <p className="bottom-info">
        Don't have an Account! <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
