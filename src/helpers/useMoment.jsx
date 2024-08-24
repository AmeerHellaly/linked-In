/* eslint-disable no-unused-vars */
import React from 'react'
import moment from 'moment/moment'
export default function getCurrentTimeStamp(timeFormat) {
   return moment().format(timeFormat);
  
}
