import React from 'react';
import { GameContext } from './GameContext';

export const useGame = () => {
    const context = React.useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}