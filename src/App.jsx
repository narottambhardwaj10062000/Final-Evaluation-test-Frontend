import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import DashBoard from './Pages/DashBoard/DashBoard';
import CreateTask from './Pages/CreateTaskPage/CreateTask';
import { TaskContextProvider } from "./contexts/TaskContext";
import AnalyticsPage from './Pages/AnalyticsPage/AnalyticsPage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';

function App() {

  return (
    <TaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </TaskContextProvider>
  )
}

export default App
