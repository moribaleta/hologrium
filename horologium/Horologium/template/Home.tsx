import React, { ReactElement } from 'react';
import {
  View, StyleSheet, Text, InteractionManager, Dimensions
} from 'react-native'


import Moment from 'moment';

export interface HomeProps {

}

export interface HomeState {
  time: Time,
  date: string,
  orientation: 'portrait' | 'landscape'
}

interface Time {
  hour: Number,
  minutes: Number,
  seconds: Number,
}

export default class Home extends React.Component<HomeProps, HomeState>{

  constructor(props: HomeProps) {
    super(props)
    this.state = {
      time: this.getTime(),
      date: this.getDate(),
      orientation: Dimensions.get('window').width < Dimensions.get('window').height ? 'portrait' : 'portrait'
    }
  }

  getOrientation = () =>{
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({ orientation: 'portrait' });
    } else {
      this.setState({ orientation: 'landscape' });
    }
  }

  getDate(separator = ""): string {
    Moment.locale('en');
    let newDate = new Date()
    return Moment(newDate).format('MMMM DD YYYY')
  }

  interval: any


  getTime(): Time {
    return {
      hour: new Date().getHours(),         // Get the hour (0-23)
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    }
  }

  onSetValue() {
    this.setState({
      time: this.getTime(),
      date: this.getDate()
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.onSetValue()
    }, 1000)

    this.getOrientation();

    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    Dimensions.removeEventListener('change', this.getOrientation)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>

          <Text style={styles.date}>{this.state.date}</Text>
        </View>
        {
          this.renderBody()
        }
      </View>
    )
  }

  renderBody(): ReactElement {
    if (this.state.orientation == 'landscape') {
      return (
        <View style={styles.landscape_body}>
          <Text style={styles.time}>{this.formatValue(this.state.time.hour)}</Text>
          <Text style={styles.time}>:</Text>
          <Text style={styles.time}>{this.formatValue(this.state.time.minutes)}</Text>
          <Text style={styles.time}>:</Text>
          <Text style={styles.time}>{this.formatValue(this.state.time.seconds)}</Text>
        </View>
      )
    }
    return (
      <View style={styles.vertical_body}>
        <Text style={styles.time}>{this.formatValue(this.state.time.hour)}</Text>
        <Text style={styles.time}>{this.formatValue(this.state.time.minutes)}</Text>
        <Text style={styles.time}>{this.formatValue(this.state.time.seconds)}</Text>
      </View>
    )
  }

  formatValue(value: Number) : String {
    if (value.toString().length < 2) {
      return ("0" + value).slice(-2)
    }

    return value.toString()
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  landscape_body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },

  vertical_body: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
  },

  date: {
    fontSize: 24,
    fontWeight: "500",
    margin: 10,
    color: '#1DB954'
  },

  time: {
    fontSize: 120,
    fontWeight: "bold",
    margin: 10,
    color: '#1DB954'
  }
})