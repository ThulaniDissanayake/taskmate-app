export async function enable2FA(token) {
  const res = await fetch('/api/users/enable-2fa', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  return res.json();
}

export async function verify2FA(token, otp) {
  const res = await fetch('/api/users/verify-2fa', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ otp })
  });
  return res.json();
}


