// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/auth/LoginScreen';
import CreateUserScreen from './screens/auth/CreateUserScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import MenuScreen from './screens/menu/MenuScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import UserProfileScreen from './screens/profile/UserProfileScreen';
import AnalysisScreen from './screens/analysis/AnalysisScreen';
import HypeCycleScreen from './screens/analysis/HypeCycleScreen';
import InnovationTestScreen from './screens/analysis/InnovationTestScreen'; // ✅ Nuevo import
import DataScreen from './screens/data/DataScreen';
import ManagementScreen from './screens/management/ManagementScreen';  
import ConfigScreen from './screens/config/ConfigScreen';
import SupportScreen from './screens/support/SupportScreen';

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
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          
          {/* Pantalla principal del menú */}
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/user-profile" element={<UserProfileScreen />} />
          <Route path="/data" element={<DataScreen />} />
          <Route path="/management" element={<ManagementScreen />} />
          <Route path="/config" element={<ConfigScreen />} />
          <Route path="/support" element={<SupportScreen />} />
          
          {/* Análisis */}
          <Route path="/analysis" element={<AnalysisScreen />} />
          <Route path="/hypecycle" element={<HypeCycleScreen />} />
          <Route path="/innovation-test" element={<InnovationTestScreen />} /> {/* ✅ Nueva ruta */}
          
          {/* Ruta 404 - redireccionar al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;