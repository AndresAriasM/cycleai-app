// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/auth/LoginScreen';
import CreateUserScreen from './screens/auth/CreateUserScreen';
// Importaremos estas pantallas cuando las creemos
// import MenuScreen from './screens/menu/MenuScreen';
// import ProfileScreen from './screens/profile/ProfileScreen';
// import DashboardScreen from './screens/dashboard/DashboardScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
// import CreateUserScreen from './screens/auth/CreateUserScreen';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Ruta por defecto - Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Autenticación */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/create-user" element={<CreateUserScreen />} />
          {/* Pantallas principales - las crearemos después */}
          {/* <Route path="/menu" element={<MenuScreen />} /> */}
          {/* <Route path="/profile" element={<ProfileScreen />} /> */}
          {/* <Route path="/dashboard" element={<DashboardScreen />} /> */}
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          {/* <Route path="/create-user" element={<CreateUserScreen />} /> */}
          
          {/* Ruta 404 - redireccionar al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;