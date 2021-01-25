import React from 'react';
import { GameBoard } from './components/GameBoard';

const App: React.FC = () => {
  return <GameBoard rootedElement={document.documentElement}  />;
}

export default App;
