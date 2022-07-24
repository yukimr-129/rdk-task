import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const apiUrl = "http://localhost:8000/api/tasks";
const token = localStorage.localJWT;

const timeOut = () => {
    return new Promise((resolve) => {
        setTimeout(resolve(), 5000);
    })
}

const initialState = {
    tasks: [
        {
            id: 0,
            title: 'test',
            created_at: '2020-12-12',
            updated_at: '2020-12-12',
        }
    ],
    editedTask: {
        id: 0,
        title: '',
        created_at: '',
        updated_at: '',
    },
    selectedTask: {
        id: 0,
        title: '',
        created_at: '',
        updated_at: '',
    },
    isLoding: false
}


export const fetchCreateTaskAsync = createAsyncThunk('task/create', async (task) => {
    try {
        const res = await axios.post(`${apiUrl}/`, task, {
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json",
            }
        })
        if (res.status === 201) {
            return res.data
        } else {
            return {}
        }
    } catch (error) {
        throw new Error(error)
    }
})

export const fetchGetAllTaskAsync = createAsyncThunk('task/all/', async () => {
    try {
        const res = await axios.get(`${apiUrl}/`, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        })
        if (res.status === 200) {
            return res.data
        } else {
            return []
        }
    } catch (error) {
        throw new Error(error)
    }
})

export const fetchUpdateTaskAsync = createAsyncThunk('task/update/', async (task) => {
    try {
        const res = await axios.put(`${apiUrl}/${task.id}/`, task, {
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json",
            }
        })
        console.log(res);
        if (res.status === 200) {
            return res.data
        } else {
            return {}
        }
    } catch (error) {
        throw new Error(error)
    }
})

export const fetchDeleteTaskAsync = createAsyncThunk('task/delete/', async (id) => {
    try {
        await axios.delete(`${apiUrl}/${id}/`, {
            headers: {
                Authorization: `JWT ${token}`,
                "Content-Type": "application/json",
            }
        })

        return id
    } catch (error) {
        throw new Error(error)
    }
})


export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        editTask: (state, action) => {
            return {
                ...state,
                editedTask: {
                    ...action.payload
                }
            }
        },
        selectTask: (state, action) => {
            return {
                ...state,
                selectedTask: {
                    ...action.payload
                }
            }
        }
    },
    extraReducers: (builder) => {
        //全件取得
        builder.addCase(fetchGetAllTaskAsync.pending, (state, action) => {
            // state.isLoding = true
            return {
                ...state,
                isLoding: true,
              };
        })
        .addCase(fetchGetAllTaskAsync.fulfilled, (state, action) => {
            // state.isLoding = false

            return {
                ...state,
                tasks: action.payload,
                isLoding: false
            }
        })
        .addCase(fetchGetAllTaskAsync.rejected, (state, action) => {
            // state.isLoding = false
            return {
                ...state,
                isLoding: false,
              };

        })

        //新規作成
        builder.addCase(fetchCreateTaskAsync.pending, (state, action) => {
            return {
                ...state,
                isLoding: true,
              };

        })
        .addCase(fetchCreateTaskAsync.fulfilled, (state, action) => {
            console.log(action);
            return {
                ...state,
                tasks: [
                    action.payload,
                    ...state.tasks,
                ],
                isLoding: false,
            }
        })
        .addCase(fetchCreateTaskAsync.rejected, (state, action) => {
            // state.isLoding = false
            return {
                ...state,
                isLoding: false,
              };
        })

        //更新
        builder.addCase(fetchUpdateTaskAsync.pending, (state, action) => {
            return {
                ...state,
                isLoding: true,
              };

        })
        .addCase(fetchUpdateTaskAsync.fulfilled, (state, action) => {
            // state.isLoding = false

           const newTasks = state.tasks.map((task) => {
                return task.id === action.payload.id ? action.payload : task
            })

            return {
                ...state,
                tasks: newTasks,
                selectedTask: {
                    ...action.payload
                },
                isLoding: false
            }
        })
        .addCase(fetchUpdateTaskAsync.rejected, (state, action) => {
            // state.isLoding = false
            console.log(action);
            return {
                ...state,
                isLoding: false,
              };
        })

        //削除
        builder.addCase(fetchDeleteTaskAsync.pending, (state, action) => {
        })
        .addCase(fetchDeleteTaskAsync.fulfilled, (state, action) => {
            // state.isLoding = false

            const newTasks = state.tasks.filter((task) => {
                return task.id !== action.payload
            })

            return {
                ...state,
                tasks: newTasks,
                selectedTask: {
                    ...initialState.selectedTask
                },
                isLoding: false
            }

        })
        .addCase(fetchDeleteTaskAsync.rejected, (state, action) => {
            // state.isLoding = false
            console.log(action);
            return {
                ...state,
                isLoding: false,
              };
        })
    }
})

export const selectTasks = (state) => state.task.tasks
export const selectSelectedTasks = (state) => state.task.selectedTask
export const selectEditedTasks = (state) => state.task.editedTask
export const selectIsLoding = (state) => state.task.isLoding

export const {editTask, selectTask} = taskSlice.actions

export default taskSlice.reducer