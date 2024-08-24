/* eslint-disable react/prop-types */
// import React from 'react'
import '../Sass/HomeComponent.scss'
import PostStatus from './common/PostUpdate'
export default function HomeComponent({currentUser}) {
  return (
    <div>
      <PostStatus currentUser={currentUser}/>
    </div>
  )
}
