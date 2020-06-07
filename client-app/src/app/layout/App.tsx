import React, { useState, useEffect, SyntheticEvent, useContext } from "react"
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import NavBar from "../../features/nav/NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import agent from "./api/agent"
import LoadingComponent from "./LoadingComponent"
import ActivityStore from '../stores/activityStore'
import { observer } from 'mobx-react-lite'



const App = () => {

  const activityStore = useContext(ActivityStore)
  // activities is the state and setActivities is setting activities state
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [target, setTarget] = useState('')





  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true)
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))

  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false))

  }

  // useEffect is 3 lifecycle hooks in one
  useEffect(() => {
    activityStore.loadActivities()
    // to make useEffect to know about activityStore it has to be passed into seond argument (as bellow)
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />


  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        {/* selectedActivity with ! will define it as IActivity | null when passed to another component object*/}
        <ActivityDashboard
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}

        />
      </Container>
    </>
  );


};



// make the App observer of activityStore -> or more generally Stores
export default observer(App)

