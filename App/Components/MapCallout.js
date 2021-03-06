import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import Styles from './Styles/MapCalloutStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'


// Example
ExamplesRegistry.add('Map Callout', () =>
  <MapCallout
    location={{
      title: 'Callout Example'
    }}
    onPress={() => window.alert('That tickles!')}
  />
)

type MapCalloutProps = {
  location: Object,
  onPress: () => void
}

export default class MapCallout extends React.Component {
  props: MapCalloutProps

  constructor (props: MapCalloutProps) {
    super(props)
    this.onPress = this.props.onPress.bind(null, this, this.props.location)
  }

  render () {
    /* ***********************************************************
    * Customize the appearance of the callout that opens when the user interacts with a marker.
    * Note: if you don't want your callout surrounded by the default tooltip, pass `tooltip={true}` to `MapView.Callout`
    *************************************************************/
    const { location } = this.props
    if(location.isImage) {
      const img = `data:image/png;base64,${location.text}`
      return (
          <MapView.Callout style={Styles.callout}>
            <TouchableOpacity onPress={this.onPress}>
              <Image style={{width: 200, height: 320}} source={{uri: img}} />
            </TouchableOpacity>
          </MapView.Callout>
      )
    } else {
      return (
        <MapView.Callout style={Styles.callout}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{location.text}</Text>
          </TouchableOpacity>
        </MapView.Callout>
      )
    }
  }
}
