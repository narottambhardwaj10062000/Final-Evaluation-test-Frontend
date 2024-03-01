import axios from "axios";

const backend_Url = "http://localhost:7000/api/v1";

//Handling create task API
export const createNewTask = async ({ title, checkListArray, priority, dueDate }) => {
  try {
    const checkList = checkListArray;
    const reqUrl = `${backend_Url}/task/create`;
    const reqPayload = { title, checkList, priority, dueDate };
    
    //setting header
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.post(reqUrl, reqPayload);
    return response;

  } catch (error) {
    // console.log(error);

  }
};

//Getting all tasks from backend

export const getTasksList = async ( selectedFilter ) => {
  const filter = selectedFilter;
  try {
    const reqUrl = `${backend_Url}/task/alltask/${filter}`;

    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(reqUrl);
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
};

//Edit Task API
export const EditTask = async ({
  taskId,
  editTitle,
  editedChecklist,
  editDueDate,
  editPriority,
}) => {
  try {
    const reqUrl = `${backend_Url}/task/edit/${taskId}`;
    const reqPayload = { editTitle, editedChecklist, editDueDate, editPriority };

    //setting header
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.put(reqUrl, reqPayload);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Delete Task API
export const deleteTask = async (taskId) => {
  try {
    const reqUrl = `${backend_Url}/task/delete/${taskId}`;

    //setting header
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Update status API
export const updateStatus = async (taskId, status) => {
  try {
    const reqUrl = `${backend_Url}/task/update/${taskId}?status=${status}`;

    //setting header
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.put(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//updating checkbox from board page
export const handleChangeCheckList = async(taskId, checkboxId, state) => {
  try {
    const reqUrl = `${backend_Url}/task/updatecheckbox/${taskId}?checkboxId=${checkboxId}`;
    const reqPayload = {state};
    const response = await axios.put(reqUrl, reqPayload);
    return response;
  } catch ( error ) {
    console.log(error);
  }
}

//Analytics
export const analytics = async () => {
  try {
    //setting header
    const token = JSON.parse(localStorage.getItem("Token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const result = await axios.get(`${backend_Url}/task/analytics`);
    return result;
  } catch (error) {
    return error?.response;
  }
}

//Shared Task
export const sharedTask = async (id) => {
  try {
      const result = await axios.get(`${backend_Url}/task/share/${id}`);
      return result;
  } catch (error) {
      return error?.response;
  }
}
