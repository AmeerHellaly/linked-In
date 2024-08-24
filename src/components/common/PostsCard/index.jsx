/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './index.scss'
import { useNavigate } from 'react-router-dom'
import LikeButton from '../LikeButton'
import { getCurrentUser,getAllUsers,deletePost,getConnection } from '../../../api/FirestoreAPIs'
import { useMemo, useState,useEffect } from 'react'
import { BsPencil,BsTrash } from 'react-icons/bs'
import Modal from 'antd/es/modal/Modal'
export default function PostCard({posts,id,getEditData}) {
  const [currentUser,setCurrentUser]=useState({})
  const [allUsers,setAllUsers]=useState([])
  const [imageModal,setImageModal]=useState(false)
  const [isConnected,setIsConnected]=useState(false)
  let navigate=useNavigate()
  useMemo(()=>{getCurrentUser(setCurrentUser)
    getAllUsers(setAllUsers)
  },[])
  useEffect(()=>{
    getConnection(currentUser.userID,posts.userID,setIsConnected)
  },[currentUser.userID,posts.userID])
 
  return (
     isConnected||
    currentUser.userID===posts.userID?
    <div className='posts-card' key={id}>
      <div className='post-image-wrapper'>
       {currentUser.userID===posts.userID ?<div className='action-container'>
        <BsPencil size={20} className='action-icon' onClick={()=>getEditData(posts)}/>
        <BsTrash size={20} className='action-icon' onClick={()=>deletePost(posts.id)}/>
        </div>:<></>}
      <img
      onClick={()=>setImageModal(true)}
      src={allUsers.filter((item)=>item.id===posts.userID).map((item)=>item.imageLink)[0]} 
      className='profile-image' 
      alt="profile-image" />
      <div>
      <p className='name'onClick={()=>navigate("/profile",{
          state: { id: posts?.userID, email: posts.userEmail },
        })} >{allUsers.filter((user)=>user.id===posts.userID)[0]?.name}</p>
          <p className='headline'>{allUsers.filter((user)=>user.id===posts.userID)[0]?.headline}</p>
        <p className='timestamp'>{posts.timeStame}</p>
          </div>
      </div>
        {posts.postImage?
        <img 
        onClick={()=>setImageModal(true)}
        src={posts.postImage}
         alt="post-image"
         className='post-image'
          />:<></>}
          <p className='status' dangerouslySetInnerHTML={{__html:posts.status}}>

          </p>
       
        
        
        <LikeButton userId={currentUser?.userID} postId={posts.id} currentUser={currentUser} />
        <Modal
        centered
        open={imageModal}
        onOk={()=>setImageModal(false)}
        onCancel={()=>setImageModal(false)}
        footer={[]}
        >
           <img 
        onClick={()=>setImageModal(true)}
        src={posts.postImage}
         alt="post-image"
         className='post-image modal'
          />
        </Modal>
        </div>:<></>


  )
}
