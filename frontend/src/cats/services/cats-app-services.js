import axios from 'axios';
// const CAT_BACKEND_API_BASE = process.env.API_BASE;
const CAT_BACKEND_API_BASE = "http://localhost:4000"

const USERS_API = `${CAT_BACKEND_API_BASE}/users`;

// THESE ARE OUR BACKEND ENDPOINTS:
// app.get('/users', ); 
// app.get('/users/:uid', ); 
// app.post('/users', );
// app.put('/users/:uid', );
// app.delete('/users/:uid', );

// app.post('/register', )
// app.post('/login', )
// app.post('/logout', )
// app.post('/profile', ) // profile of current user
// app.post('/profile/:uid', ) // profile of a different user

// app.get('/recent/:uid', ); 

export const createUser = async (user) => {
  console.log('creating new user...')
  const response = await axios.post(USERS_API, user)
  return response.data;
} 

export const findUsers = async () => {
  console.log('USERS_API=', USERS_API)
  console.log('finding all users...')
  const response = await axios.get(USERS_API);
  const users = response.data;
  return users;
}

export const findUser = async (uid) => {
  console.log('USERS_API=', USERS_API)
  console.log('finding the users with id:', uid)
  const response = await axios.get(`${USERS_API}/${uid}`)
  const user = response.data;
  console.log('got user:', user)
  return user;
}

export const deleteUser = async (uid) => {
  console.log('deleting user...')
  const response = await axios.delete(`${USERS_API}/${uid}`)
  return response.data
}

export const updateUser = async (user) => {
  console.log('updating user...')
  await axios.put(`${USERS_API}/${user._id}`, user);
  return user;
}

export const registerUser = async (user) => {
  console.log('registering new user:', user)
  const response = await axios.post(`${CAT_BACKEND_API_BASE}/register`, user);
  console.log('res:', response)
  return response.data
}

export const login = async (credentials) => {
  console.log('attempting login with credentials:', credentials)
  const response = await axios.post(`${CAT_BACKEND_API_BASE}/login`, credentials);
  console.log('res:', response)
  return response.data
}

export const logout = async () => {
  console.log('attempting logout')
  const response = await axios.post(`${CAT_BACKEND_API_BASE}/logout`);
  console.log('res:', response)
  return response.data
}

export const getAnonRecentActivity = async () => {
  console.log('CAT_BACKEND_API_BASE=', CAT_BACKEND_API_BASE)
  console.log('getting anon recent activity...')
  const response = await axios.get(`${CAT_BACKEND_API_BASE}/recent`);
  const users = response.data;
  return users;
}

export const getLoggedInRecentActivity = async (uid) => {
  console.log('CAT_BACKEND_API_BASE=', CAT_BACKEND_API_BASE)
  console.log('getting recent activity for logged in user')
  const response = await axios.get(`${CAT_BACKEND_API_BASE}/recent/${uid}`);
  const recent = response.data;
  console.log('recent stuff:', recent)
  return recent;
}


