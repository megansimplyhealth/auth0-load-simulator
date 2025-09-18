const axios = require('axios');

const AUTH0_DOMAIN = '';
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const AUDIENCE = '';
const SCOPE = 'openid profile email'; 

// List of test users
const testUsers = [
  { username: '259144', password: 'Testing12345!' },
  { username: '257822', password: 'Testing12345!' },
  { username: '251802', password: 'Testing12345!' },
  { username: '258981', password: 'Testing12345!' },
  { username: '252918', password: 'Testing12345!' },
  { username: '254858', password: 'Testing12345!' },
  { username: '253118', password: 'Testing12345!' },
  { username: '230053', password: 'Testing12345!' },
  { username: '259786', password: 'Testing12345!' },
  { username: '220958', password: 'Testing12345!' },
  { username: '260497', password: 'Testing12345!' },
  { username: '255230', password: 'Testing12345!' },
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
  for (const user of testUsers) {
    await loginUser(user.username, user.password);
  }
})();
 