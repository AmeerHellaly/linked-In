/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {firestore} from '../firebaseConfig'
import { getAllUsers } from '../api/FirestoreAPIs'
import {collection,getDocs,deleteDoc,doc} from 'firebase/firestore'
const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
      getAllUsers(setUsers)
    },[])
  
    const handleDeleteUser = async (userId) => {
      await deleteDoc(doc(firestore, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
    };
  return (
    <div>
    <h1>Admin Panel</h1>
    <h2>Users</h2>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <img src={user.profilePicture} alt={user.name} style={{ width: '50px', height: '50px' }} />
          {user.name}
          <button onClick={() => handleDeleteUser(user.userID)}>Delete User</button>
          <h3>Posts:</h3>
          <ul>
            {posts.filter(post => post.userID === user.userID).map(post => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Dashboard