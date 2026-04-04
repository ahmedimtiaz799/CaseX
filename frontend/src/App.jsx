// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage'; 

const LoginPlaceholder = () => (
  <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-50">
    <h1 className="font-heading text-3xl font-bold text-slate-900">
      Login Page (Coming Soon)
    </h1>
  </div>
);

function App() {
  return (
    <Routes>
      
      <Route 
        path="/" 
        element={
          <div className="min-h-screen bg-white flex flex-col font-sans text-slate-600">
            <Navbar />
            <main className="flex-grow">
              <LandingPage />
            </main>
          </div>
        } 
      />
      
      
      <Route 
        path="/login" 
        element={
          <div className="min-h-screen bg-white flex flex-col font-sans text-slate-600">
            <Navbar />
            <main className="flex-grow">
              <LoginPlaceholder />
            </main>
          </div>
        } 
      />

    
      <Route 
        path="/chat" 
        element={<ChatPage />} 
      />
    </Routes>
  );
}

export default App;