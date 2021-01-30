import React, { useState, useRef, useEffect } from 'react';
import {
  IdcardOutlined
} from '@ant-design/icons';
import { Card as AntdCard } from 'antd';
import Card from '../../class/Card';
import {
  StyledCardsDisplay,
  ShowCardsButton,
  StyledCardDisplay,
} from './styles';

const { Meta } = AntdCard;

const CardDisplay = ({card}) => {
  const { group } = card;
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      Card.createImg(card, canvasRef.current);
    }
  }, [canvasRef, card]);

  return (
    <StyledCardDisplay
      hoverable
      cover={<canvas ref={canvasRef} />}
    >
      <Meta title={group} description="" />
    </StyledCardDisplay>
  )
}

const CardsDisplay = ({ cards }) => {
  const [visible, setVisible] = useState(false);
  console.log(cards);
  return (
    <>
      <ShowCardsButton
        type="primary"
        shape="circle"
        onClick={() => setVisible(true)}
        icon={<IdcardOutlined />}
      />
      <StyledCardsDisplay
        mask={false}
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {
          cards.map((card, i) => <CardDisplay card={card} key={i}/>)
        }
      </StyledCardsDisplay>
    </>
  )
}

export default CardsDisplay;
