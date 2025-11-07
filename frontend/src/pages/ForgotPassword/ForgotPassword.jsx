import React, { useState } from "react";
import "../Login/Login.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reset link sent to:", email);
        // Example API call: axios.post("/api/v1/users/forgot-password", { email })
    };

    const handleBackToLogin = () => {
        console.log("Navigate back to login");
        // Example: navigate('/')
    };

    return (
        <div className="auth-wrapper">
            <div className="card auth-card card--lift">
                <h2 className="auth-title">Forgot Password</h2>
                <p className="auth-sub">
                    Enter your registered email address, and we’ll send you a password reset link.
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-row">
                        <label className="auth-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="auth-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-actions">
                        <button type="submit" className="btn btn--primary">
                            Send Reset Link
                        </button>
                    </div>

                    <div className="auth-links">
                        <button
                            type="button"
                            className="auth-link-btn"
                            onClick={handleBackToLogin}
                        >
                            ← Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;