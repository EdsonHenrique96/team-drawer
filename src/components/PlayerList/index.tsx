import { useState } from 'react';
import { useTeamBuilder } from '../../hooks/useTeamBuilder';
import './style.css';

interface PlayerListProps {
  numberOfPlayers: number;
}

export function PlayerList(props: PlayerListProps) {
  const { addPlayers, shuffleTeams } = useTeamBuilder();
  const [ buttonDisable, setButtonDisable ] = useState(false);

  const auxArray = Array(props.numberOfPlayers).fill("");

  function handleClick() {
    shuffleTeams();
    setButtonDisable(true);
  }

  return (
    <div className="player-list">
      <h3>Insira os nomes dos jogadores</h3>

      {
        auxArray.map((_value, index) => (
          <input
            key={`input-player-${index}`}
            type="text"
            name={`player-${index}`}
            className="input-player"
            onChange={(e) => addPlayers(e)}
          />
        ))
      }

      <button 
        type="button"
        onClick={handleClick}
        disabled={buttonDisable}
      >
        Sortear time
      </button>
    </div>
  )
}