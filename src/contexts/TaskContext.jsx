import { createContext, useContext, useEffect, useState } from "react";
import { getTasksList } from "../api/task";
import { FormatDate } from "../Helpers/FormatDate";

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("week");
  const [checkListArray, setCheckListArray] = useState([]);
  const [editedChecklist, setEditedCheckList] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [activeUserName, setActiveUserName] = useState("");

  useEffect(() => {
    setCurrentDate(new Date());
    const val = JSON.parse(localStorage.getItem("Name"));
    setUserName(val);
  }, []);

  useEffect(() => {
    localStorage.setItem("Name", JSON.stringify(activeUserName));
    setUserName(activeUserName);
  }, [activeUserName]);

  useEffect(() => {
    const val = FormatDate(CurrentDate);
    setFormattedDate(val);
  }, [CurrentDate]);

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  //function to fetch tasks from backend
  const fetchData = async () => {
    const response = await getTasksList(selectedFilter);

    setActiveUserName(response.name);
    // console.log(response.name)
    setTodo(response.task.todo);
    setInProgress(response.task.progress);
    setDone(response.task.done);
    setBacklog(response.task.backlog);
  };

  return (
    <TaskContext.Provider
      value={{
        fetchData,
        setUserName,
        userName,
        formattedDate,
        selectedFilter,
        setSelectedFilter,
        checkListArray,
        setCheckListArray,
        editedChecklist,
        setEditedCheckList,
        activeUserName,
        setActiveUserName,

        todo,
        setTodo,
        backlog,
        setBacklog,
        inProgress,
        setInProgress,
        done,
        setDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
