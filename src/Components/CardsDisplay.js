import React, { useState, useRef, useEffect } from 'react';
import {
  IdcardOutlined
} from '@ant-design/icons';
import {
  Card as AntdCard,
 } from 'antd';
import Card from '../../class/Card';
import {
  StyledCardsDisplay,
  FunctionButton,
  StyledCardDisplay,
} from './styles';

const { Meta } = AntdCard;

const CardDisplay = ({ card, active }) => {
  const { group } = card;
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      Card.createImg(card, canvasRef.current);
    }
  }, [canvasRef, card]);

  return (
    <StyledCardDisplay
      cover={<canvas ref={canvasRef} />}
      active={active}
    >
      <Meta title={group} description="" />
    </StyledCardDisplay>
  )
}

const CardsDisplay = ({ cards, setSelectedCard, selectedCard }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <FunctionButton
        type="primary"
        shape="circle"
        bottom={2}
        onClick={() => setVisible(!visible)}
        icon={<IdcardOutlined />}
      />
      <StyledCardsDisplay
        mask={false}
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {
          cards.map((card, i) => (
            <div onClick={() => selectedCard === card ? setSelectedCard(null) : setSelectedCard(card)}>
              <CardDisplay
                card={card}
                key={i}
                active={selectedCard === card}
              />
            </div>
          ))
        }
      </StyledCardsDisplay>
    </>
  )
}

export default CardsDisplay;
