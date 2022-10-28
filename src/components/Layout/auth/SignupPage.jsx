import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Alert } from "../../alert/Alert";
import { Form } from "../../Form/Form";
import { Input } from "../../Input/Input";
import { Logo } from "../logo/Logo";
import { CenteredPage } from "../pages/CenteredPage";
import "./auth.css";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    if (password.length < 6) {
      setPasswordError("Password must be longer than 6 characters");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setServerError(err.message);
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && !success) navigate("/");
    if (user && success) setTimeout(() => navigate("/"), 2000);
  }, [user, navigate, success]);

  if (user && success) {
    return (
      <CenteredPage>
        <div className='form-container'>
          <h1>Sign Up</h1>
          <Alert className='success'>
            User {user.email} was successfully registered
          </Alert>
        </div>
      </CenteredPage>
    );
  }

  return (
    <CenteredPage>
      <Logo className='absolute' />
      <div className='form-container'>
        <h1>Sign Up</h1>
        {!user && serverError && (
          <Alert style={{ marginBottom: "8px" }} className='warning'>
            {serverError}
          </Alert>
        )}

        {!loading ? (
          <>
            <Form onSubmit={onSubmit}>
              <Input
                type='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                required
              >
                Email
              </Input>
              <Input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                error={passwordError}
              >
                Password
              </Input>
              <button type='submit'>Submit</button>
            </Form>
            <p>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    </CenteredPage>
  );
};
