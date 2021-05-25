import React from 'react'
import {useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./DetailsRound.css"

const DetailsRound = (props) => {
  const {currentUser} = props
  const { id } = useParams()
  const [round, setRound] = useState({})

  useEffect(() => {
    if (currentUser) {
      setRound(currentUser.recentRounds[id])
    }
  }, [currentUser])
  

  const convertDate = (roundDate) => {
   let date = new Date(roundDate);
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
  } 

  return (
    <div className="round-details-container">
      <div>{round.course}</div>
      <div>{convertDate(round.createdAt)}</div>
      <div>{round.par}</div>
      <div>{round.holes}</div>
      <div>{round.score}</div>
      <div>{round.fairwaysHit}</div>
      <div>{round.possibleFairways}</div>
      <div>{round.putts}</div>
      <div>{round.greens}</div>
      <div>{round.upAndDowns}</div>
      <div>{round.possibleUpAndDowns}</div>
    </div>
  )
}

export default DetailsRound
