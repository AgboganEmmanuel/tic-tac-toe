import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Player = 'X' | 'O' | null;
type GameResult = Player | 'Draw';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<GameResult | null>(null);

  const checkWinner = (board: Player[]): GameResult => {
    const winningCombos = [
      // Rows
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // Columns
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // Diagonals
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.every(cell => cell !== null) ? 'Draw' : null;
  };

  const handleCellPress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      Alert.alert(
        gameResult === 'Draw' ? 'Draw!' : `Player ${gameResult} wins!`,
        'Game Over',
        [{ text: 'Play Again', onPress: resetGame }]
      );
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCell = (index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.cell}
      onPress={() => handleCellPress(index)}
    >
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.currentPlayerText}>
        Current Player: {currentPlayer}
      </Text>
      <View style={styles.board}>
        {board.map((_, index) => renderCell(index))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currentPlayerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TicTacToe;