/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState,useMemo } from 'react';
import './index.scss'
import ModalComponent from '../Modal';
import PostCard from '../PostsCard';
import getCurrentTimeStamp from '../../../helpers/useMoment';
import { postStatus,getStatus,updatePost } from '../../../api/FirestoreAPIs';
import getUniqeId from '../../../helpers/getUniqeId';
import { uploadPostImage } from '../../../api/imageUpload';
export default function PostStatus({currentUser}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStauts] = useState("");
    const [allStatus,setAllStatus]=useState([])
    const [currentPost,setCurrentPost]=useState({})
    const [isEdit,setIsEdit]=useState(false)
   const [postImage,setPostImage]=useState("")
   console.log(postImage)
    const sendStatus= async()=>{
      let object={
        status:status,
        timeStame:getCurrentTimeStamp('LLL'),
        userEmail:currentUser.email,
        userName:currentUser.name,
        postID:getUniqeId(),
        userID: currentUser.userID,
        postImage:postImage

      }
      await postStatus(object);
      await setModalOpen(false);
      setIsEdit(false)
      await setStauts("")
    };
    const getEditData=(posts)=>{
  
      setModalOpen(true)
      setStauts(posts?.status)
      setCurrentPost(posts)
      setIsEdit(true)

    }
    const updateStatus=()=>{
      updatePost(currentPost.id,status,postImage)
      setModalOpen(false)
    }
    
    useMemo(()=>{
      getStatus(setAllStatus)
    },[])
    
  
  return (
    <div className='post-status-main'>
      <div  className='user-details'>
      <img  src={currentUser?.imageLink} alt="imageLink" />
      <p className='name'> {currentUser?.name}</p>
      <p className='headline'>{currentUser?.headline}</p>
      </div>
        <div className='post-status'>
        <img className='post-image' src={currentUser?.imageLink} alt={currentUser?.imageLink} />
            <button className='open-post-modal' onClick={()=>{setIsEdit(false),setModalOpen(true)}}>Start a Post</button>

        </div>
        <ModalComponent status={status} 
        setStauts={setStauts} 
        sendStatus={sendStatus} 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}/>
        <div>
        {allStatus.map((posts)=>{
          return (
           <PostCard posts={posts} getEditData={getEditData} />
          )
        })}

        </div>
    </div>
  )
}
