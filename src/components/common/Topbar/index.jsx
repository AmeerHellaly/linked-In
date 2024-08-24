/* eslint-disable react/prop-types */


import './index.scss'
import { useEffect, useState } from 'react';
import LinkedinLogo from '../../../assets/linkedinLogo.png'
import { AiOutlineHome,AiOutlineUserSwitch,AiOutlineSearch,AiOutlineMessage,AiOutlineBell  } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../../api/FirestoreAPIs';
import ProfilePopup from "../ProfilePopup";
import SearchUsers from '../SerachUsers';
export default function Topbar({currentUser}) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch,setIsSearch]=useState(false)
  const [users,setUsers]=useState([])
  const [filterdUser,setFilterdUser]=useState([])
  const [searchInput,setSearchInput]=useState('')
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  const openUser=(user)=>{
    navigate('/profile-user',{state:{
      id:user.id,
      email:user.email
    }})

  }
  const handleSearch=()=>{

    if(searchInput!==""){
      let searched=users.filter((user)=>{
        return Object.values(user).join("").toLowerCase().includes(searchInput.toLowerCase())
      });
      setFilterdUser(searched)
      console.log(searched)
    }
    else{
      setFilterdUser(users)
    }
  }

  useEffect(()=>{
    let debounced=setTimeout(()=>{
      handleSearch()
    },1000)
    return ()=> clearTimeout(debounced)
  },[searchInput])
  let navigate=useNavigate()
  const goToRoute=(route)=>{
    navigate(route)
  }
  useEffect(()=>{
    getAllUsers(setUsers)
  },[])
  return (
    <div className='topbar-main'>
        {popupVisible ? (
        <div className="popup-postion">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
        <img className='linkedin-logo' src={LinkedinLogo} alt="LinkedinLogo" />
       {isSearch?<SearchUsers setIsSearch={setIsSearch} setSearchInput={setSearchInput}/>:
         <div className='react-icons'>
         <AiOutlineSearch size={30} className='react-icon' onClick={()=>setIsSearch(true)}/>
         <AiOutlineHome size={30} className='react-icon' onClick={()=>goToRoute('/home')} />
         <AiOutlineUserSwitch size={30} className='react-icon'  onClick={()=>goToRoute('/connections')} />
         <BsBriefcase size={30} className='react-icon'/>
         <AiOutlineMessage size={30} className='react-icon'/>
         <AiOutlineBell size={30} className='react-icon'/>
        
         </div>}
      
        <img onClick={displayPopup} src={currentUser?.imageLink} width={'40px'} alt=''className='user-logo' />
        {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filterdUser.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filterdUser.map((user) => (
              <>
              <div className="search-inner" onClick={() => {openUser(user)}}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
              </>
            ))
          )}
        </div>
      )}
    </div>
  )
}
