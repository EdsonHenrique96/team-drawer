import { useTeamBuilder } from '../../hooks/useTeamBuilder';

import './style.css';

export function TeamList() {
  const { teams } = useTeamBuilder();

  return (
    <div className="team-list">
      <ul>
        {
          teams.map((team, index) => (
            <li key={`box-team-${index+1}`}>
              <header>
                <h2>{`Time ${index+1}`}</h2>
              </header>
              <section>
                <strong>Jogadores</strong>
                {
                  team.map((player) => (
                    <p key={`box-player-${index+1}-${player.name}`}>{player.value}</p>
                  ))
                }
              </section>
            </li>
          ))
        }
      </ul>
    </div>
  )
}