import React, {Component} from 'react';
import {CalendarList} from 'react-native-calendars';
import {View, Modal, Text, TouchableHighlight, Button} from 'react-native';
import List from './SelectedDayEvent'
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
      date: '',
      currentDate: '',
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
    this.getCurrentDate();
    this.anotherFunc();
    }

//take NextDay array and mark it on calendar
    anotherFunc = () => {
    var obj = nextDay.reduce((c, v) => Object.assign(c, {[v]: {selected: true}}), {});
    this.setState({ marked : obj});
}

    setDate = (day) => {
      let days = day.dateString
      this.setState({
        date: days
      });
    }

    getCurrentDate = () => {
      let date = new Date();
      let day;
      let month;
      //Get the day into correct format 01-09
      if (date.getDate() < 10){
        day = '0' + date.getDate();
      }
      else {
        day = date.getDate();
      }

      // date.getMonth return 0-11
      if ((date.getMonth() + 1) < 10){
        month = '0' + (date.getMonth() + 1);
      }
      else {
        month = date.getMonth() + 1;
      }

      let year = date.getFullYear();
      //date format YYYY-MM-DD
      let eventDate = year+'-'+month+'-'+day;
       this.setState({
         currentDate: eventDate
       });
    }
  render() {
    return (
      <View>
        <CalendarList
          current= {this.state.currentDate}
          pastScrollRange={24}
          futureScrollRange={24}
          horizontal
          pagingEnabled
          style={{borderBottomWidth: 1, borderBottomColor: 'black'}}
          hideDayNames={false}
          onDayPress={(day) => this.setDate(day)}
          markedDates={this.state.marked}
        />
        <List eventToday={this.state.date} navigation={this.props.navigation}/>
      </View>
    );
  }
}
