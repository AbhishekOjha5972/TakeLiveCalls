import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getEventAction, getOptionsAction } from '../../redux/events/event.actions'
import Styles from "./home.module.css"
import { BsSearch } from "react-icons/bs"
import EventComponent from '../../conponents/event/EventComponent'

const Home = () => {
  const dispatch = useDispatch()
  const { events, options, loading } = useSelector((store) => store.masterEvents)
  const [stateFilter, setStateFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  
  let stateRef = useRef(null)
  let countryRef = useRef(null)

  useEffect(() => {
    dispatch(getEventAction())
    dispatch(getOptionsAction())
  }, [])


  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (value) => {
    console.log(stateFilter, countryFilter)
    let url = "?q="
    if (value !== "") url += value
    if (countryRef.current && countryRef.current.value !== "Choose Country") {
      url += `&country=${countryRef.current.value}`
    }
    if (stateRef.current && stateRef.current.value !== "Choose State") {
      url += `&state=${stateRef.current.value}`
    }
    dispatch(getEventAction(url))
  };
  const callToDebounce = useCallback(debounce(handleChange), []);


  const haneleFilterBasedOnSelectTag = (val) => {
    console.log('val:', val)
    let url = "?"
    if (countryRef.current && countryRef.current.value !== "Choose Country" &&
      stateRef.current && stateRef.current.value !== "Choose State") {
      url += `state=${stateRef.current.value}&country=${countryRef.current.value}`
    }
    if ((!stateRef.current || stateRef.current.value == "Choose State") && val !== "Choose Country") {
      url += `country=${countryRef.current.value}`
    }
    if ((!countryRef.current || countryRef.current.value == "Choose State") && val !== "Choose State") {
      url += `state=${stateRef.current.value}`
    }
    dispatch(getEventAction(url))
  }

  return (
    <div>
      <nav className={Styles.home_navbar_container}>
        <section className={Styles.home_navbar_content}>
          <h2>What do you want to play today?</h2>
          <div className={Styles.home_navbar_search}>
            <BsSearch />
            <input type='text' placeholder='Search event...'
              onChange={(e) => callToDebounce(e.target.value)}
            />
          </div>
          <div className={Styles.home_navbar_filter}>
            <select onChange={(e) => {
              setCountryFilter(e.target.value)
              haneleFilterBasedOnSelectTag(e.target.value)
            }} defaultValue={countryFilter}
              ref={countryRef}
              required
            >
              <option>Choose Country</option>
              {
                options.countries?.map((ele, i) => {
                  return <option value={ele} key={i}>{ele}</option>
                })
              }
            </select>
            <select onChange={(e) => {
              setStateFilter(e.target.value)
              haneleFilterBasedOnSelectTag(e.target.value)
            }} defaultValue={stateFilter}
              ref={stateRef}
            >
              <option>Choose State</option>
              {
                options.states?.map((ele, i) => {
                  return <option value={ele} key={i + 10}>{ele}</option>
                })
              }
            </select>
          </div>
        </section>
      </nav>

      <section className={Styles.home_events_container}>
        {
          !loading ?
            <>
              {
                events?.map((ele, i) => {
                  return <EventComponent key={i} element={ele} />
                })
              }
            </>
            : <h2 style={{ textAlign: 'center' }}>Loading.....</h2>
        }
      </section>
    </div >
  )
}

export default Home