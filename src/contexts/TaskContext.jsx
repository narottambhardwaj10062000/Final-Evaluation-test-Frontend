import { createContext, useContext, useEffect, useState } from "react";
import { getTasksList } from "../api/task";
import { FormatDate } from "../Helpers/FormatDate";

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  // const [backlog, setBacklog] = useState([]);
  const [userName, setUserName] = useState("");
  const [CurrentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  const [selectedOption, setSelectedOption] = useState("This Week");

  const [checkListArray, setCheckListArray] = useState([]);

  const [editedChecklist , setEditedCheckList] = useState([]);

  const [backlog, setBacklog] = useState([]);
  //   const [allTasks, setAllTasks] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const setValue = () => {
    const todoVal = allTasks.filter((currTask) => {
      return currTask.status === "todo";
    });

    const backlogVal = allTasks.filter((currTask) => {
      return currTask.status === "backlog";
    });

    const progressVal = allTasks.filter((currTask) => {
      return currTask.status === "progress";
    });

    const doneVal = allTasks.filter((currTask) => {
      return currTask.status === "done";
    });

    setTodo(todoVal);
    setBacklog(backlogVal);
    setInProgress(progressVal);
    setDone(doneVal);
  };

  //*************************** */
  // const [checklistToggle, setChecklistToggle] = useState(false);
  //*************************** */

  // console.log(CurrentDate);
  // console.log(formattedDate);
  // console.log(selectedOption);
  // console.log(allTasks);
  // console.log(editedChecklist);

  // FormatDate(CurrentDate);

  // useEffect(() => {
  //   fetchData();
  // }, [])

  useEffect(() => {
    setValue();
  }, [allTasks])

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
        setEditedCheckList,

        todo,
        setTodo, 
        backlog,
        setBacklog,
        inProgress,
        setInProgress,
        done,
        setDone
        // checklistToggle,
        // setChecklistToggle
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
