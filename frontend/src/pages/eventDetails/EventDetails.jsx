import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificEvent } from '../../redux/events/event.actions';
import { useParams } from 'react-router-dom';
import Styles from "./eventDetails.module.css"
import { AiFillCrown } from "react-icons/ai"
const EventDetails = () => {
    const dispatch = useDispatch()
    const { Id } = useParams()
    const { specificEvent } = useSelector((store) => store.masterEvents);
    console.log('specificEvent:', specificEvent)
    const [loading,setLoading] = useState(false)


    const handleEnrolledEvent = async() =>{
            let token = JSON.parse(localStorage.getItem("token"))
            console.log('Id:', Id)
            setLoading(true)
            let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events/partiallyjoined/${Id}`, {
                method: "POST",
                headers: {
                    authorization: token, // Assuming 'token' is defined elsewhere
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            alert(data.message)
            setLoading(false)
    }
    useEffect(() => {
        dispatch(getSpecificEvent(Id))
    }, [])

    return (
        <div className={Styles.event_details_container}>
            {
                Object.keys(specificEvent).length ? <div className={Styles.event_details_content}>
                    <h2>Details</h2>
                    <div className={Styles.event_component_container} >
                        <div>
                            <h1 className={Styles.value}>{specificEvent.nameOfEvent}</h1>
                            <i className={Styles.value}>{specificEvent.shortDescription}</i>
                            <span><AiFillCrown />{specificEvent.ownerID.username}</span>
                        </div>
                        <div>
                            <div className={Styles.availability}>
                                <span className={Styles.fields}>Rooms</span>
                                <span className={Styles.value}><bdi>{specificEvent.accepted.length}</bdi>/{specificEvent.limit}</span>
                            </div>
                            <div className={Styles.date_and_time}>
                                <div>
                                    <span className={Styles.fields}>Start At</span>
                                    <span className={Styles.value}>{getDateAndTime(specificEvent.startTime)}</span>
                                </div>
                                <div>
                                    <span className={Styles.fields}>End At</span>
                                    <span className={Styles.value}>{getDateAndTime(specificEvent.endTime)}</span>
                                </div>
                            </div>
                            {
                                specificEvent.state &&
                                <div className={Styles.state}>
                                    <span className={Styles.fields}>State</span>
                                    <span className={Styles.value}>{specificEvent.state}</span>
                                </div>
                            }
                            {
                                specificEvent.country &&
                                <div className={Styles.country}>
                                    <span className={Styles.fields}>Country</span>
                                    <span className={Styles.value}>{specificEvent.country}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <h2>Participant</h2>
                        <div className={Styles.participant}>
                            {
                                specificEvent?.accepted?.map((ele, i) => {
                                    return <span key={i}>{ele.username}</span>
                                })
                            }
                        </div>
                    </div>
                    <button disabled={specificEvent.accepted.length==specificEvent.limit} className='std-btn' onClick={handleEnrolledEvent}>{loading?"Loading...":"Enrolled"}</button>
                </div> : <h1>Loading...</h1>
            }
            <div className={Styles.circle}></div>
            <div className={Styles.circle_1}></div>
            <div className={Styles.circle_2}></div>
        </div>
    )
}

export default EventDetails


// Get local date and time
function getDateAndTime(createdAt) {
    const dateAndTime = new Date(createdAt);
    const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
    return `${date} | ${time}`;
}