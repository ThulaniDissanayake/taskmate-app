// src/pages/enable2fa.js
import React, { useEffect, useState } from 'react';
import { enable2FA, verify2FA } from '../api/auth.js';

function Enable2FA() {
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [secret, setSecret] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    async function fetch2FA() {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in.');
        return;
      }
      const data = await enable2FA(token);
      setQrCodeDataURL(data.qrCodeDataURL);
      setSecret(data.secret);
    }
    fetch2FA();
  }, []);
  
  async function handleVerify() {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in.');
      return;
    }
    const result = await verify2FA(token, otp);
    setMessage(result.message);
  }
  
  return React.createElement('div', null,
    React.createElement('h2', null, 'Scan this QR Code with Google Authenticator'),
    qrCodeDataURL && React.createElement('img', { src: qrCodeDataURL, alt: '2FA QR Code' }),
    secret && React.createElement('p', null, `Save this recovery code: `, React.createElement('strong', null, secret)),
    React.createElement('input', {
      placeholder: 'Enter OTP from App',
      value: otp,
      onChange: e => setOtp(e.target.value)
    }),
    React.createElement('button', { onClick: handleVerify }, 'Verify 2FA'),
    message && React.createElement('p', null, message)
  );
}

export default Enable2FA;
