import React, { useState } from 'react'

function FileInput({accept,id,filehandleDoc,text}) {
    const [fileselected,Setfileselected]=useState("")
    const fileSet=(e)=>
    {
        console.log(e.target.files);
        Setfileselected(e.target.files[0].name)
        filehandleDoc(e.target.files[0])
       
    }
  return (
    <>
    <label htmlFor={id} className="custom-input label" >
     {fileselected ? `File ${fileselected} Selected`:text}
    </label>
    <input type="file" accept={accept} id={id} style={{display:"none"}} onChange={fileSet} />
    </>
  )
}

export default FileInput
