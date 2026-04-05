import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-200">
            <Navbar />
            <main className="flex-grow">
              <LandingPage />
            </main>
          </div>
        } 
      />
      
      <Route 
        path="/login" 
        element={<LoginPage />} 
      />

      <Route element={<ProtectedRoute />}>
        <Route 
          path="/chat" 
          element={<ChatPage />} 
        />
      </Route>
    </Routes>
  );
}

export default App;