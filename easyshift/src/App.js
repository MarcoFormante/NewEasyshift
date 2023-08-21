import React,{createContext,useState} from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Pages/Login/Login';
import NewAccount from './components/Pages/NewAccount/NewAccount';
import ProtectedRoute from './components/Helpers/ProtectedRoute/ProtectedRoute';
import NewRequest from './components/Pages/NewRequest/NewRequest';
import MyRequests from './components/Pages/MyRequests/MyRequests';
import RequestsHandler from './components/Pages/RequestHandler/RequestsHandler';
import ViewRequest from './components/Pages/ViewRequest/ViewRequest';
import DeleteAccount from './components/Pages/DeleteAccount/DeleteAccount';
import Loading from './components/Elements/Loading/Loading'
import ReservedArea from './components/Pages/Admin/ReservedArea';
import Home from './components/Pages/Admin/Home';
import AdminProtectedRoute from './components/Pages/Admin/AdminProtectedRoute';
import ShowRequest from './components/Pages/Admin/ShowRequest';
import Notifications from './components/Pages/Admin/Notifications';
import Requests from './components/Pages/Admin/Requests';
import Users from './components/Pages/Admin/Users';

export const loadingContext = createContext()

function App() {
  const [isLoading,setIsLoading] = useState(false)
  
  return (
    <div className="App">
      <Loading isLoading={isLoading} />
      <loadingContext.Provider value={{isLoading,setIsLoading}}>
        <Routes>
          <Route exact path={'/'} element={<Login />} />
          <Route path={'/newAccount'} element={<NewAccount />} />
          <Route path={'/reservedArea'} element={<ReservedArea/>} />
          <Route path={'/*'} element={"Not Found"} />

          {/* Protected Route for Users */}
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

          {/* Protected Route for admin */}
          <Route element={<AdminProtectedRoute/>}>
            <Route path={"/admin/home"} element={<Home />} />
            <Route path={"/admin/users"} element={<Users/>} />
            <Route path={"/admin/requests"} element={<Requests/>} />
            <Route path={"/admin/notifications"} element={<Notifications/>} />
            <Route path={"/admin/showRequest"} element={<ShowRequest/>} />
          </Route>
        </Routes>
        </loadingContext.Provider>
    </div>
  );
}

export default App;
