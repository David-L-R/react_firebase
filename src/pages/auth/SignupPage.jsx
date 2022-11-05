import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../../components/alert/Alert";
import { Button } from "../../components/button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { Loader } from "../../components/loader/Loader";
import { Logo } from "../../components/Layout/logo/Logo";
import { CenteredPage } from "../../components/Layout/centeredPage/CenteredPage";
import "./auth.css";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, user, addUserInfo } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (password.length < 6) {
      setPasswordError("Password must be longer than 6 characters");
      return;
    }

    try {
      setLoading(true);
      const id = await signup(email, password);
      await addUserInfo({ name, id });
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
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
                type='name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                error='Your user name will be visible to all users'
              >
                Name
              </Input>
              <Input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              >
                Email
              </Input>
              <Input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={passwordError}
              >
                Password
              </Input>
              <Button className='success' type='submit'>
                Submit
              </Button>
            </Form>
            <p>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </CenteredPage>
  );
};
