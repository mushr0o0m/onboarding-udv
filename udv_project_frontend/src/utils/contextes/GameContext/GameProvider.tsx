import React, { useCallback } from 'react';
import { GameContext } from './GameContext';
import { getGameInfo, putGameBack } from './api/GameRequests';
import { useAuth } from '../AuthContext/useAuth';

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [game, setGame] = React.useState<GameObject | null>(null);
  const { token, userType } = useAuth();

  
  const fetchGameObject = useCallback(() => {
    getGameInfo(token)
    .then((gameInfo) => {
      setGame(gameInfo);
    })
    .catch((error) => console.error('Error fetching game info:', error));
  }, [token])
  
  React.useEffect(() => {
    if (token && userType === 'WR') {
      fetchGameObject();
    }
  
    console.log('fetchGameObject');
  }, [fetchGameObject, token, userType]);

  const buyElementById = (elementId: number) => {
    putGameBack(elementId, token)
      .then((gameInfo) => setGame(gameInfo));
  };

  const value = {
    game,
    buyElementById,
    fetchGameObject
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};