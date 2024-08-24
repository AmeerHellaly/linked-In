/* eslint-disable no-unused-vars */
import React from 'react';
import { Flex, Spin } from 'antd';
import './common.scss'
export default function Loader() {
  return (
    <div className='loader'> 
    <p>Loading..Please Wait..</p>
        <Flex gap='middle'>

         <Spin size="large" />
        </Flex>
    </div>
  )
}
