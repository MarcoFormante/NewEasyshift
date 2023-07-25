import {Routes,Route} from 'react-router-dom'
import Login from './components/Login/Login';
import './sass/global_styles.scss'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
