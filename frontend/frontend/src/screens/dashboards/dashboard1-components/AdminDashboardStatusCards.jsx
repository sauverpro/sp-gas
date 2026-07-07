import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, Box } from "@material-ui/core";
import staMaDashboard from "../dashboard1-components/AdminDashboardStatusCards.module.css"
import { GiCancel } from "react-icons/gi";
import { MdDownloading } from "react-icons/md";
import { MdNewReleases } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';

function AdminDashboardStatusCards() {
  return (
    <div className={staMaDashboard.container}>
    <Card className={staMaDashboard.cardContainer}>
      <div className={staMaDashboard.contDiv}>
          <h1 className={staMaDashboard.headTitle1}>New Order</h1>
          <MdNewReleases className={staMaDashboard.conStatus1}/>
        <p>56</p>
        <span className={staMaDashboard.newOrderSpan}>new</span>
      </div>
    </Card >
    <Card className={staMaDashboard.cardContainer}>
      <div className={staMaDashboard.contDiv}>
        <h1 className={staMaDashboard.headTitle2}>In Progress</h1>
        <MdDownloading className={staMaDashboard.conStatus2}/>
        <p>21</p> 
      </div>
    </Card>
    <Card className={staMaDashboard.cardContainer}>
      <div className={staMaDashboard.contDiv}>
        <h1 className={staMaDashboard.headTitle3}>completed</h1>
        <FaCheckCircle className={staMaDashboard.conStatus3}/>
        <p>74</p>
      </div>
    </Card>
    <Card className={staMaDashboard.cardContainer}>
        <div className={staMaDashboard.contDiv}>
          <h1 className={staMaDashboard.headTitle4}>Canceled</h1>
          <GiCancel className={staMaDashboard.conStatus4}/>
          <p>8</p>
        </div>
    </Card> 
  </div>
  )
}

export default AdminDashboardStatusCards
