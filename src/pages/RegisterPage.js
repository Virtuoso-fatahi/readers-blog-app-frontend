
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 async function register(e) {
    e.preventDefault();
  const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
    });
    // console.log(response);
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }


  return (
    <form className="form-design register" onSubmit={register}>
      <h1>Sign Up</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
      />
      <button className="btn">Register</button>

      <p className="bottom-info">
        Don't have an Account! <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
