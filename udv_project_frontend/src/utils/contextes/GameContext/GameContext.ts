import React from "react";

export interface GameContextProps {
    game: GameObject|null;
    byeGameBack: () => void;

}

export const GameContext = React.createContext<GameContextProps>({
    game: null,
    byeGameBack: () => { },
})