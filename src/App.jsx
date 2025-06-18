import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; 
import Signup from './pages/signup';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { LoginContext } from './utils/context';
import Vehicles from './pages/Vehicle/Vehicle';
import EditVehicleForm from './pages/Vehicle/EditVehicle';
import AddVehicleForm from './pages/Vehicle/AddVehicles';
import ShipmentPage from './pages/Shipment/Shipment';
import TrackingPage from './pages/trackingpage';
import ProfilePage from './pages/Users/Profile';
import BookingPage from './pages/Users/Bookingpage';
import User from './pages/Users/Users';
import MyBookings from './pages/Users/MyBooking';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './components/protectedRoutes';
import AddShipment from './pages/Shipment/Addshipment';
import EditProfile from './pages/Users/EditProfile';
import AssignVehicle from './pages/Vehicle/AssignVehicle';
import Driver from './pages/Driver/Driver';
import AddDriver from './pages/Driver/AddDriver';
import AssignDriver from './pages/Driver/AssignDriver';
import Shipmenthistory from './pages/Driver/ShipmentHistory';
import Currentshipment from './pages/Driver/CurrentShipment';
import EditDriver from './pages/Driver/EditDriver';
import ShipmentTrack from './pages/Shipment/ShipmentTrack';
import ShipmentHistory from './pages/Shipment/ShipmentHistory';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/Resetpassword';

function App() {

  const [isLogedin,setisLogedin] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <LoginContext.Provider value={ {isLogedin ,setisLogedin}}>  
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route>
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/vehicles/add" element={<AddVehicleForm />} />
                <Route path="/vehicles/edit/:id" element={<EditVehicleForm />} />
                <Route path="/shipments" element={<ShipmentPage />} />
                <Route path="/shipments/vehicles/assign/:id" element={ <AssignVehicle />}  />
                <Route path="/shipments/add" element={<AddShipment />} />
                {/* <Route path="/shipments/edit/:id" element={<EditShipmentForm />} /> */}
                <Route path="/shipments/shipmenthistory" element={<ShipmentHistory />} /> 
                <Route path="/shipments/track/:id" element={<ShipmentTrack />} />
                <Route path="/users" element={<User />} />
                <Route path='/drivers' element={<Driver />} />
                <Route path='/drivers/add' element={<AddDriver />} />
                <Route path='drivers/edit/:id' element={<EditDriver />} />
                <Route path='/drivers/vehicles/assign/:id' element={<AssignDriver />} />
              </Route>
              <Route path='/currentshipment/:id' element={<Currentshipment />} />
              <Route path="/shipmenthistory/:id" element={<Shipmenthistory />} />
              <Route path="/track" element={<TrackingPage />} />
              <Route path="/profile" element={<ProfilePage />}/>
              <Route path="/booking/:id" element={<BookingPage />} />
              
              <Route path="/profile/mybookings/:id" element={<MyBookings />} />
              <Route path="/profile/edit/:id" element={<EditProfile />} />
            </Route>
          </Routes>    
        </LoginContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
