import { createContext, useContext, useEffect, useState } from "react";
import { getTasksList } from "../api/task";
import { FormatDate } from "../Helpers/FormatDate";

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  // const [backlog, setBacklog] = useState([]);
  const [userName, setUserName] = useState("xb");
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  const [selectedOption, setSelectedOption] = useState("This Week");

  const [checkListArray, setCheckListArray] = useState([]);

  const [editedChecklist , setEditedCheckList] = useState([]);
  // console.log(CurrentDate);
  // console.log(formattedDate);
  // console.log(selectedOption);
  // console.log(allTasks);

  // FormatDate(CurrentDate);

  useEffect(() => {
    setCurrentDate(new Date());
    const val = JSON.parse(localStorage.getItem("Name"));
    setUserName(val);
  }, []);

  useEffect(() => {
    const val = FormatDate(CurrentDate);
    setFormattedDate(val);
  }, [CurrentDate]);

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  //function to fetch tasks from backend
  const fetchData = async () => {
    const response = await getTasksList(selectedOption);
    setAllTasks(response.data);
  };

  return (
    <TaskContext.Provider
      value={{
        fetchData,
        allTasks,
        setUserName,
        userName,
        formattedDate,
        selectedOption,
        setSelectedOption,
        checkListArray,
        setCheckListArray,
        editedChecklist,
        setEditedCheckList
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
