import React from 'react';
import { TitlePageComponent } from '../../../components/TitlePage/TitlePageComponent';
import { useGame } from '../../../utils/contextes/GameContext/useGame';
import { Button, Image } from 'react-bootstrap';

export const ApprenticeOfficePage: React.FC = () => {
    const {game, byeGameBack} = useGame();
    return (
        <>
            <TitlePageComponent titleName='Мой офис'/>
            <section className='container py-5'>
            {game && <><h1>{game.count_stars} stars</h1>
            <div>
            <Button disabled={game.buttonBack} onClick={() => byeGameBack()}>Улучшить фон</Button>
            <Button disabled={game.buttonTable}>Улучшить стол</Button>
            <Button disabled={game.buttonComputer}>Улучшить компьютер</Button>
            <Button disabled={game.buttonChair}>Улучшить кресло</Button>
            
            <Image style={{position: 'absolute', opacity: game.ordinaryBack }} src="\src\images\фон обычный.png" alt="ploho" width={500}/>
            <Image style={{position: 'absolute',opacity: game.cosmosBack }} src="\src\images\фон космос.png" alt="ploho" width={500}/>
            <Image style={{position: 'absolute',opacity: game.ordinaryTable }} src="\src\images\стол обычный.png" alt="ploho" width={500}/>
            <Image style={{position: 'absolute',opacity: game.cosmosTable }} src="\src\images\стол космос.png" alt="ploho" width={500}/>
            <Image style={{position: 'absolute',opacity: game.ordinaryComputer }} src="\src\images\компьютер обычный.png" alt="ploho" width={500}/>
            <Image style={{position: 'absolute',opacity: game.cosmosComputer }} src="\src\images\компьютер космос.png" alt="ploho" width={500}/>
            <Image style={{position: 'absolute',opacity: game.ordinaryChair }} src="\src\images\кресло обычное.png" alt="ploho" width={500}/>
            <Image style={{position: 'absolute',opacity: game.cosmosChair }} src="\src\images\кресло космос.png" alt="ploho" width={500}/>
            </div>
            <Image src={game.imagePath} alt="ploho" width={200}/>            
            </>}
            
            </section>
        </>
    );
};