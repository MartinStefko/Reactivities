import React, { Component } from "react";
import axios from "axios";
import { Header, Icon, List } from 'semantic-ui-react'
import { IActivity } from '../models/activity'

interface IState {
  activities: IActivity[]
}

class App extends Component<{}, IState> {
  // readoonly is not necesary, as all typescript but it forces you to to use setState() method instead of accessing this.state directly which is insecure
  readonly state: IState = {
    activities: [],

  }

  componentDidMount() {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        this.setState({
          activities: response.data
        })
      })
  }


  render() {
    return (
      <div >
        <Header as='h2'>
          <Icon name='users' />
        </Header>
        <List>
          {/* any can lead to errors, which will be not catched by typescript compiler, so it is best practice not to use it */}
          {/* i can remove now activity: any and just let it be activity,typescript will recognise activity is type of IActivity */}
          {/* fun if there was no typescript, acivity.name compiled just right, but in fact it is not exisitng in the state or IState */}

          {this.state.activities.map((activity) => (
            <List.Item key={activity.id} >{activity.title}</List.Item>
          ))}
        </List>

      </div>
    );
  }

};




export default App

