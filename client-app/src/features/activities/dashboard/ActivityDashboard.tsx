import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../ActivityDetails.tsx/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface IProps {
    activities: IActivity[]
    selectActivity: (id: string) => void
    selectedActivity: IActivity | null
}

export const ActivityDashboard: React.FC<IProps> = ({ activities, selectActivity, selectedActivity }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width={6}>
                {/* only showing Activity details if there is one selected */}
                {selectedActivity && <ActivityDetails activity={selectedActivity} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}


