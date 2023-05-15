import React, { useEffect } from 'react'
import FormComponent from '../../conponents/form/FormComponent'
import Styles from "./dashboard.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getUsersAppliedEventsAction, getUsersPersonalEventsAction } from '../../redux/events/event.actions'
import EventComponent from '../../conponents/event/EventComponent'
import useToggle from '../../customHooks/CustomToggler'
import Modal from '../../conponents/modal/Modal'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { ownerOfEvents, pendingEvents, loading } = useSelector((store) => store.masterEvents)
  const [isToggle, toggle] = useToggle()

  useEffect(() => {
    dispatch(getUsersPersonalEventsAction())
    dispatch(getUsersAppliedEventsAction())
  }, [])

  return (
    <>
      <div className={Styles.deshboard_container}>
        <nav>
          <button onClick={toggle}>My Events</button>
          <button onClick={toggle}>Applied Events</button>
          <Modal>
              <FormComponent/>
          </Modal>
        </nav>
        <h2>{isToggle ? "Applied Events" : "My Events"}</h2>
        {
          !isToggle ?
            <section className={Styles.deshboard_event_container}>
              {
                !loading ? ownerOfEvents?.map((ele, i) => {
                  return <EventComponent key={i} element={ele} show={true} />
                }) : <h3 style={{ textAlign: "center" }}>Loading...</h3>
              }
            </section>
            :
            <section>
              {
                !loading ? pendingEvents?.map((ele,i) => {
                  return <div key={i} className={Styles.status_shower_in_dashboard}>
                    <EventComponent element={ele.eventID} />
                    <span className={Styles.status_span_in_dashboard}><bdi>Status:</bdi>{ele.status}</span>
                  </div>
                }) : <h3 style={{ textAlign: "center" }}>Loading...</h3>
              }
            </section>
        }

      </div>
      <div className={Styles.circle}></div>
      <div className={Styles.circle_1}></div>
      <div className={Styles.circle_2}></div>
      <div className={Styles.circle_3}></div>
      <div className={Styles.circle_4}></div>
    </>
  )
}

export default Dashboard