/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {  Modal,Button, Progress } from 'antd';
import {AiOutlinePicture} from 'react-icons/ai'
import ReactQuill from 'react-quill';

import './index.scss'
const ModalComponent = ({
    modalOpen,
    setModalOpen,
    sendStatus,
    status,
    setStauts,
    isEdit,
    updateStatus,
    postImage,
    uploadPostImage,
    setPostImage,
    currentPost,
    setCurrentPost
  }) => {
    const [progress,setProgress]=useState(0)
  return (
    <React.StrictMode>

      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => {
          setStauts('')
          setModalOpen(false)
          setPostImage("")
          setCurrentPost({})
                }}
        onCancel={() => {
          setStauts('')
          setModalOpen(false)
          setPostImage("")
          setCurrentPost({})
        }}
          footer={[
            <Button 
            onClick={isEdit?updateStatus:sendStatus}
            key="submit"
            type="primary"
         disabled={status.length>0||postImage.length>0?false:true}
            >{isEdit?'Update':'Post'}</Button>
        ]}
      >
      
    <div className='posts-body'>

    <ReactQuill className='modal-input' placeholder='Share Something Useful..' theme='snow' value={status} onChange={setStauts}/>
  {progress===0||progress===100?<></>:<div className='progress-bar'>

<Progress type='circle' percent={progress}/>

</div>}

    {postImage?.length>0||currentPost?.postImage?.length?<img className='preview-image' src={postImage||currentPost?.postImage} alt="postImage" />:<></>}
    </div>
    <label htmlFor="pic-upload">  <AiOutlinePicture size={35} className='picture-icon'/></label>
    <input id='pic-upload' type='file' hidden onClick={(event)=>uploadPostImage(event.target.files[0],setPostImage,setProgress)}/>
  
    
      </Modal>
    
    </React.StrictMode>
  )
};

export default ModalComponent;