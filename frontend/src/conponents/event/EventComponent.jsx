import React from 'react'
import Styles from "./eventComponent.module.css"
import Modal from '../modal/Modal'

const EventComponent = ({ element }) => {
    const { accepted, createdAt, endTime, limit, nameOfEvent, shortDescription, startTime, updatedAt, _id } = element
    console.log('createdAt:', createdAt)

    return (
        <div className={Styles.event_component_container}>
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
                        <span className={Styles.value}>{getDateAndTime(startTime).date}</span>
                        <span className={Styles.value}>{getDateAndTime(startTime).time}</span>
                    </div>
                    <div>
                        <span className={Styles.fields}>End At</span>
                        <span className={Styles.value}>{getDateAndTime(endTime).date}</span>
                        <span className={Styles.value}>{getDateAndTime(endTime).time}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventComponent

// Get local date and time
function getDateAndTime(createdAt) {
    const dateAndTime = new Date(createdAt);
    const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
    return { date, time };
}