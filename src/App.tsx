import React from 'react';
import { GameBoard } from './components/GameBoard';
import { PushContextComponent } from './context/PushContext';

const App: React.FC = () => {
  return <PushContextComponent>
    <GameBoard rootedElement={document.documentElement}  />;
  </PushContextComponent>;
}

export default App;
