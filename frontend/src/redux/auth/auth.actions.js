
import { AUTH_ERROR, AUTH_LOADING, AUTH_SIGNUP_SUCCESS, AUTH_SUCCESS } from "./auth.types";

/**
 * - SIGNIN FOR USERS
 * @param {cred} cred - credentials for signin `cred: {username, password}`
 * @param {navigate} navigate - navigate for navigating the user to the `home page` page
 * */

export const loginAction = (cred, navigate) => async (dispatch) => {
     if (!cred.username || !cred.password) return;

     dispatch({ type: AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/login`, {
               method: 'POST',
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();
          console.log('data:', data)

          if (res.ok) {
               localStorage.setItem("token", JSON.stringify(data.user.token))
               dispatch({ type: AUTH_SUCCESS, payload: data.user });
               navigate('/');
          } else {
               dispatch({ type: AUTH_ERROR });
          }
          alert(data.message)
     } catch (error) {
          console.log('error:', error);
          dispatch({ type: AUTH_ERROR });
          alert(error.message);
     }
}

/**
 * - SIGNUP FOR USERS
* @param {cred} cred - cred contain these keys `cred: {username, password}`
* @param {toggle} toggle - toggle function is being used in change or toggle the state between signin or signup
* */
export const signupAction = (cred, toggle) => async (dispatch) => {
     if (!cred.username || !cred.password) return;

     // ? PASSWORD VERIFIER
     if (cred.password.length <= 5) {
          alert('Password must contain more than 5 char!')
          return;
     }

     dispatch({ type: AUTH_LOADING });

     try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/signup`, {
               method: "POST",
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })
          const data = await res.json();
          alert(data.message)
          dispatch({ type: AUTH_SIGNUP_SUCCESS })
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