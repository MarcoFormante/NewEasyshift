import {Routes,Route} from 'react-router-dom'
import Login from './components/Pages/Login/Login';
import NewAccount from './components/Pages/NewAccount/NewAccount';
import ProtectedRoute from './components/Helpers/ProtectedRoute/ProtectedRoute';
import Header from './components/Layout/Header/Header';

function App() {
  return (
    <main className="App">
        <Routes>
          <Route exact path={'/'} element={<Login/>} />
          <Route path={'/newAccount'} element={<NewAccount />} />
          <Route path={"*"} element={"notfound"} />
        <Route element={<ProtectedRoute auth={true} redirectPath={"/"} />}>
            <Route path={'/home'} element={"homepage"} />
            <Route path={"/*"} element={"notFound"} />
          </Route>
        </Routes>
    </main>
  );
}

export default App;
