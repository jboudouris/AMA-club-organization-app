import React, {Component} from 'react';

import {CalendarList} from 'react-native-calendars';
import {View, Modal, Text, TouchableHighlight, Button} from 'react-native';
import List from './ListEvent'
import { db } from '../config';


let itemsRef = db.ref('/event');

//Array of date
let nextDay = [];
//Load the date
  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i=0; i< items.length; i++)
    {
      nextDay.push(items[i].date);
    }
  })
export default class HorizontalCalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marked: null,
      email: '',
      first_Name: '',
      last_Name: '',
      role: '',
      currentUserUid: '',
      full_Name: '',
      attendantNum: '',
    };
  }

//Call mark function
  componentDidMount() {
    this.setState({
      email: this.props.navigation.state.params.email,
      first_Name: this.props.navigation.state.params.first_Name,
      last_Name: this.props.navigation.state.params.last_Name,
      role: this.props.navigation.state.params.role,
      currentUserUid: this.props.navigation.state.params.currentUserUid,
      full_Name: this.props.navigation.state.params.full_Name,
      attendantNum: this.props.navigation.state.params.attendantNum,
    });
/*
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      //this.setState({ items });
    //for (let i=0; i< nextDay.length; i++)
  //  {
      nextDay.push(items[9].date);


  //  }
  })
  */
    this.anotherFunc();
    }

//take NextDay array and mark it on calendar
    anotherFunc = () => {
    var obj = nextDay.reduce((c, v) => Object.assign(c, {[v]: {selected: true}}), {});
    this.setState({ marked : obj});
}
  render() {
    return (
      <View>
        <CalendarList
          current={'2019-03-16'}
          pastScrollRange={24}
          futureScrollRange={24}
          horizontal
          pagingEnabled
          style={{borderBottomWidth: 1, borderBottomColor: 'black'}}
          hideArrows={false}
          hideDayNames={true}
          renderArrow={(direction) => (<Arrow />)}
          onDayPress={(day) => { this.props.navigation.navigate('EventDetail',{
                  date: day.dateString,
                  email: this.props.navigation.state.params.email,
                  first_Name: this.props.navigation.state.params.first_Name,
                  last_Name: this.props.navigation.state.params.last_Name,
                  role: this.props.navigation.state.params.role,
                  currentUserUid: this.props.navigation.state.params.currentUserUid,
                  full_Name:this.props.navigation.state.params.full_Name,
                  attendantNum: this.props.navigation.state.params.attendantNum,
                });  }}

          markedDates={this.state.marked}
        />
        <List>
        </List>
      </View>
    );
  }
}
