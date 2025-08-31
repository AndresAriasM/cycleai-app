// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/auth/LoginScreen';
import CreateUserScreen from './screens/auth/CreateUserScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import MenuScreen from './screens/menu/MenuScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import AnalysisScreen from './screens/analysis/AnalysisScreen';
import HypeCycleScreen from './screens/analysis/HypeCycleScreen'; // ✅ Añadido

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
          
          {/* Análisis */}
          <Route path="/analysis" element={<AnalysisScreen />} />
          <Route path="/hypecycle" element={<HypeCycleScreen />} /> {/* ✅ Añadido */}
          
          {/* Ruta 404 - redireccionar al login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;