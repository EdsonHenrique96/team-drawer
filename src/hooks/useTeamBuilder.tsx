import { ChangeEvent, createContext, useContext, useState } from 'react';

interface TeamBuilderContextProps {
  teams: Team[];
  handleTotalTeams: (numberOfTeams: number) => void;
  addPlayers: (e: ChangeEvent<HTMLInputElement>) => void;
  buildTeams: () => void;
  setPlayersPerTeam: (playersPerTeam: number) => void;
  playersPerTeam: number;
}

const TeamBuilderContext = createContext({} as TeamBuilderContextProps);

interface TeamBuilderProviderProps {
  children: React.ReactNode;
}

interface Player {
  name: string;
  value: string;
}

export type Team = Player[]

export function TeamBuilderProvider({ children }: TeamBuilderProviderProps) {
  const [ players, setPlayes ] = useState<Player[]>([]);
  const [ totalTeams, setTotalTeams ] = useState(0);
  const [ teams, setTeams ] = useState<Team[]>([]);

  const [ playersPerTeam, setPlayersPerTeam ] = useState(6);

  function handleTotalTeams(numberOfTeams: number) {
    setTotalTeams(Math.floor(numberOfTeams));
  }

  function addPlayers(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const clonePlayers = [ ...players ];
    
    const existentPlayer = clonePlayers.find((playerData) => playerData.name === name);

    if(existentPlayer) {
      existentPlayer.value = value;
    } else {
      clonePlayers.push({ name, value });
    }

    setPlayes(clonePlayers);
  }

  function shufflePlayers () {
    let length = players.length;
    let shuffledPlayers: Player[] = Array(length).fill({ name: "", value: "" });

    for (let index = 0, rand; index < length; index++) {
      rand = Math.floor(Math.random() * index);
      if (rand !== index) shuffledPlayers[index] = shuffledPlayers[rand];
      shuffledPlayers[rand] = players[index];
    }

    return shuffledPlayers;
  }

  function buildTeams() {
    const shuffledPlayers = shufflePlayers();

    const cloneTeam = [...teams];

    for (let i = 1; i <= Math.floor(totalTeams); i++) {
      let shuffledTeam: Player[] = shuffledPlayers.splice(0, playersPerTeam);
      cloneTeam.push(shuffledTeam);
    }

    if (shuffledPlayers.length > 0 ) {
      cloneTeam.push(shuffledPlayers);
    }

    setTeams(cloneTeam);
  }

  return (
    <TeamBuilderContext.Provider
      value={{
        teams,
        handleTotalTeams,
        addPlayers,
        buildTeams,
        setPlayersPerTeam,
        playersPerTeam,
      }}
    >
      { children }
    </TeamBuilderContext.Provider>
  )
}

export function useTeamBuilder() {
  const context = useContext(TeamBuilderContext);

  return context;
}