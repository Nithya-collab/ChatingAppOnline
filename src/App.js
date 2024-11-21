import './App.css';
import Chat from './components/Chat';
import Signin from './components/Signin';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from './FireBase/firebase';

function App() {
   const [user] = useAuthState(auth);
  return (
    <div className="App">
         {
            user ?  <Chat /> : <Signin/> 
         }
    </div>
  );
}

export default App;
