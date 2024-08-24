/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import './index.scss'
import getCurrentTimeStamp from '../../../helpers/useMoment'
import { AiOutlineHeart,AiFillHeart,AiOutlineComment } from 'react-icons/ai'
import {BsFillHandThumbsUpFill,BsHandThumbsUp} from 'react-icons/bs'
import { getLikeByUser, likePost,postComment,getComments } from '../../../api/FirestoreAPIs'
export default function LikeButton({userId,postId,currentUser}) {
    const [likesCount,setLikesCount]=useState(0)
    const [showCommentBox,setShowCommentBox]=useState(false)
    const [liked,setLiked]=useState(false)
    const [comment,setComment]=useState('')
    const [comments,setComments]=useState([])
    const handleLike=()=>{
        likePost(userId,postId,liked)
    }
    const getComment=(event)=>{
      setComment(event.target.value)
    }
    const addComment=()=>{
      postComment(postId,comment,getCurrentTimeStamp('LLL'),currentUser?.name)
    
        setComment('')
      
    }
    useMemo(()=>{
        getLikeByUser(userId,postId,setLiked,setLikesCount)
        getComments(postId,setComments)
    },[userId,postId])
  return (
    <div className='like-container'>
       <p> {likesCount} People Like this Posts</p>
       <div className='hr-line'>
       <hr />
       </div>
       <div className='like-comment'>
       <div className='likes-comment-inner'  onClick={handleLike}>
       {liked? <BsFillHandThumbsUpFill size={30} color='#0a66c2'/>:<BsHandThumbsUp size={30}/>}
        
        <p className={liked?'blue':'black'}>Like</p>
        </div>
        <div className='likes-comment-inner' onClick={()=>setShowCommentBox(!showCommentBox)}>
       {<AiOutlineComment size={30} color={showCommentBox?"#0a66c2":"#212121"}/>}
        
        <p className={showCommentBox?'blue':'black'}>Comment</p>
        </div>
        </div>
       {showCommentBox?(
         <>
        <input onChange={getComment} type="text" placeholder='Add a Coment' name='comment' value={comment} className='comment-input' />
        <button className='add-comment-btn' onClick={addComment}>Add Comment</button>
        {comments.length>0?comments.map((comment)=>{
          return(
            <>
            <div className='all-comments'>
              
              <p className='name'>{comment.name}</p>
              <p className='comment'>{comment.comment}</p>
             <p className='time-stamp'>{comment.timeStamp}</p>
             {/* <p>•</p> */}
            </div>
            </>
              
          )
        }):<></>}
        </>
       ):(
       <>
       </>  
      )}
      
    </div>
  )
}
