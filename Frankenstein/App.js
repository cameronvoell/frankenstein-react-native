import React, { Component } from 'react';
import { TouchableOpacity , Image, Text, View, StyleSheet, TextInput, Alert} from 'react-native';

const styles = StyleSheet.create({
  greeting: {
    alignItems: 'center',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30
  },
  red: {
    color: 'red',
  },
  labledImageOuter: {
    flex: 1, 
    flexDirection: 'column', 
    padding: 0, 
    margin: 0, 
    backgroundColor: 'blue'
  },
  image: {
    justifyContent: "flex-start",
    marginTop: 0,
    paddingTop: 0,
    width: null,
    height: null,
    aspectRatio: 4/3
  },
  mainContainer: {
    flex: 1, flexDirection: 'column'
  },
  textInputContainer: { 
    flex: 1, 
    backgroundColor: 'powderblue'
  },
  textInput: { 
    height: 40, 
    justifyContent: "flex-start" 
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
})

class Greeting extends Component {
  render() {
    return (
      <View style={styles.greeting}>
        <Text style={styles.red}>Label: {this.props.name}</Text>
      </View>
    );
  }
}

class LabeledImage extends Component {

  componentDidMount(){
    // Toggle the state every second
        // setInterval(() => (
        //   this.setState(previousState => (
        //     { isShowingText: !previousState.isShowingText }
        //     ))
        // ), 1000)
     }
     
  state = { isShowingText: true }
  render() {
    if(!this.state.isShowingText) {
      return null;
    }
    return (
      <View style={styles.labledImageOuter}>
        <Image 
          source={this.props.source}  
          resizeMode='contain' 
          style={styles.image}/>
        <Greeting name={this.props.label} />
      </View>
    );
  }
}

export default class Bananas extends Component {

  state = {whichFruit: "bananaas" };
  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }

   _onPressButton() {
    return fetch('https://api.kraken.com/0/public/Ticker?pair=ethusd')
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(JSON.stringify(responseJson.result.XETHZUSD.a[0]))
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
   }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <LabeledImage source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} label={"Buy " + this.state.whichFruit + "!"} />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="What's your favorite fruit?"
            onChangeText={(text) => (
              this.setState({ whichFruit: text })
            )}
          />
        </View>
        <TouchableOpacity 
          onPress={this._onPressButton}
          delayLongPress={1000}
          onLongPressButton={this._onLongPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Touch me (long press not working! :-(</Text>
          </View>
          </TouchableOpacity>
      </View>
    );
  }
}