import React from 'react';
import { GameContext } from './GameContext';
import { getGameInfo, putGameBack } from './api/GameRequests';
import { useAuth } from '../AuthContext/useAuth';
import { useTodo } from '../indext';

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [game, setGame] = React.useState<GameObject|null>(null);
  const { token, userType } = useAuth();
  const { tasks } = useTodo();

  React.useEffect(() => {
    const fetchGameObject = async () => {
      getGameInfo(token)
        .then((gameInfo) => {
            console.log(gameInfo)
            setGame(gameInfo)})
        .catch((error) => console.error('Error fetching game info:', error));

    };

    if (token && userType === 'WR') {
      fetchGameObject();
    }
  }, [token, userType, tasks]);

  const byeGameBack = () => {
    putGameBack(token)
    .then((gameInfo) => {
        console.log(gameInfo)
        setGame(gameInfo)})
    .catch((error) => console.error('Error put game back:', error));
  };

  const value = {
    game,
    byeGameBack
  };


  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};