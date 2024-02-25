import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import DashBoard from './Pages/DashBoard/DashBoard';
import CreateTask from './Pages/CreateTaskPage/CreateTask';
import { TaskContextProvider } from "./contexts/TaskContext";

function App() {

  return (
    <TaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </TaskContextProvider>
  )
}

export default App
