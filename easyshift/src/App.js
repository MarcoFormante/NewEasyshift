import {Routes,Route} from 'react-router-dom'
import Login from './components/Login/Login';

function App() {
  return (
    <main className="App">
        <Routes>
          <Route path={'/'} element={<Login/>} />
        </Routes>
    </main>
  );
}

export default App;
