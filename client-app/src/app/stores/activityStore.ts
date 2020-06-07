import { observable, action, computed } from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import { IActivity } from '../models/activity'
import agent from '../layout/api/agent'

class ActivityStore {
    // using mobX observable Map()
    @observable activityRegistry = new Map()
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | undefined
    @observable loadingInitial = false
    @observable editMode = false
    @observable submitting = false
    @observable target = ''

    // great candidate for date based sorting (ascending)
    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }


    // withi async you are implcitly returning a promise of type promise, so TypeScript will not complain
    @action loadActivities = async () => {
        // mutating the state is required in mobx
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list()
            activities.forEach(activity => {
                activity.date = activity.date.split('.')[0]
                // we now have mapped acctivities by id
                this.activityRegistry.set(activity.id, activity)
            })
            this.loadingInitial = false
        } catch (error) {
            console.log(error)
            this.loadingInitial = false
        }
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.create(activity)
            this.activityRegistry.set(activity.id, activity)
            this.activities.push(activity)
            this.editMode = false
            this.submitting = false
        } catch (error) {
            this.submitting = false
            console.log(error)
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true
        this.target = event.currentTarget.name
        try {
            await agent.Activities.delete(id)
            this.activityRegistry.delete(id)
            this.submitting = false
            this.target = ''
        } catch (error) {
            this.submitting = false
            this.target = ''
            console.log(error)
        }
    }

    @action openCreateForm = () => {
        this.editMode = true
        this.selectedActivity = undefined
    }

    @action selectActivity = (id: string) => {
        // replacing .find() with .get(id)
        // this.selectedActivity = this.activities.find(a => a.id === id)
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = false
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = true
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    @action cancelFormOpen = () => {
        this.editMode = false
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.update(activity)
            this.activityRegistry.set(activity.id, activity)
            this.selectedActivity = activity
            this.editMode = false
            this.submitting = false
        } catch (error) {
            this.submitting = false
            console.log(error)
        }
    }



}

export default createContext(new ActivityStore())