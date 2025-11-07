import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);
        // Example: axios.post("/api/v1/users/login", formData)
    };

    const handleRegister = () => {
        console.log("Navigate to Register Page");
        navigate("/register")
    };

    const handleForgotPassword = () => {
        console.log("Navigate to Forgot Password Page");
        navigate("/forgot-password");
    };

    return (
        <div className="auth-wrapper">
            <div className="card auth-card card--lift">
                <h2 className="auth-title">Flight Management Login</h2>
                <p className="auth-sub">Sign in to continue to your dashboard</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-row">
                        <label className="auth-label" htmlFor="email">Email</label>
                        <input className="auth-input" id="email" name="email" type="email" />
                    </div>

                    <div className="auth-row">
                        <label className="auth-label" htmlFor="password">Password</label>
                        <input className="auth-input" id="password" name="password" type="password" />
                    </div>

                    <div className="auth-actions">
                        <div className="auth-remember">
                            <input id="remember" type="checkbox" />
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <div className="auth-login-btn">
                            <button className="btn btn--primary" type="submit">Login</button>
                        </div>
                    </div>

                    <div className="auth-links">
                        <button type="button" className="auth-link-btn" onClick={handleForgotPassword}>Forgot Password?</button>
                        <span className="auth-divider">|</span>
                        <button type="button" className="auth-link-btn" onClick={handleRegister}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;