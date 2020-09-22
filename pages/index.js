import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
import Filter from '../components/Filter'

export default function Home () {
  const [state, setState] = useState({
    cardData: null,
    url: 'https://api.spaceXdata.com/v3/launches?limit=100',
    launch_success: null,
    land_success: null,
    launch_year: null,
    key: 0
  })
  const getUrlParam = url => {
    let params = new URLSearchParams(document.location.search.substring(1))
    let launch = params.get('launch_success')
    let land = params.get('land_success')
    let year = params.get('launch_year')
    let stateUrl = url
    if (launch) {
      stateUrl = stateUrl + `&launch_success=${launch}`
    }
    if (land) {
      stateUrl = stateUrl + `&land_success=${land}`
    }
    if (year) {
      stateUrl = stateUrl + `&launch_year=${year}`
    }
    setState({
      url: stateUrl,
      launch_success: launch,
      land_success: land,
      launch_year: year,
      key: 1
    })
  }
  useEffect(() => {
    getUrlParam(state.url)
  }, [])

  useEffect(() => {
    if (state.key > 0) {
      axios.get(state.url).then(response => {
        setState(prevState => {
          return { ...prevState, cardData: response }
        })
      })
    }
  }, [state.url, state.key])

  const clickFilter = (buttonClicked, filterName) => {
    let stateUrl = new URL(state.url)
    let url = new URL(window.location)
    if (state[filterName] !== buttonClicked) {
      stateUrl.searchParams.set(filterName, buttonClicked)
      url.searchParams.set(filterName, buttonClicked)
      window.history.replaceState(null, null, url)
      setState(prevState => {
        return {
          ...prevState,
          url: stateUrl,
          [filterName]: buttonClicked
        }
      })
    } else {
      stateUrl.searchParams.delete(filterName)
      url.searchParams.delete(filterName)
      window.history.replaceState(null, null, url)
      setState(prevState => {
        return {
          ...prevState,
          url: stateUrl,
          [filterName]: null
        }
      })
    }
  }

  // const getData = () => {
  //   const params = new URLSearchParams(window.location.search.slice(1))
  //   const launchYear = params.get('launch_year')
  //   const launchSuccess = params.get('launch_success')
  //   const landSuccess = params.get('land_success')
  //   // console.log(launchYear, launchSuccess, landSuccess)
  //   params.delete(launchYear)
  //   console.log(params.get('launch_year'))
  // }
  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className={styles.App}>
      <h1 className={styles.heading}>SpaceX Launch Programs</h1>
      <div className={styles.app_page}>
        <Filter
          clickFilter={clickFilter}
          launchYear={state.launch_year}
          launchSuccess={state.launch_success}
          landSuccess={state.land_success}
        />
        {state.cardData ? (
          state.cardData.data.length > 0 ? (
            <Cards cardData={state.cardData} />
          ) : (
            <div className={styles.app_img} style={{ alignContent: 'center' }}>
              <h1>No data found on the server</h1>
            </div>
          )
        ) : (
          <img
            className={styles.app_img}
            src='https://media.giphy.com/media/xT8qBhrlNooHBYR9f2/giphy.gif'
            alt='loader'
          />
        )}
      </div>
      <h2 className={styles.bottom_div}>Developed By: Prashant Parashar</h2>
    </div>
  )
}
