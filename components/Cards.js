import React from 'react'
import styles from './Cards.module.css'
import Card from '../components/Card'

function Cards ({ cardData }) {
  // console.log(cardData)
  return (
    <div className={styles.app_page_card}>
      {cardData &&
        cardData.map(item => <Card key={item.flight_number} cardData={item} />)}
    </div>
  )
}

export default Cards
