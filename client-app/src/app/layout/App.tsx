import React, { useState, useEffect, SyntheticEvent, useContext } from "react"
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import NavBar from "../../features/nav/NavBar"
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard"
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


  const handleSelectActivity = (id: string) => {
    // filter evering where id =! requested id
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  // take entire activites array and push new activity to it
  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true)
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))

  }

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
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        {/* selectedActivity with ! will define it as IActivity | null when passed to another component object*/}
        <ActivityDashboard
          activities={activityStore.activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
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

