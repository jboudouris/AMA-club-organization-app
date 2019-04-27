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
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TimePicker from 'react-native-simple-time-picker';
import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/event');
let addItem = (name, date, time, location, description, RSVP, eventKey, key) => {

  firebase.database().ref('event/' + key).update({
    "name": name,
    "date": date,
    "time": time,
    "location": location,
    "description": description,
    "RSVP": RSVP,
    "eventKey": eventKey,
  });
};

export default class AddItem extends Component {
  state = {
    name: '',
    date: '',
    time: '',
    location: '',
    holderLocation: '',
    description: '',
    holderDescription: '',
    picture: '',
    RSVP: "False",
    eventKey: '',
    key: '',
    holderEventKey: '',
    chooseDate: 'Select a date',
    chooseStartTime: 'Start Time',
    chooseEndTime: 'End Time',
    isDateTimePickerVisible: false,
    isStartTimePickerVisible: false,
    isEndTimePickerVisible: false,
  };

  componentDidMount(){
    this.setState({
      name: this.props.navigation.state.params.eventName,
    })
    itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i=0; i< items.length; i++)
    {
      if(items[i].name == this.props.navigation.state.params.eventName)
      {
        var startTime = items[i].time;
        var sliceStart = startTime.slice(0,5);
        var endTime = items[i].time;
        var sliceEnd = endTime.slice(9,14);
        this.setState({
          date: items[i].date,
          time: items[i].time,
          location: items[i].location,
          holderLocation: items[i].location,
          description: items[i].description,
          holderDescription: items[i].description,
          RSVP: items[i].RSVP,
          key: items[i].key,
          holderEventKey: items[i].eventKey,
          chooseDate: items[i].date,
          chooseStartTime: sliceStart,
          chooseEndTime: sliceEnd,
        });

        break;
      }
    }
  });
  }

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
      this.state.RSVP,
      this.state.eventKey,
      this.state.key,
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
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.columnView}>
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
        <ImageBackground
            style = {styles.backgroundImage}
            source = {require('../backgrounds/BG2.png')}
        >
          <ScrollView>
            <View style={styles.main}>
              <View style={styles.buttonView}>
                <Text style={styles.title}>Event</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={this.props.navigation.state.params.eventName}
                    placeholderTextColor='white'
                    onChangeText={(name) => this.setState({name})}
                    underlineColorAndroid='transparent'
                />
              </View>

              <View style={styles.buttonView}>
                <Text style={styles.title}>Date</Text>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={this._showDateTimePicker}>
                    <Text style={styles.textInput1}> {this.state.date} </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                  />
                </View>
              </View>

              <View  style={styles.buttonView}>
                <Text style={styles.title}>Time</Text>
                <View style={{ width: '30%' }}>
                  <TouchableOpacity
                    onPress={this._showStartTimePicker}>
                    <Text style={styles.textInput1}> {this.state.chooseStartTime} </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isStartTimePickerVisible}
                    onConfirm={this._handleStartTimePicked}
                    onCancel={this._hideStartTimePicker}
                    mode='time'
                    datePickerModeAndroid='spinner'
                  />
                </View>

                    <Text style={styles.title1}> to </Text>

                <View style={{ width: '30%' }}>
                  <TouchableOpacity
                    onPress={this._showEndTimePicker}>
                    <Text style={styles.textInput1}> {this.state.chooseEndTime} </Text>
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

              <View style={styles.buttonView}>
                <Text style={styles.title}>Location</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={this.state.holderLocation}
                    placeholderTextColor='white'
                    onChangeText={(location) => this.setState({location})}
                    underlineColorAndroid='transparent'
                />
              </View>

              <View style={styles.buttonView}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={this.state.holderDescription}
                    placeholderTextColor='white'
                    onChangeText={(description) => this.setState({description})}
                    underlineColorAndroid='transparent'
                />
              </View>

              <View style={styles.buttonView}>
                <Text style={styles.title}>Picture</Text>
                <TextInput style={styles.textInput} onChangeText={picture => this.setState({ picture })} />
              </View>

              <View style={styles.buttonView}>
                <Text style={styles.title}>Enable RSVP</Text>
                <View style={styles.textInput}>
                    <Picker
                      selectedValue={this.state.RSVP}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          RSVP: itemValue
                        })
                      }>
                      <Picker.Item label="True" style={styles.title2} value= "True" />
                      <Picker.Item label="False" style={styles.title2} value= "False" />
                    </Picker>
                </View>
              </View>

              <View style={styles.buttonView}>
                <Text style={styles.title}>Key</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={this.state.holderEventKey}
                    placeholderTextColor='white'
                    onChangeText={(eventKey) => this.setState({eventKey})}
                    underlineColorAndroid='transparent'
                />
              </View>

              <TouchableHighlight
                style={styles.button}
                underlayColor="white"
                onPress={this.handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
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
        </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    paddingRight: 5,
    width: '30%'
  },
    title1: {
      fontSize: 18,
      alignSelf: 'center',
      justifyContent: 'center',
      color: 'white',
      paddingRight: 5,
      paddingLeft: 5,
    },
    title2: {
       fontSize: 18,
        color: 'blue',
    },
  textInput: {
    height: 40,
    fontSize: 18,
    width: '70%',
    borderColor: 'white',
    backgroundColor: 'rgba(57,189,225,0.6)',
    borderWidth: 1,
    marginTop: 8,
    color: 'white',
  },
    textInput1: {
      height: 40,
      fontSize: 18,
      width: '100%',
      borderColor: 'white',
      backgroundColor: 'rgba(57,189,225,0.6)',
      borderWidth: 1,
      marginTop: 8,
      color: 'white',
      alignItems: 'center'
    },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',

  },
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    },
  header: {
      height: 70,
      backgroundColor: '#1b2f50',
      flexDirection: 'row',
      alignItems: 'center',
  },
  headerAMA:  {
      backgroundColor: 'transparent',
      alignSelf: 'center',
      alignItems: 'center',
  },
  backgroundImage: {
      flex: 1,
      alignSelf: 'stretch',
  },
  columnView: {
      flex:1,
  },
  buttonView: {
      flexDirection:'row',
      marginTop: 5,
      marginBottom: 5,
  },
  button: {
      backgroundColor: 'rgba(45,78,134,0.7)',
      alignSelf: 'center',
      width: '100%',
      borderWidth: 1,
      marginTop: 5,
      marginBottom: 5,
      borderColor: 'white',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
