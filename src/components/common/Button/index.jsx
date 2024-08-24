/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './index.scss'

export default function Button({title,onClick}) {
  return (
<>
<button className='common-btn' onClick={onClick}>{title}</button>
</>
  )
}
