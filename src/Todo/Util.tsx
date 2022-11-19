import api from "./TodoSdk";
const getTodoList = async () => {
    try {
        const tasks: any = await api.getTasks()
        return tasks;
    } catch (error) {
        console.log("===> error ", error)
        return [];
    }
}
export default getTodoList;