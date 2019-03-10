import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider } from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Store} from './source/controllers/store';
import AppNav from './source/components/screens/navigation/navigation';

export default class App extends React.Component {
  render() {
    const store = Store();
    return (
      <Provider store = {store}>
          <AppNav />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
