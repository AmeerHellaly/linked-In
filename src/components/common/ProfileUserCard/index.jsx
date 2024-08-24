/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState,useMemo, useEffect} from 'react'
import './index.scss'
import PostCard from '../PostsCard'
import { useLocation } from 'react-router-dom';
import { getSingleStatus, getSingleUser, getStatus,editProtfile } from '../../../api/FirestoreAPIs';
import FileUploadModal from '../FileUpladModal';
import { uploadImage as uploadImageAPI } from '../../../api/imageUpload';
export default function ProfileUserCard({currentUser,onEdit}) {
  let location=useLocation()
  const [allStatus,setAllStatus]=useState([])
  const [currentProfile,setCurrentProfile]=useState({})
  const [currentImage,setCurrentImage]=useState({})
  const [progress,setProgress]=useState(0)
  const [modalOpen,setModalOpen]=useState(false)
  const getImage=(event)=>{
    setCurrentImage(event.target.files[0])
  }
  const uploadImage=()=>{
    uploadImageAPI(currentImage,currentUser.userID,setModalOpen,setProgress,setCurrentImage)
  }
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }
    
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  // console.log(currentUser?.imageLink)
  // useEffect(()=>{
  //   editProtfile(currentUser?.userID,imageLink)
  // },[imageLink])
  return (
    <>
        <FileUploadModal 
          currentImage={currentImage}
          uploadImage={uploadImage}
          getImage={getImage} 
          modalOpen={modalOpen}
          setModalOpen={setModalOpen} 
          progress={progress}/>
    <div className='profile-card'>
      <div className='profile-info'>
        <div>
          <img className='profile-image' 
          src={Object.values(currentProfile).length===0?currentUser.imageLink:currentProfile?.imageLink} 
          alt="profile-image" 
          onClick={()=>setModalOpen(true)} />
      <h3 className='userName'>
      {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
        </h3>
        <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p className="location">
            {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country}`
                :`${currentProfile?.city},${currentUser.country}`}
              </p>
              <a className="website" target='_blank' href={
                  Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }>
            {
                  Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }
              </a>
            
      </div>
      <div className='right-info'>
      <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
      </div>
    
    </div>
    <p className="about-me">
              {Object.values(currentProfile).length === 0
                ? currentUser.aboutMe
                : currentProfile?.aboutMe}
    </p>
    <p className="skills">
      <span className='skill-label'>Skills</span>:&nbsp;
              {Object.values(currentProfile).length === 0
                ? currentUser.skills
                : currentProfile?.skills}
            </p>
  </div>
  <div className='post-status-main'>
        {allStatus.filter((item)=>{
          return item.userEmail===localStorage.getItem("userEmail")
        }).map((posts)=>{
          return(
            <div key={posts.id}>
            <PostCard posts={posts} />
           </div>
            
          )
        })}

        </div>
    </>
  );
}
