import React from 'react'
import { CircularProgress } from '@mui/material'

function Loader() {
    let primary="#ffebee"
  return (
    <div className='loader'>
       <CircularProgress />
    </div>
  )
}

export default Loader