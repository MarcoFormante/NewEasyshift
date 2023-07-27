import {Routes,Route} from 'react-router-dom'
import Login from './components/Pages/Login/Login';
import NewAccount from './components/Pages/NewAccount/NewAccount';

function App() {
  return (
    <main className="App">
        <Routes>
          <Route path={'/'} element={<Login/>} />
          <Route path={'/newAccount'} element={<NewAccount/>} />
        </Routes>
    </main>
  );
}

export default App;
