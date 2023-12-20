import React from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { StarIcon } from './StarIcon';

interface BuyBtnGroupProps {
  game: GameObject;
  buyElementById: (elementId: number) => void;
}

export const BuyBtnGroup: React.FC<BuyBtnGroupProps> = ({ game, buyElementById }) => {
  const btnTitles = [
    { title: 'Улучшить фон', btnType: 'buttonBack' },
    { title: 'Улучшить стол', btnType: 'buttonTable' },
    { title: 'Улучшить компьютер', btnType: 'buttonComputer' },
    { title: 'Улучшить кресло', btnType: 'buttonChair' }
  ];

  const onBuy = ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, elementId: number) => {
    if (game.count_stars >= 100)
      buyElementById(elementId);
    else
      event.preventDefault();
  })

  const toolTip = (isBought: boolean) => (
    <Tooltip id="subtask-prompt" className='tooltip' style={{ position: "fixed" }}>
      {isBought ? <p>Вы уже купили данный предмет!</p>:
       <p>К сожалению у вас не хватает звездочек, вперед выполнять критерии!</p>}
    </Tooltip>
  )

  return (
    <div className='d-grid gap-0 row-gap-3'>
      {btnTitles.map((btn, index) => (
        <Card key={index}
          className={`border ${game[btn.btnType] === true ? 'border-primary-subtle' : 'border-primary'}`}>
          <OverlayTrigger
            placement="auto"
            overlay={toolTip(game[btn.btnType] === true)}
            delay={{ show: 200, hide: 200 }}
            show={game.count_stars < 100 ? undefined : false}
          >
            <Card.Body className='d-flex align-items-center justify-content-between'>
              <Card.Title as='h5'
                className={`text-primary m-0 ${game[btn.btnType] === true ? 'opacity-75' : ''}`}
              >{btn.title}</Card.Title>
              <Button
                type='button'
                size='lg'
                disabled={game[btn.btnType] === true || game.count_stars < 100}
                onClick={(event) => (onBuy(event, index + 1))}
              >Купить <span className='ps-3'>100 <StarIcon /></span></Button>
            </Card.Body>
          </OverlayTrigger>

        </Card>

      ))}
    </div>

  )
}