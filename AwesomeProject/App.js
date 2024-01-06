import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      complementaryColor: '#ffffff',
      textColor: '#000000',
      isModalVisible: false,
    };
  }

  componentDidMount() {
    const { complementaryColor, textColor } = this.getComplementaryColors('#db6782');
    this.setState({ complementaryColor, textColor });
  }

  getComplementaryColors(baseColor) {
    const hex = baseColor.replace(/^#/, '');
    const rgb = parseInt(hex, 16);
    const complementaryColor = `#${(0xffffff ^ rgb).toString(16).padStart(6, '0')}`;
    const lighterShade = this.lightenColor(complementaryColor, 0.2);
    const textColor = this.calculateTextColor(lighterShade);

    return { complementaryColor: lighterShade, textColor };
  }

  lightenColor(color, factor) {
    const hex = color.replace(/^#/, '');
    const rgb = parseInt(hex, 16);

    const r = Math.round(((rgb >> 16) & 0xff) * (1 + factor));
    const g = Math.round(((rgb >> 8) & 0xff) * (1 + factor));
    const b = Math.round((rgb & 0xff) * (1 + factor));

    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  calculateTextColor(backgroundColor) {
    const hex = backgroundColor.replace(/^#/, '');
    const rgb = parseInt(hex, 16);
    const luminance = 0.299 * ((rgb >> 16) & 0xff) + 0.587 * ((rgb >> 8) & 0xff) + 0.114 * (rgb & 0xff);
    return luminance > 128 ? '#000000' : '#ffffff';
  }

  handleIncrement = () => {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 }, () => {
      this.checkForMotivationPopup();
    });
  };

  checkForMotivationPopup = () => {
    const { counter } = this.state;
    if (counter === 5 || counter === 10) {
      this.showMotivationPopup();
    }
  };

  showMotivationPopup = () => {
    this.setState({ isModalVisible: true });
  };

  hideMotivationPopup = () => {
    this.setState({ isModalVisible: false });
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333333',
    },
    buttonContainer: {
      width: 240,
      height: 240,
      borderRadius: 120,
      overflow: 'hidden',
      shadowColor: '#db6782',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
    },
    button: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 120,
      backgroundColor: '#db6782',
    },
    buttonText: {
      fontSize: 24,
      color: '#ffffff',
    },
  });

  render() {
    const { counter, complementaryColor, textColor, isModalVisible } = this.state;

    return (
      <View style={[this.styles.container, { backgroundColor: complementaryColor }]}>
        <Text style={this.styles.header}>Raj's Job Click Counter</Text>
        <Text style={[this.styles.buttonText, { color: textColor }]}>Counter: {counter}</Text>
        <TouchableOpacity style={this.styles.buttonContainer} onPress={this.handleIncrement}>
          <View style={this.styles.button}>
            <Text style={this.styles.buttonText}>GO</Text>
          </View>
        </TouchableOpacity>
        <StatusBar style="auto" />

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                You are doing great. Consider applying for more jobs!
              </Text>
              <TouchableOpacity onPress={this.hideMotivationPopup}>
                <Text style={{ color: 'blue', fontSize: 16 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
