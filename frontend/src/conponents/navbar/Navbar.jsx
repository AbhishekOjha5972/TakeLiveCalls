import React from 'react'
import Styles from "./navbar.module.css"
import {Link} from "react-router-dom"
import {RxAvatar} from "react-icons/rx"
import { useSelector } from 'react-redux'
const Navbar = () => {
    const {user} = useSelector((store)=>store.masterAuthentication)
    return (
        <nav className={Styles.navbar_container}>
            <Link to="/" className={Styles.logo_container}>
                <img src={"live_call_talk_logo.png"} />
                <span>Take Live Calls</span>
            </Link>
            <section className={Styles.navigation_buttons_container}>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/authentication">{Object.keys(user).length?user.name:<RxAvatar/>}</Link>
            </section>
        </nav>
    )
}

export default Navbar