// import * as authTypes from './auth.types';

import { AUTH_ERROR, AUTH_LOADING } from "./auth.types";

let savedNavigate;
// /** 
//  * * Using 'fetch' instead of 'axios' because when I'm sending error from the backend at
//  * * that time axios is not able to catch the response messages with error status codes
//  * * like 400 and above codes, but fetch is able get the errors with message and the 
//  * * status properly,
//  * * But for accessing the status we will get it from the first 'response' and for 
//  * * the data we need to do 'response.json()'
//  * */


// /**
//  * - SIGNIN FOR USERS
//  * @param {cred} cred - credentials for signin `cred: {username, password}`
//  * @param {navigate} navigate - navigate for navigating the user to the `sign-in` page
//  * */

export const signin = (cred, navigate) => async (dispatch) => {
     if (toastMsg) savedToastMsg = toastMsg;
     else toastMsg = savedToastMsg;

     if (navigate) savedNavigate = navigate;
     else navigate = savedNavigate;


     if (!cred.username || !cred.password) return;

     dispatch({ type: authTypes.AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signin`, {
               method: 'POST',
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();

          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT })
               alert(`Session Expired! \n Please Login again.. ${navigate ? navigate('/signin') : window.location.replace('/signin')}`)
               return;
          }

          if (res.ok) {
               dispatch({ type: authTypes.AUTH_LOGIN_SUCCESS, payload: data.user });
               navigate('/');
          } else {
               dispatch({ type: authTypes.AUTH_ERROR });
          }

          alert(data.message)

     } catch (error) {
          console.log('error:', error);
          dispatch({ type: authTypes.AUTH_ERROR });
          alert(error.message);
     }
}


// /**
//  * - SIGNUP FOR USERS
//  * @param {cred} cred - credentials for signin `cred: {username, password}`
//  * @param {navigate} navigate - navigate for navigating the user to the `events` page
//  * */
export const signupAction = (cred, toggle) => async (dispatch) => {
    console.log('cred:', cred)
     if (!cred.username || !cred.password) return;

     // ? PASSWORD VERIFIER
     if (cred.password.length <= 5) {
          alert('Password must contain more than 5 char!')
          return;
     }

     dispatch({ type:AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`, {
               method: "POST",
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();
          console.log('data:', data)
          toggle()
          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               alert(`Session Expired! \n Please Login again..`)
               return;
          }
     } catch (error) {
          dispatch({ type: AUTH_ERROR })
          alert(error.message);
     }
}