import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import NavBar from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";



const App = () => {

  // activities is the state and setActivities is setting activities state
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)


  const handleSelectActivity = (id: string) => {
    // filter evering where id =! requested id
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

  // useEffect is 3 lifecycle hooks in one
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data)
      })
    // the empty parethesis at the end menas useEffect will run only once
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        {/* selectedActivity with ! will define it as IActivity | null when passed to another component object*/}
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity} />
      </Container>
    </>
  );


};




export default App

