import React from 'react'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {getGroup} from "../../services/group"

const Group = (props) => {

  const { id } = useParams()
  const { group, setGroup } = props


  useEffect(() => {
    const fetchGroup = async () => {
      const newGroup = await getGroup(id)
      setGroup(newGroup)
    }
    fetchGroup()
  }, [id])

  console.log(group)

  return (
    <div>
      {group.name}
    </div>
  )
}

export default Group
