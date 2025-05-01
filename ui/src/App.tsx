import './App.css';
import SignUp from './auth/SignUp';
import { useAuth } from './auth/useAuth';

function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <SignUp />
      </div>
    );
  }

  return (
    <div>main here</div>

  );
}

export default App;
