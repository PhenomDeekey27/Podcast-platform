import React from 'react'
import "./styles.css"
import { Link } from 'react-router-dom'

function PodcastCard({title,displayImage,id}) {
  return (
    <Link to={`/podcast/${id}`}>
    <div className='podcast-card'>
        <img src={displayImage} alt="" />
        <p>{title}</p>
        </div>
    </Link>
  )
}

export default PodcastCard