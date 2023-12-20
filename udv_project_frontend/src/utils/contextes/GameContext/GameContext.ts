import React from "react";

export interface GameContextProps {
    game: GameObject | null;
    buyElementById: (elementId: number) => void;
    fetchGameObject: () => void;
}

export const GameContext = React.createContext<GameContextProps>({
    game: null,
    buyElementById: () => { },
    fetchGameObject: async () => { },
})