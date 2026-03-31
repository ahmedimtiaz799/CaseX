import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';



const LoginPlaceholder = () => (
  <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-50">
    <h1 className="font-heading text-3xl font-bold text-slate-900">
      Login Page (Coming Soon)
    </h1>
  </div>
);

const ChatPlaceholder = () => (
  <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-50">
    <h1 className="font-heading text-3xl font-bold text-slate-900">
      Chat Interface (Coming Soon)
    </h1>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-600">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPlaceholder />} />
          <Route path="/chat" element={<ChatPlaceholder />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;