import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getEventAction, getOptionsAction } from '../../redux/events/event.actions'
import Styles from "./home.module.css"
import { BsSearch } from "react-icons/bs"
import EventComponent from '../../conponents/event/EventComponent'

const Home = () => {
  const dispatch = useDispatch()
  const { events, options } = useSelector((store) => store.masterEvents)


  console.log('options:', options)
  console.log('events:', events)
  useEffect(() => {
    dispatch(getEventAction())
    dispatch(getOptionsAction())
  }, [])
  return (
    <div>
      <nav className={Styles.home_navbar_container}>
        <section className={Styles.home_navbar_content}>
          <h2>What do you want to play today?</h2>
          <div className={Styles.home_navbar_search}>
            <BsSearch />
            <input type='text' placeholder='Search event...' />
          </div>
          <div className={Styles.home_navbar_filter}>
            <select>
              <option>Choose Country</option>
              {
                options.countries?.map((ele) => {
                  return <option value={ele} key={Date.now()}>{ele}</option>
                })
              }
            </select>
            <select>
              <option>Choose Country</option>
              {
                options.states?.map((ele) => {
                  return <option value={ele} key={Date.now()}>{ele}</option>
                })
              }
            </select>
          </div>
        </section>
      </nav>

      <section className={Styles.home_events_container}>
        {
          events.length ?
            <>
              {
                events?.map((ele, i) => {
                  return <EventComponent key={i} element={ele} />
                })
              }
            </>
            : <h2>Loading...</h2>
        }
      </section>
    </div >
  )
}

export default Home