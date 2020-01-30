import React, { ReactElement } from 'react';
import {
  View, StyleSheet, Text, InteractionManager, Dimensions, TouchableOpacity
} from 'react-native'

import { ColorPicker } from 'react-native-color-picker'

import Moment from 'moment';

export interface SettingsProps {

}

export interface SettingsState {
  showColorPicker?: boolean
}

export default class Settings extends React.Component<SettingsProps, SettingsState>{

  constructor(props: SettingsProps) {
    super(props)
    this.state = {
      showColorPicker : false
    }
  }

  showColorPicker(): ReactElement {
    return (<ColorPicker
      color={""}
      defaultColor={""}
      onColorChange={color=> {}}
      onColorSelected={color => {}}
      style={{ flex: 1 }}
    />)
  }

  onShowColorPicker(){
    this.setState({showColorPicker: !(this.state.showColorPicker||false)})
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} >
          <Text style={styles.header_text}>Settings</Text>

        </View>
        <View style={styles.content}>
          {
            this.state.showColorPicker ? this.showColorPicker() : null
          }
          <TouchableOpacity style={styles.button} onPress={() => this.onShowColorPicker()}>
            <Text style={styles.text}>background</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>clock color</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>am/pm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>show seconds</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10
  },

  header: {
    /* position: 'absolute',
    top: 10,
    left: 10 */
  },

  header_text: {
    color: '#1DB954',
    fontSize: 24,
  },

  content: {
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },

  button: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
    minHeight: 50,
    justifyContent: 'center'
  },

  text: {
    color: '#1DB954',
    fontSize: 12,
  }
})