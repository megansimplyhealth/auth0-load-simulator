const axios = require('axios');

// Replace with your Auth0 config
const AUTH0_DOMAIN = '';
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const AUDIENCE = ''; // Optional
const SCOPE = 'openid profile email';   // Optional

// List of test users
const testUsers = [
  { username: 'adwlc_paot@unencumbered.com', password: 'Testing12345!' },
  { username: 'kmqucpwvq@unloose.com', password: 'Testing12345!' },
  { username: 'oymqgrc13@neurogenic.com', password: 'Testing12345!' },
  { username: 'popfj63@lingam.com', password: 'Testing12345!' },
  { username: 'rnml_dovc@decreer.com', password: 'Testing12345!' },
  { username: 'dzgk.jvz@narcoleptic.com', password: 'Testing12345!' }, 
  { username: 'dlobqmif@dividing.com', password: 'Testing12345!' },
  { username: 'bvn.qt@dogwatch.biz', password: 'Testing12345!' },
  { username: 'gyn@cuber.net', password: 'Testing12345!' },
  { username: 'wrjx95@precode.com', password: 'Testing12345!' },
  { username: 'wzqxpgtea@chiselling.com', password: 'Testing12345!' },
  { username: 'lzml_zpjv@revisionist.biz', password: 'Testing12345!' },
];

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(jsonPayload);
	}

async function loginUser(username, password) {
  try {
    const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
      grant_type: "http://auth0.com/oauth/grant-type/password-realm",
      realm: "Dashboard-Users",
      username,
      password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      audience: AUDIENCE,
      scope: SCOPE,
    });

    console.log(`✅ Login successful for ${username}`);

    const user = parseJwt(response.data.id_token);
    console.log('User nickname in return token: ', user.nickname);
    
    if (user.nickname === username) {
      console.log("✅ Token claim user.nickname: " + user.nickname + " matches the username - " + username);
    } else {
      console.error("❌ Token claim user.nickname does NOT match the username.");
      console.error(`Claimed: ${user.nickname}, Expected: ${username}`);
    }

  } catch (error) {
    console.error(`❌ Login failed for ${username}`);
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

// Run login attempts for all test users
(async () => {
  console.log("Running login attempts for pratice staff test users...");
  // 30 second timer before tests run
  await new Promise(resolve => setTimeout(resolve, 30000));
  console.log("30 second timer complete. Tests start now");
  for (const user of testUsers) {
    await loginUser(user.username, user.password);
  }
})();
