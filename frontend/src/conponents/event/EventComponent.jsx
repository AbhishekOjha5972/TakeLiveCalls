import React, { useEffect, useState } from 'react'
import Styles from "./eventComponent.module.css"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getUsersPersonalEventsAction } from '../../redux/events/event.actions'

const EventComponent = ({ element, show = false }) => {
    const { accepted, createdAt, endTime, limit, nameOfEvent, shortDescription, startTime, updatedAt, _id } = element
    const [request, setRequest] = useState()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleGetRequestedEvents = async () => {
        let token = JSON.parse(localStorage.getItem("token"))
        setLoading(true)
        let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events/pending-requests/${_id}`, {
            method: "GET",
            headers: {
                authorization: token, // Assuming 'token' is defined elsewhere
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setRequest(data.data)
        setLoading(false)
    }
    
    
    const handleGiveRespond = async (val,userID) => {
        let token = JSON.parse(localStorage.getItem("token"))
        setLoading(true)
        let res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/events/join/${_id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "haveToAddIntoTheEvent": userID,
                "status": val
            }),
            headers: {
                authorization: token, // Assuming 'token' is defined elsewhere
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        dispatch(getUsersPersonalEventsAction())
        setLoading(false)
    }

    useEffect(() => {
        if (show || element) {
            handleGetRequestedEvents()
        }
    }, [show, element])

    return (
        <>
            <Link to={`/event/details/${_id}`} className={Styles.event_component_container}>
                <div>
                    <h1 className={Styles.value}>{nameOfEvent}</h1>
                    <i className={Styles.value}>{shortDescription}</i>
                </div>
                <div>
                    <div className={Styles.availability}>
                        <span className={Styles.fields}>Rooms</span>
                        <span className={Styles.value}><bdi>{accepted.length}</bdi>/{limit}</span>
                    </div>
                    <div className={Styles.date_and_time}>
                        <div>
                            <span className={Styles.fields}>Start At</span>
                            <span className={Styles.value}>{getDateAndTime(startTime)}</span>
                        </div>
                        <div>
                            <span className={Styles.fields}>End At</span>
                            <span className={Styles.value}>{getDateAndTime(endTime)}</span>
                        </div>
                    </div>
                </div>
            </Link>
            {
                show ? <section className={Styles.pending_requests_container}>
                    <h3>All Requests</h3>
                    {
                        loading ? <h3>Loading...</h3> : <>
                            {
                                request?.map((ele, i) => {

                                    return ele && <div key={i} className={Styles.pending_requests_items}>
                                        <div>
                                            <div>
                                                <span className={Styles.fields}>Name</span>
                                                <span className={Styles.value}>{ele.userID.username}</span>
                                            </div>
                                            <div>
                                                <span className={Styles.fields}>Status</span>
                                                <span className={Styles.value}>{ele.status}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={()=>handleGiveRespond("accepted",ele.userID)}>Accepted</button>
                                            <button onClick={()=>handleGiveRespond("rejected",ele.userID)}>Rejected</button>
                                        </div>
                                    </div>
                                })
                            }
                        </>
                    }
                </section> : null
            }
        </>
    )
}

export default EventComponent

// Get local date and time
function getDateAndTime(createdAt) {
    const dateAndTime = new Date(createdAt);
    const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
    return `${date} | ${time}`;
}