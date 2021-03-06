import React, { Component } from 'react';
import { View, ScrollView, ListView, TouchableOpacity, Text } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import BottomNav from './BottomNav';
import firebase from 'firebase';
import styles from './Styles/ListviewExampleStyle'

class Collection extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ref: firebase.database().ref(`collections/${firebase.auth().currentUser.displayName}`),
      dataSource: ds.cloneWithRows([{ text: 'text', date: 'date' }])
    };
  }
  componentDidMount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state.ref.on('value', snapshot => {
      const snap = snapshot.val();
      const litter = [];
      for(let aKey in snap) {
        snap[aKey].key = aKey;
        litter.push(snap[aKey])
      }
      this.state.dataSource = ds.cloneWithRows(litter);
      this.forceUpdate();
    })
  }
  componentWillUnmount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state.datasource = ds.cloneWithRows([{text: 'test', date: 'date'}]);
    this.state.ref = firebase.database().ref(`collections/${firebase.auth().currentUser.displayName}`);
  }

  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{rowData.date} || {rowData.text}</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        <BottomNav />
      </View>
    );
  }
  // constructor() {
  //   super()
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state = {
  //     collection: ds.cloneWithRows([{text: 'test', date: 'date'}]),
  //   }
  //   this.renderRows = this.renderRows.bind(this);
  // }

  // renderRows(rowData) {
  //   return (
  //     <Text>{rowData.text} || {rowData.date}</Text>
  //   )
  // }
  // render() {
  //
  //   return (
  //     <View>
  //       <ListView
  //         datasource={this.state.collection}
  //         renderRow={this.renderRows} />
  //     </View>
  //   )
  // }
}

export default Collection;
