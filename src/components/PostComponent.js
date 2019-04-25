import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
let itemsRef = db.ref('/post');
export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
convertTime = (date) => {
    let time = date[5]+date[6]+date[7]+date[8]+date[9]+date[4]+date[0]+date[1]+date[2]+date[3];
    return time;
}
  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      //}
    });
  }
  render() {
    return (
      <View>
        {this.props.items.map((item, index) => {

          return (
            <View style={styles.container} key={index}>
              <View>
                  <Text style={styles.itemtext1}>{item.full_Name}</Text>
                  <Text style={styles.itemtext2}>{item.date}</Text>
              </View>
              <Text style={styles.itemtext3}>{item.description}</Text>
            </View>
          );


        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: 'rgba(45,78,134,0.8)',
        borderColor: 'rgba(0,0,0,.4)',
        borderWidth: 1,
        borderRadius: 8,
    },
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    itemtext1: {
        paddingTop: 5,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 24,
        color: 'white',
    },
    itemtext2: {
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 14,
        color: 'white',
    },
    itemtext3: {
        padding: 5,
        fontSize: 20,
        color: 'white',
    }
});
