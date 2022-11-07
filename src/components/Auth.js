import { useState, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitHandler called");

    const body = {
      username,
      password,
    };

    axios
      .post(
        register
          ? `https://socialmtn.devmountain.com/register`
          : `https://socialmtn.devmountain.com/login`,
        body
      )
      .then((res) => {
        console.log("log", res.data);

        authCtx.login(res.data.token, res.data.exp, res.data.userId)
      })
      .catch((error) => {
        setUsername("");
        setPassword("");
      });

  };

  const authCtx = useContext(AuthContext)

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;