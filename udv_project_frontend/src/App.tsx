import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './router/AppRouter';
import './scss/index.scss'
import { AuthProvider, HrProjectsProvider, HrStaffProvider, TodoProvider } from './utils/indext';

export default App

function App() {

  return (
    <AuthProvider>
      <TodoProvider>
        <HrStaffProvider>
          <HrProjectsProvider>
            <AppRouter />
          </HrProjectsProvider>
        </HrStaffProvider>
      </TodoProvider>
    </AuthProvider>
  );
}