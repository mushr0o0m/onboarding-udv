import React from "react";
import { Image } from 'react-bootstrap';

interface OfficeConstructorProps {
  game: GameObject;
}

export const OfficeConstructor: React.FC<OfficeConstructorProps> = ({ game }) => {

  const path = '\\src\\images\\'

  return (
    <div className="d-flex justify-content-end ">
      <Image className="position-relative" thumbnail rounded 
        src={`${path}${game.ordinaryBack === 1 ? 'ordinaryBackground' : 'spaceBackground'}.png`} width={500} />
      <Image className="position-absolute"
        src={`${path}${game.ordinaryTable === 1 ? 'ordinaryTable' : 'spaceTable'}.png`} width={500} />
      <Image className="position-absolute"
        src={`${path}${game.ordinaryComputer === 1 ? 'ordinaryComp' : 'spaceComp'}.png`} width={500} />
      <Image className="position-absolute"
        src={`${path}${game.ordinaryChair === 1 ? 'ordinaryChair' : 'spaceChair'}.png`} width={500} />
    </div>
  )
}