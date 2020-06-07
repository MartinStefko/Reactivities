import React, { useEffect, useContext } from "react"
import { Container } from 'semantic-ui-react'
import NavBar from "../../features/nav/NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard"
import LoadingComponent from "./LoadingComponent"
import ActivityStore from '../stores/activityStore'
import { observer } from 'mobx-react-lite'



const App = () => {

  const activityStore = useContext(ActivityStore)



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
        />
      </Container>
    </>
  );


};



// make the App observer of activityStore -> or more generally Stores
export default observer(App)

