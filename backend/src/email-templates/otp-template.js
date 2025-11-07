const otpEmailTemplate = (name, otp) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f8f9fa;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 500px;
        background: #ffffff;
        margin: 40px auto;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        border-bottom: 2px solid #007bff;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .header h2 {
        color: #007bff;
        margin: 0;
      }
      .content {
        color: #333333;
        font-size: 15px;
        line-height: 1.6;
      }
      .otp-box {
        display: inline-block;
        background-color: #f0f4ff;
        color: #007bff;
        font-weight: bold;
        font-size: 22px;
        padding: 10px 20px;
        border-radius: 8px;
        margin: 20px 0;
        letter-spacing: 3px;
      }
      .footer {
        text-align: center;
        font-size: 13px;
        color: #888;
        border-top: 1px solid #eee;
        margin-top: 25px;
        padding-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Flight Access Portal</h2>
      </div>
      <div class="content">
        <p>Hi <b>${name}</b>,</p>
        <p>Thank you for signing up! To complete your registration, please verify your email by entering the OTP below:</p>
        <div class="otp-box">${otp}</div>
        <p>This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone for security reasons.</p>
        <p>If you didn’t request this, please ignore this email.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Flight Role-Based Access System<br/>
        All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

export default otpEmailTemplate;