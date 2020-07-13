import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";

import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial } = rootStore.activityStore;

  // useEffect is 3 lifecycle hooks in one
  useEffect(() => {
    loadActivities();
    // to make useEffect to know about activityStore it has to be passed into seond argument (as bellow)
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        {/* (loadingInitial? <ActivityListItemPlaceholder />
        :) */}
        <ActivityList />
      </Grid.Column>
      <h2>Activity filters</h2>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
