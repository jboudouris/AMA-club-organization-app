import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TimePicker from 'react-native-simple-time-picker';
import { db } from '../config';

let addItem = (name, date, time, location, description, picture, RSVP, eventKey) => {
let valuekey = db.ref('/event').push().key;

  db.ref('/event/' + valuekey).update({
    name: name,
    date: date,
    time: time,
    location: location,
    description: description,
    picture: picture,
    RSVP: RSVP,
    eventKey: eventKey,
    key: valuekey,

  });
};

export default class AddItem extends Component {
  state = {
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    picture: '',
    RSVP: "False",
    eventKey: '',
    key: '',
    chooseDate: 'Choose a date',
    chooseStartTime: 'Start Time',
    chooseEndTime: 'End Time',
    isDateTimePickerVisible: false,
    isStartTimePickerVisible: false,
    isEndTimePickerVisible: false,
  };

  handleSubmit = () => {
    let time;
    if ( (this.state.chooseStartTime == 'Start Time') && (this.state.chooseEndTime == 'End Time')){

    }
    else {
      time = this.state.chooseStartTime + ' to ' + this.state.chooseEndTime;
    }

    addItem(
      this.state.name,
      this.state.date,
      time,
      this.state.location,
      this.state.description,
      this.state.picture,
      this.state.RSVP,
      this.state.eventKey,
    );
    alert('Success');
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
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
       date: eventDate,
       chooseDate: eventDate
     });
    this._hideDateTimePicker();
  };

  _showStartTimePicker = () => this.setState({ isStartTimePickerVisible: true });

  _hideStartTimePicker = () => this.setState({ isStartTimePickerVisible: false });

  _handleStartTimePicked = (date) => {
    console.log('A date has been picked: ', date);
    //alert(date.getHours() + ' ' + date.getMinutes());
    let startTime = date.getHours() + ':' + date.getMinutes()
    this.setState({
      chooseStartTime: startTime
    });
    this._hideStartTimePicker();
  };

  //End Time Modal
  _showEndTimePicker = () => this.setState({ isEndTimePickerVisible: true });

  _hideEndTimePicker = () => this.setState({ isEndTimePickerVisible: false });

  _handleEndTimePicked = (date) => {
    console.log('A date has been picked: ', date);
    //alert(date.getHours() + ' ' + date.getMinutes());
    let endTime = date.getHours() + ':' + date.getMinutes()
    this.setState({
      chooseEndTime: endTime
    });
    this._hideEndTimePicker();
  };
  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <ScrollView>
        <View style={styles.main}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>Event Name</Text>
            <TextInput style={styles.itemInput} onChangeText={name => this.setState({ name })} />
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>Date</Text>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this._showDateTimePicker}>
                <Text style={styles.title}> {this.state.chooseDate} </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </View>
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>Time</Text>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this._showStartTimePicker}>
                <Text style={styles.title}> {this.state.chooseStartTime} </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isStartTimePickerVisible}
                onConfirm={this._handleStartTimePicked}
                onCancel={this._hideStartTimePicker}
                mode='time'
                datePickerModeAndroid='spinner'
              />
            </View>

                <Text style={styles.title}> to </Text>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this._showEndTimePicker}>
                <Text style={styles.title}> {this.state.chooseEndTime} </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isEndTimePickerVisible}
                onConfirm={this._handleEndTimePicked}
                onCancel={this._hideEndTimePicker}
                mode='time'
                datePickerModeAndroid='spinner'
              />
            </View>
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>Location</Text>
            <TextInput style={styles.itemInput} onChangeText={location => this.setState({ location })} />
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>Description</Text>
            <TextInput style={styles.itemInput} onChangeText={description => this.setState({ description })} />
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>Picture</Text>
            <TextInput style={styles.itemInput} onChangeText={picture => this.setState({ picture })} />
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>Enable RSVP</Text>
            <Picker
              selectedValue={this.state.RSVP}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  RSVP: itemValue
                })
              }>
              <Picker.Item label="True" value= "True" />
              <Picker.Item label="False" value= "False" />
            </Picker>
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.title}>SignIn Key</Text>
            <TextInput style={styles.itemInput} onChangeText={eventKey => this.setState({ eventKey })} />
          </View>

          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>



        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    alignSelf: 'center',
    paddingRight: 5,
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginBottom: 10,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#3b5998',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
