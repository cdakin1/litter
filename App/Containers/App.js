// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import '../I18n/I18n' // keep before root container
import * as firebase from "firebase"
import RootContainer from './RootContainer'
import createStore from '../Redux'
import applyConfigSettings from '../Config'

// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()

const firebaseConfig = {
  apiKey: "AIzaSyB0paPSQ7VIMcCdLDUTDaMRXRRNQ-pwGUU",
  authDomain: "legacy-170ea.firebaseapp.com",
  databaseURL: "https://legacy-170ea.firebaseio.com",
  storageBucket: "legacy-170ea.appspot.com",
  messagingSenderId: "397997657",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

var database = firebase.database();

function addLitter(litterId, text, longitude, latitude) {
  firebase.database().ref('litter/' + litterId).push({
    text: this.inputText,
    longitude: location.longitude,
    latitude : location.latitude
  });
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
