import React from 'react'
import "./style.css"
import Button from '../Button/Button'

function Episode({title,desc,audio,onClick,index}) {
  return (
    <div>
        <h2>{index}.{title}</h2>
        <p>{desc}</p>
        <Button text={"Play"} onClick={()=>onClick(audio)}></Button>

    </div>
  )
}

export default Episode