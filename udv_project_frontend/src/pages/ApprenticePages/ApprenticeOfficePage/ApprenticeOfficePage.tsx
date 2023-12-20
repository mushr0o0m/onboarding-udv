import React from 'react';
import { TitlePageComponent } from '../../../components/TitlePage/TitlePageComponent';
import { useGame } from '../../../utils/contextes/GameContext/useGame';
import { BuyBtnGroup } from './components/indext';
import { OfficeConstructor } from './components/OfficeConstructor';
import { Col, Row } from 'react-bootstrap';
import { BigStarCouner } from './components/BigStarCouner';

export const ApprenticeOfficePage: React.FC = () => {
  const { game, buyElementById, fetchGameObject } = useGame();

  React.useEffect(() => {
    fetchGameObject();
  }, [fetchGameObject])
  
  return (
    <>
      <TitlePageComponent titleName='Мой офис' />
      <section className='container py-5'>
        {game &&
          <>
            <Row>
              <Col sm={6} className='d-grid gap-0 row-gap-33'>
                <Row>
                  <div>
                    <BigStarCouner starCount={game.count_stars} />
                  </div>
                </Row>
                <Row>
                  <BuyBtnGroup game={game} buyElementById={buyElementById} />
                </Row>
              </Col>
              <Col sm={6}>
                <OfficeConstructor game={game} />
              </Col>
            </Row>
          </>}

      </section>
    </>
  );
};