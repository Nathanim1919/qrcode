export const generateEmailTemplate = (url) => {
    return `
      <html>
        <head>
          <style>
            /* General container styles */
            .email-container {
              font-family: 'Arial', sans-serif;
              padding: 20px;
              background-color: #f8f9fa;
              color: #333;
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
  
            /* Header styles */
            .email-header {
              text-align: center;
              font-size: 30px;
              font-weight: bold;
              color: #007bff;
              padding-bottom: 20px;
              border-bottom: 2px solid #007bff;
            }
  
            /* Body styles */
            .email-body {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
  
            /* Text and paragraph styling */
            .email-body p {
              font-size: 16px;
              line-height: 1.5;
              color: #555;
              margin-bottom: 10px;
            }
  
            /* Link styling */
            .email-body a {
              color: #007bff;
              text-decoration: none;
              font-weight: bold;
            }
  
            /* QR Code section */
            .qr-code {
              text-align: center;
              margin-top: 30px;
            }
  
            /* Button styling */
            .cta-button {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              padding: 12px 30px;
              border-radius: 30px;
              text-align: center;
              text-decoration: none;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s ease;
            }
  
            .cta-button:hover {
              background-color: #0056b3;
            }
  
            /* Footer styles */
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 14px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h2>Your Personalized QR Code</h2>
            </div>
            <div class="email-body">
              <p>Hello,</p>
              <p>Here is your personalized QR code. You can scan it with any QR code reader to access the URL below:</p>
              <p><strong><a href="${url}" target="_blank">${url}</a></strong></p>
              <div class="qr-code">
                <img src="cid:qrCode" alt="QR Code" style="max-width: 100%; height: auto; border-radius: 8px;" />
              </div>
              <p>If you have any issues, feel free to contact us.</p>
              <a href="${url}" class="cta-button">Access Your Link</a>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  