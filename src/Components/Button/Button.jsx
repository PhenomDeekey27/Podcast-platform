import React from 'react'
import "./Style.css"

function Button({text,onClick,disabled,width}) {
  return (
    <div onClick={onClick} className='custom-btn' disabled={disabled} style={{width:width}}>{text}</div>
  )
}

export default Button