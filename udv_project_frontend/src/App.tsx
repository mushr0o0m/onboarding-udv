import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './router/AppRouter';
import './scss/index.scss'
import { AuthProvider, HrProjectsProvider, HrStaffProvider, TodoProvider } from './utils/indext';
import { GameProvider } from './utils/contextes/GameContext/GameProvider';

export default App

function App() {

  return (
    <AuthProvider>
      <TodoProvider>
        <HrStaffProvider>
          <HrProjectsProvider>
            <GameProvider>
              <AppRouter />
            </GameProvider>
          </HrProjectsProvider>
        </HrStaffProvider>
      </TodoProvider>
    </AuthProvider>
  );
}