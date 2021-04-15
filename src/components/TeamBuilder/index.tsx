import { useState } from 'react';
import { useTeamBuilder } from '../../hooks/useTeamBuilder';
import { PlayerList } from '../PlayerList';
import './style.css';

export function TeamBuilder() {
  const  [ totalPlayers, setTotalPlayers ] = useState(0);

  const {
    setPlayersPerTeam,
    playersPerTeam,
    handleTotalTeams,
  } = useTeamBuilder();

  const [ buttonDisable, setButtonDisable ] = useState(false);
  const [ showPlayersInput, setShowPlayersInput ] = useState(false);

  function handleTeams() {
    const numberOfTeams = totalPlayers / playersPerTeam;

    handleTotalTeams(numberOfTeams);
    setShowPlayersInput(true);
    setButtonDisable(true);
  }

  return (
    <div className="team-builder-container">
      <form>
        <label htmlFor="total-players" >Total de jogadores</label>
        <input
          type="number"
          name="total-players"
          id="total-players"
          value={totalPlayers}
          onChange={(e) => setTotalPlayers(Number(e.target.value))}
        />

        <label htmlFor="players-per-team">Jogadores por time</label>
        <input
          type="number"
          name="players-per-team"
          id="players-per-team"
          value={playersPerTeam}
          onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
        />

        <button
          type="button"
          onClick={handleTeams}
          disabled={buttonDisable}
        >
          Inserir jogadores
        </button>

        { 
          showPlayersInput
          && (
            <PlayerList numberOfPlayers={totalPlayers} />
          )
        }
      </form>
    </div>
  )
}