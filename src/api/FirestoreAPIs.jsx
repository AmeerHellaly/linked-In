/* eslint-disable no-unused-vars */
import { firestore } from "../firebaseConfig"
import { addDoc,collection,onSnapshot,doc,updateDoc,where, query, setDoc, deleteDoc } from "firebase/firestore"
import { useState } from "react"
import { toast } from "react-toastify"
let dbRef=collection(firestore,"posts")
let userRef=collection(firestore,"users")
let likeRef=collection(firestore,"likes")
let commentsRef=collection(firestore,"comments")
let connectionRef=collection(firestore,"connections")
export const postStatus=(object)=>{
   
    addDoc(dbRef,object)
    .then(()=>{
        toast.success('Posts has been added succesfully')
    })
    .catch((err)=>{
        console.log(err)
    })
}   


export const getAllUsers=(setAllUsers)=>{
    onSnapshot(userRef,(response)=>{
        setAllUsers(response.docs.map((docs)=>{
             return {...docs.data(),id:docs.id}
         }))
     })
}
export const getStatus=(setAllStatus)=>{
onSnapshot(dbRef,(response)=>{
   setAllStatus(response.docs.map((docs)=>{
        return {...docs.data(),id:docs.id}
    }))
})
}
export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(dbRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
      setAllStatus(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  };
  
export const getSingleUser=(setCurrentUser,email)=>{
    const singleUserQuery=query(userRef,where("email","==",email))
    onSnapshot(singleUserQuery,(response)=>{
        setCurrentUser(
            response.docs.map((docs)=>{
                return {...docs.data(),id:docs.id}
            })[0]
        )
    })
}
export const postUserData=(object)=>{
    addDoc(userRef,object).then(()=>{})
    .catch((err)=>{console.log(err)})
}

export const getCurrentUser=(setCurrentUser)=>{
    let currEmail=localStorage.getItem("userEmail")
    onSnapshot(userRef,(response)=>{
        setCurrentUser(response.docs.map((docs)=>{
             return {...docs.data(),userID:docs.id}
         }).filter((item)=>{
            return item.email===localStorage.getItem("userEmail")
         })[0]
        )
     })
}
export const editProtfile=(userID,payload)=>{
    let userToEdit=doc(userRef,userID)
    updateDoc(userToEdit,payload)
    .then(()=>{
        toast.success('Profile has been added succesfully')
    })
    .catch((err)=>{
        console.log(err)
    })

}

export const likePost=(userId,postId,liked)=>{
    try{

        let docToLike=doc(likeRef,`${userId}_${postId}`)
        if(liked){
                deleteDoc(docToLike)
        }else{

            setDoc(docToLike,{userId,postId})
        }
    }
    catch(err){
        console.log(err)
    }
}
export const getLikeByUser=(userId,postId,setLiked,setLikesCount)=>{
    try{
        let likeQuery=query(likeRef,where('postId','==',postId));
        onSnapshot(likeQuery,(response)=>{
            let likes=response.docs.map((doc)=>doc.data())
            let likesCount=likes?.length;

            const isLiked=likes.some((like)=>like.userId===userId);
            setLikesCount(likesCount)
            setLiked(isLiked)

        })
    }catch(err){
        console.log(err)
    }
}

export const postComment=(postId,comment,timeStamp,name)=>{
    try{
        addDoc(commentsRef,{
            postId,
            comment,
            timeStamp,
            name
        })
    }
    catch(err){
        console.log(err)

    }
}
export const getComments=(postId,setComments)=>{    
    try{
       let singlePostQuery=query(commentsRef,where('postId','==',postId))
       onSnapshot(singlePostQuery,(response)=>{
        const comments=response.docs.map((doc)=>{
            return{
                id:doc.id,
                ...doc.data(),
            }
        })
       setComments(comments)
       })
    }
    catch(err){
        console.log(err)
    }
}

export const updatePost=(id,status,postImage)=>{
    let docToUpdate=doc(dbRef,id)
    try{

        updateDoc(docToUpdate,{status,postImage})
        toast.success('Post has been Updated!')
    }
    catch(err){
        console.log(err)
    }
}
export const deletePost=(id)=>{
    let docToDelete=doc(dbRef,id)
    try{
        deleteDoc(docToDelete)
        toast.success('Post has been Deleted!')
    }catch(err){
        console.log(err)
    }
}

export const addConnection=(userId,targetId)=>{
    try{

        let docToConnection=doc(connectionRef,`${userId}_${targetId}`)
        setDoc(docToConnection,{userId,targetId})
        toast.success('Connection Added')
    }
    catch(err){
        console.log(err)
    }
}

export const getConnection=(userId,targetId,setIsConnected)=>{
    try{
        let connectionQuery=query(connectionRef,where('targetId','==',targetId));
        onSnapshot(connectionQuery,(response)=>{
            let connections=response.docs.map((doc)=>doc.data())
            const isConnected=connections.some((connection)=>connection.userId===userId);
            setIsConnected(isConnected)
        })
    }catch(err){
        console.log(err)
    }
}
