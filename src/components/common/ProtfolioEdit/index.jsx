/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { editProtfile } from '../../../api/FirestoreAPIs'
import { AiOutlineClose } from 'react-icons/ai'
import './index.scss'
export default function ProtfoliEdit({onEdit,currentUser}) {
    const [editInputs,setEditInputs]=useState(currentUser)
    const getInput=(event)=>{
        let {name,value}=event.target;
        let input={[name]:value}
        setEditInputs({...editInputs,...input})

    }
    const updateProfileData=async()=>{
       await editProtfile(currentUser?.userID,editInputs)
       await onEdit()

    }
  return (
    <div className='profile-card'>
      
        <div className='edit-btn'>
          <AiOutlineClose className='close-icon' onClick={onEdit} size={25}/>
  </div>
  <div className='profile-edit-inputs'>
    <label htmlFor=""> Name</label>
    <input onChange={getInput} className='common-input' placeholder='Name' name='name' value={editInputs.name} />
    <label htmlFor="">Headline</label>
    <input onChange={getInput} className='common-input' placeholder='Headline' name='headline' value={editInputs.headline}  />
    <label htmlFor="">Country</label>
    <input onChange={getInput} className='common-input' placeholder='Country' name='country'value={editInputs.country}  />
    <label htmlFor="">City</label>
    <input onChange={getInput} className='common-input' placeholder='City' name='city'value={editInputs.city}  />
    <label htmlFor="">Company</label>
    <input onChange={getInput} className='common-input' placeholder='Company' name='company'value={editInputs.company}  />
    <label htmlFor="">Industry</label>
    <input onChange={getInput} className='common-input' placeholder='Industry' name='industry' value={editInputs.industry} />
    <label htmlFor="">College</label>
    <input onChange={getInput} className='common-input' placeholder='College' name='college' value={editInputs.college} />
    <label htmlFor="">Website</label>
    <input onChange={getInput} className='common-input' placeholder='Website' name='website' value={editInputs.website} />
    <label htmlFor="">About</label>
    <textarea name="aboutMe" onChange={getInput}  className='common-textArea' placeholder='About Me' value={editInputs.aboutMe}  rows={5} ></textarea>
    <label htmlFor="">Skills</label>
    <input onChange={getInput} className='common-input' placeholder='Skills' name='skills' value={editInputs.skills} />
  </div>
  <div className='save-container'>
    <button className='save-btn' onClick={updateProfileData}>Save</button>
    </div>
  </div>
  )
}
