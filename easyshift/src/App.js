import {Routes,Route, useLocation} from 'react-router-dom'
import Login from './components/Pages/Login/Login';
import NewAccount from './components/Pages/NewAccount/NewAccount';
import ProtectedRoute from './components/Helpers/ProtectedRoute/ProtectedRoute';
import NewRequest from './components/Pages/NewRequest/NewRequest';
import MyRequests from './components/Pages/MyRequests/MyRequests';
import RequestsHandler from './components/Pages/RequestHandler/RequestsHandler';
import ViewRequest from './components/Pages/ViewRequest/ViewRequest';
import { useEffect } from 'react';
import DeleteAccount from './components/Pages/DeleteAccount/DeleteAccount';


function App() {
  const location = useLocation()
  
 
  
  return (
    <div className="App">
        <Routes>
        <Route exact path={'/'} element={<Login />} />
        <Route path={'/newAccount'} element={<NewAccount />} />
        <Route path={'/*'} element={"Not Found"} />
          <Route element={<ProtectedRoute auth={sessionStorage.getItem("token")} redirectPath={"/"}/>}>
          <Route path={'/home'} element={<RequestsHandler requestTarget={"all"} />} />
            <Route path={'/newRequest'} element={<NewRequest />} />
            <Route path={'/myRequests'} element={<MyRequests />} />
            <Route path={'/viewRequest/:id'} element={<ViewRequest />} />
            <Route path={'/contact'} element={"contact"} />
            <Route path={'/deleteAccount'} element={<DeleteAccount/>} />
            <Route path={'/modifyAccount'} element={"modify"} />
            <Route path={'/*'} element={"Not Found"} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
