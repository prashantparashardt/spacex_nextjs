import React from 'react'
import styles from './Filter.module.css'

function Filter (props) {
  const launch_year = [
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020
  ]
  const launch_success = ['true', 'false']
  const land_success = ['true', 'false']

  return (
    <div className={styles.app_page_filter}>
      <div className={styles.filter_div}>
        <div className={styles.filter_data}>Filters</div>
        <div className={styles.launch_year}>
          <p className={styles.filter_title}>Launch Year</p>
          <hr className={styles.filter_horizontal_row} />
          <div
            className={styles.launch_year_button_white}
            // className={styles.white_background}
          >
            {launch_year.map((year, index) => {
              return (
                <div
                  className={
                    props.launchYear == year
                      ? styles.year_button_selected
                      : styles.year_button
                  }
                  key={index}
                  onClick={() => props.clickFilter(year, 'launch_year')}
                >
                  {year}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.launch_success}>
          <p className={styles.filter_title}>Successful Launch</p>
          <hr className={styles.filter_horizontal_row} />
          <div
            className={styles.launch_success_button_white}
            // className={styles.white_background}
          >
            {launch_success.map(success => (
              <div
                key={success}
                className={
                  props.launchSuccess === success
                    ? styles.year_button_selected
                    : styles.year_button
                }
                onClick={() => props.clickFilter(success, 'launch_success')}
              >
                {success}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.land_success}>
          <p className={styles.filter_title}>Successful Landing</p>
          <hr className={styles.filter_horizontal_row} />
          <div
            className={styles.land_success_button_white}
            //  white_background'
          >
            {land_success.map(success => (
              <div
                key={success}
                className={
                  props.landSuccess === success
                    ? styles.year_button_selected
                    : styles.year_button
                }
                onClick={() => props.clickFilter(success, 'land_success')}
              >
                {success}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
