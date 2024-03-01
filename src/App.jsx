import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTask from "./Pages/CreateTaskPage/CreateTask";
import { TaskContextProvider } from "./contexts/TaskContext";
import AnalyticsPage from "./Pages/AnalyticsPage/AnalyticsPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import UnprotectedPage from "./Pages/UnprotectedPage/UnprotectedPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedPage from "./Pages/ProtectedPage/ProtectedPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import SharedPage from "./Pages/SharedPage/SharedPage";

function App() {
  return (
    <TaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/shared/:param" exact element={<SharedPage />} />
          <Route element={<UnprotectedPage />}>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Route>
          <Route element={<ProtectedPage />}>
            <Route path="/" exact element={<DashboardPage />} />
            <Route path="/analytics" exact element={<AnalyticsPage />} />
            <Route path="/settings" exact element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskContextProvider>
  );
}

export default App;
