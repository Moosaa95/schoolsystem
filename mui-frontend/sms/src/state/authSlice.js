import { createSlice } from "@reduxjs/toolkit";



// function setCookie(name, value, options = {}) {
//     options = {
//       path: '/',
//       ...options,
//     };
  
//     if (options.expires instanceof Date) {
//       options.expires = options.expires.toUTCString();
//     }
  
//     let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  
//     for (let optionKey in options) {
//       updatedCookie += '; ' + optionKey;
//       let optionValue = options[optionKey];
//       if (optionValue !== true) {
//         updatedCookie += '=' + optionValue;
//       }
//     }
  
//     document.cookie = updatedCookie;
//   }

const TOKEN_STORAGE_KEY = 'SMS_auth_token';
const USERNAME_STORAGE_KEY = "username"

// function getSavedToken() {
//   return localStorage.getItem(TOKEN_STORAGE_KEY) || getCookie(TOKEN_STORAGE_KEY);
// }

// function saveToken(token) {
//   localStorage.setItem(TOKEN_STORAGE_KEY, token);
//   setCookie(TOKEN_STORAGE_KEY, token, { expires: 7 });
// }

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: getSavedToken(),
//     isLoggedIn: false,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload.token;
//       state.isLoggedIn = true;
//       saveToken(action.payload.token);
//     },
//     logout: (state) => {
//       state.token = null;
//       state.isLoggedIn = false;
//       localStorage.removeItem(TOKEN_STORAGE_KEY);
//       deleteCookie(TOKEN_STORAGE_KEY);
//     },
//   },

function getSavedToken(){
    return localStorage.getItem(TOKEN_STORAGE_KEY) || null;
}

function saveToken(token){
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

function saveUser(username){
    sessionStorage.setItem(USERNAME_STORAGE_KEY, username)
}


function removeToken(){
    localStorage.removeItem(TOKEN_STORAGE_KEY)
}


const authSlice = createSlice({
    name: "auth",
    initialState: { username: null, token: getSavedToken()},
    reducers: {
        setCredentials: (state, action) => {
            const {username, token } = action.payload
            console.log('credentials', username, token);
            state.username = username
            state.token = token
            saveToken(token);
            saveUser(username)
        },
        logOut: (state, action) => {
            state.username = null 
            state.token = null 
            removeToken()
            // localStorage.removeItem(TOKEN_STORAGE_KEY);
            // deleteCookie(TOKEN_STORAGE_KEY);
        }
    },
})


export const { setCredentials, logOut} = authSlice.actions


export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.username
export const selectCurrentToken = (state) => state.auth.token
// export const selectCurrentToken = (state) => getSavedToken()
