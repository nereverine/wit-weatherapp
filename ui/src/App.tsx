import './App.css';
import { useRoutes } from 'react-router-dom';
import getRoutes from './routes';

function App() {
  const routes = getRoutes();
  const app = useRoutes(routes);

  return app;
}

export default App;