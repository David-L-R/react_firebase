import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "../../Form/Form";
import { Input } from "../../Input/Input";
import { Logo } from "../logo/Logo";
import { CenteredPage } from "../pages/CenteredPage";
import "./auth.css";

export const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
  };

  return (
    <CenteredPage>
      <Logo />
      <div className='form-container' onSubmit={onSubmit}>
        <h1>Login</h1>
        <Form>
          <Input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
          >
            Email
          </Input>
          <Input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          >
            Password
          </Input>
          <button type='submit'>Submit</button>
        </Form>
        <p>
          Already have an account? <Link to='/signup'>Sign up</Link>
        </p>
      </div>
    </CenteredPage>
  );
};
