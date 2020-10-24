import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import database from '@react-native-firebase/database';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myTextValue: 'dados aaaaaaa'
    }
  }

  componentDidMount() {
    // recupera os valores do nó user em tempo real
    database()
      .ref('/users/')
      .on('value', snapshot => {
        this.setState({ myTextValue: JSON.stringify( snapshot.val() )})
      });
  }

  firebaseTest = () => {
    // gera uma referencia para um novo usuario 
    const ref = database().ref('/users/').push();

    // salvei um novo usuario no realtime database
    ref.set({
      name: "Thayllo Oliveira",
      age: 94
    }).then(console.log('Deu tudo certo!'));
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>{this.state.myTextValue}</Text>
          <Button
            onPress={this.firebaseTest}
            title="Teste firebase"
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({

});