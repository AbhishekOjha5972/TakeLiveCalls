import { useDispatch } from 'react-redux';
import useToggle from '../../customHooks/CustomToggler'
import Styles from "./authentication.module.css"
import { useRef } from 'react';
import { signupAction } from '../../redux/auth/auth.actions';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [isToggle, toggle] = useToggle();
  const dispatch = useDispatch();
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()

  const handleSignup = () => {
    let obj = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    console.log('obj:', obj)
    dispatch(signupAction(obj, toggle))
  }

  const handleSignin = () => {
    let obj = {
      username: usernameRef.current.value,
      passwordRef: passwordRef.current.value
    }
    dispatch(signupAction(obj, navigate))
  }

  return (
    <div className={Styles.auth_container}>
      <div className={Styles.form}>
        {
          isToggle ? <h2>Sign up</h2> : <h2>Sign in</h2>
        }
        <input ref={usernameRef} type="email" placeholder="Your username" />
        <input type="password" ref={passwordRef} placeholder="Your password" />
        {
          isToggle ? <a href="#" type="button" onClick={handleSignup}>Sign up</a> : <a href="#" type="button" onClick={handleSignin}>Sign in</a>
        }
        <p onClick={toggle}>{isToggle ? "or sign in with" : "or sign up with"}</p>

      </div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle_1}></div>
      <div className={Styles.circle_2}></div>
    </div>
  )
}

export default Authentication