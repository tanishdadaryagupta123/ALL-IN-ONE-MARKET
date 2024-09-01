import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import loginImg from '../../assets/login.png'; // Ensure the path to the image is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('All fields are required.');
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else if (error) {
      toast.error(error);
    }
  }, [isLoggedIn, error, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
