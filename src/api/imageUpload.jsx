import { storage } from "../firebaseConfig";
import {ref,getDownloadURL,uploadBytesResumable} from 'firebase/storage'
import { editProtfile } from "./FirestoreAPIs";

export const uploadImage=(file,id,setModalOpen,setProgress,setCurrentImage)=>{

    const profilePicsRef=ref(storage,`profileImages/${file.name}`)
    const uploadTask=uploadBytesResumable(profilePicsRef,file)

    uploadTask.on('stata_changed',(snapshot)=>{
        const progress=Math.round(
          (  snapshot.bytesTransferred/ snapshot.totalBytes)*100
        )
        setProgress(progress)
    },(error)=>{
        console.error(error)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((response)=>{
            editProtfile(id,{imageLink:response})
            setModalOpen(false)
            setCurrentImage({})
            setProgress(0)
        })
    })

}


export const uploadPostImage=(file,setPostImage,setProgress)=>{

    const postPicsRef=ref(storage,`postImages/${file.name}`)
    const uploadTask=uploadBytesResumable(postPicsRef,file)

    uploadTask.on('stata_changed',(snapshot)=>{
        const progress=Math.round(
          (  snapshot.bytesTransferred/ snapshot.totalBytes)*100
        )
        setProgress(progress)
    },(error)=>{
        console.error(error)
    },()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((response)=>{
            setPostImage(response)
        })
    })

}