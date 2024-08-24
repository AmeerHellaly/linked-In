
import Connections from "../Pages/Connections"
import Topbar from "../components/common/Topbar"
import { getCurrentUser } from "../api/FirestoreAPIs"
import { useMemo, useState } from "react"
export default function ConnectionLayout() {
  const [currentUser,setCurrentUser]=useState()
  useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])
  return (
    <div>
        <Topbar currentUser={currentUser}/>
        <Connections currentUser={currentUser}/>
        </div>
  )
}
