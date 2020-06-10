import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";

import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  // useEffect is 3 lifecycle hooks in one
  useEffect(() => {
    activityStore.loadActivities();
    // to make useEffect to know about activityStore it has to be passed into seond argument (as bellow)
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <h2>Activity filters</h2>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
