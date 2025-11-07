import React, { useState } from "react";
import "../Login/Login.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user", // default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registering user:", formData);
        // Example API: axios.post('/api/v1/users/register', formData)
    };

    const handleGoToLogin = () => {
        console.log("Navigate to login");
        // Example: navigate('/')
    };

    return (
        <div className="auth-wrapper">
            <div className="card auth-card card--lift">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-sub">
                    Register to access your account and manage your dashboard.
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-row">
                        <label className="auth-label" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="auth-input"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-row">
                        <label className="auth-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="auth-input"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-row">
                        <label className="auth-label" htmlFor="role">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="auth-input auth-select"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="auth-row">
                        <label className="auth-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="auth-input"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-row">
                        <label className="auth-label" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            className="auth-input"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-actions">
                        <button type="submit" className="btn btn--primary">
                            Register
                        </button>
                    </div>

                    <div className="auth-links">
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="auth-link-btn"
                                onClick={handleGoToLogin}
                            >
                                Login here
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;