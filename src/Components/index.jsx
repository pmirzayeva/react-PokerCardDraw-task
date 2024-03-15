import React, { useEffect, useState } from 'react';

export default function Card() {
  const [deckId, setDeckId] = useState('');
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [noCardsLeft, setNoCardsLeft] = useState(false);

  useEffect(() => {
    async function fetchDeckId() {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
      const data = await response.json();
      // console.log("data",data);
      setDeckId(data.deck_id);
    }
    fetchDeckId()
  }, []);

  const drawCard = async (player) => {
    if (!deckId) return; 
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
    const data = await response.json();

    if (data.success) {
      const card = data.cards[0];
      // console.log("card",card);

      switch (player) {
        case 1:
          setPlayer1Cards(prevCards => [...prevCards, card]);
          break;
        case 2:
          setPlayer2Cards(prevCards => [...prevCards, card]);
          break;
        default:
          break;
      }
    } else {
      setNoCardsLeft(true);
      setPlayer1Cards([]);
      setPlayer2Cards([]);
    }
  };

  return (
<div>
      <div className='container'>
        <div className='player-container'>
          <h2>Player 1</h2>

          {player1Cards.length > 0 ? (
            <div className='card-stack'>
              {player1Cards.map((card, index) => (
                <img
                  key={"card"+ index}
                  src={card.image}
                  alt={card}
                  className='card'
                  style={{ transform: `rotate(${index % 2 === 0 ? Math.min(index * 10, 20) : Math.max(index * -10, -20)}deg)` }}
                />
              ))}
            </div>
          ) : (
            <p>{noCardsLeft ? 'No cards left in the deck' : 'No card drawn yet'}</p>
          )}
          <button onClick={() => drawCard(1)}>Draw Card</button>

        </div>
        <div className='player-container'>
          <h2>Player 2</h2>
          {player2Cards.length > 0 ? (
            <div className='card-stack'>
              {player2Cards.map((card, index) => (
                <img
                  key={"card"+ index}
                  src={card.image}
                  alt={card}
                  className='card'
                  style={{ transform: `rotate(${index % 2 === 0 ? Math.min(index * 10, 20) : Math.max(index * -10, -20)}deg)` }}
                />
              ))}
            </div>
          ) : (
            <p>{noCardsLeft ? 'No cards left in the deck' : 'No card drawn yet'}</p>
          )}
          <button onClick={() => drawCard(2)}>Draw Card</button>
        </div>
      </div>
    </div>
  );
}

