import { Header } from './components/Header';
import { TeamBuilder } from './components/TeamBuilder';
import { TeamList } from './components/TeamList';

import { TeamBuilderProvider } from './hooks/useTeamBuilder';

import './styles/global.css';

function App() {
  return (
    <div className="App">
      <TeamBuilderProvider>
        <Header />
        <TeamBuilder />
        <TeamList />
      </TeamBuilderProvider>
    </div>
  );
}

export default App;
