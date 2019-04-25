import React, {Component} from 'react';
import {CalendarList} from 'react-native-calendars';
import { ImageBackground, Image, TouchableOpacity, StyleSheet, View, Modal, Text, TouchableHighlight, Button, SafeAreaView} from 'react-native';
import List from './SelectedDayEvent'
import { db } from '../config';
import { Avatar } from 'react-native-elements';
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
      <SafeAreaView style={styles.safeArea}>
      <View>
         <View style  = {styles.header}>
            <View style={{width:'100%'}}>
                <TouchableOpacity style={styles.headerAMA} onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                        source = {require('../icons/AMA_white.png')}
                    />
                </TouchableOpacity>
            </View>
         </View>
             <View style={{height: 30, flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {this.props.navigation.navigate('CreateEvent')
                      }}
                  >
                      <Text style={styles.btntxt}> Add+ </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                  <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {this.props.navigation.navigate('ListEvent')
                      }}
                  >
                      <Text style={styles.btntxt}> List All </Text>
                  </TouchableOpacity>
                </View>
             </View>
             <View>
                <CalendarList
                theme={{
                    backgroundColor: 'blue',
                    calendarBackground: 'rgba(45,78,134,0.3)',
                    textSectionTitleColor: 'white',
                    selectedDayBackgroundColor: 'rgba(45,78,134,0.8)',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: 'white',
                    dayTextColor: 'black',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'white',
//                    textDayFontFamily: 'monospace',
//                    textMonthFontFamily: 'monospace',
//                    textDayHeaderFontFamily: 'monospace',
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 16
                  }}
                  current= {this.state.currentDate}
                  pastScrollRange={24}
                  futureScrollRange={24}
                  horizontal
                  pagingEnabled
                  style={{borderBottomWidth: .8, borderBottomColor: 'black'}}
                  hideDayNames={false}
                  onDayPress={(day) => this.setDate(day)}
                  markedDates={this.state.marked}
                />
                <List eventToday={this.state.date} navigation={this.props.navigation}/>
             </View>
      </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
    btn: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(45,78,134,0.7)',
        borderColor: 'rgba(0,0,0,.8)',
        borderLeftWidth: .4,
        borderRightWidth: .4,
        borderBottomWidth: .8,
    },
    buttonView: {
        flex: 1,
        height: 200,
        flexDirection:'row',
        backgroundColor: 'transparent',
    },
    columnView:  {
        flex:1
    },
    header: {
        height: 70,
        backgroundColor: '#1b2f50',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btntxt:  {
        paddingTop: 5,
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    headerAMA:  {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(45,78,134,0.3)',
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
});
