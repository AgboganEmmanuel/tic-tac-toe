import React from 'react';
import { View } from 'react-native';
import TicTacToe from '../components/tic-tac-toe';

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TicTacToe />
    </View>
  );
}