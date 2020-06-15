import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { ActivityDetailedChat } from "./ActivityDetailedChat";

// if we want to pass variable e.g. id to the route Link, in TS we must specify the interface and <RouteComponentProps<DetailParams>>
interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    //   accecig the match object from react-router-dom where activity id is located
    loadActivity(match.params.id).catch(() => {
      history.push("/notfound");
    });
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity..." />;
  }

  if (!activity) return <h2>Activity not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
