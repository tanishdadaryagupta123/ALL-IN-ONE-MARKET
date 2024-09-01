import React, { useEffect, useState } from 'react';
import styles from './authr.module.scss';  // Ensure this path is correct
import registerImg from "../../assets/register.png";  // Update this path to your image
import Card from "../../components/card/Card";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { register, RESET_AUTH } from "../../redux/features/auth/authSlice";  // Import your register action
import Loader from '../../components/loader/Loader';  // Import the Loader component

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isRegistered, error } = useSelector((state) => state.auth);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      await dispatch(register(userData));
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isRegistered) {
      toast.success("Registration successful!");
        // Redirect to login page after successful registration
    } else if (error) {
      toast.error(error);
    }

    // Clean up function to reset auth state when component unmounts
    return () => {
     dispatch(RESET_AUTH());
    };
  }, [isRegistered, error, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.login}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Register;
