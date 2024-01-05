import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  incrementCounter() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <View style={this.styles.container}>
        <Text>Gayathri's Awesome Project</Text>
        <Text>Counter: {this.state.counter}</Text>
        <Button onPress={this.incrementCounter.bind(this)} title='GO' color="#db6782"></Button>
        <StatusBar style="auto" />
      </View>
    );
  }
}
