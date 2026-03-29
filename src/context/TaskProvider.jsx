import { useCallback, useEffect, useReducer } from "react"
import { DEFAULT_CATEGORIES, STORAGE_KEYS } from "../utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateTaskId } from "../utils/helper";
import { TaskContext } from "./TaskContext";

const initialState = {
    tasks: [],
    trash: [],
    categories: DEFAULT_CATEGORIES,
}

const taskReducer = (state, action) => {
    switch (action.type) {
        case "SET_INITIAL_STATE":
            return action.payload; //the state object is now updated with the action.payload

        case "ADD_TASK":
            return { //using return {} curly braces cuz we are returning state object
                ...state, //spreading the existing state to maintain immutability
                tasks: [ //mutating to update existing state's tasks array
                    ...state.tasks, //spreading existing tasks objets
                    {
                        id: generateTaskId(),
                        ...action.payload, //spreading taskData object passed as action.payload to this new task objecct

                        // if this was taskData object send from addtask { title: "Buy Milk", priority: "High" }
                        // then ...action.payload will spread and make this new task object as { id: 1, title: "Buy Milk", priority: "High", completed: false }

                        completed: false, //setting default value for completed property as false when a new task is added
                        createdAt: new Date().toISOString(), //toISOString() converts a Date object into a specific, standardized string format called ISO 8601
                        // eg: "2026-03-26T14:30:00.000Z" where T separates date and time, and Z indicates that the time is in UTC (Coordinated Universal Time)
                    }
                ]

            }

        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
                )
            }

        case "DELETE_TASK":
            const taskToDelete = state.tasks.find(t => t.id === action.payload);
            if (!taskToDelete) return state;  // Silently ignore if task not found
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload),
                trash: [...state.trash, { ...taskToDelete, deletedAt: new Date().toISOString() }]
            }

        case "RESTORE_TASK":
            const taskToRestore = state.trash.find(t => t.id === action.payload);
            if (!taskToRestore) return state;  // Silently ignore if task not found
            const restoredTask = { ...taskToRestore };
            delete restoredTask.deletedAt;
            //The delete operator removes a property from an object.
            // It doesn't just set the value to null or undefined.
            // It completely wipes the key from the object’s memory "map."

            return {
                ...state,
                tasks: [...state.tasks, restoredTask],
                trash: state.trash.filter(t => t.id !== action.payload)
            }

        case "EMPTY_TRASH":
            return {
                ...state,
                trash: []
            }

        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        case "TOGGLE_TASK_COMPLETE":
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                )
            }

        default:
            return state;

    }
}

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const [, setTasksStorage] = useLocalStorage(STORAGE_KEYS.TASKS, []); // dong destructuring by [,settask] but only taking the fn rather than the stored value
    const [, setTrashStorage] = useLocalStorage(STORAGE_KEYS.TRASH, []);
    const [, setCategoriesStorage] = useLocalStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);

    //initialize state from localStorage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]')
        const savedTrash = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRASH) || '[]')
        const savedCategories = JSON.parse(
            localStorage.getItem(STORAGE_KEYS.CATEGORIES) || JSON.stringify(DEFAULT_CATEGORIES)
        )
        dispatch(
            {
                type: 'SET_INITIAL_STATE',
                payload: {
                    tasks: savedTasks,
                    trash: savedTrash,
                    categories: savedCategories,
                },
            }
        )
    }, [])

    //sync state changes to localStorage
    useEffect(() => {
        setTasksStorage(state.tasks);
        setTrashStorage(state.trash);
        setCategoriesStorage(state.categories);
    }, [state, setTasksStorage, setTrashStorage, setCategoriesStorage]); //ensuring that useeffect triggers if new instances of these setters are created

    const addTask = useCallback((taskData) => {
        dispatch({
            type: "ADD_TASK",
            payload: taskData
        });
    }, []);

    const updateTask = useCallback((id, updates) => {
        dispatch({
            type: "UPDATE_TASK",
            payload: { id, updates } //this is a shorthand for { id: id, updates: updates }, where the first id and updates are keys in the payload object, and the second id and updates are the variables passed to the updateTask function
        })
    }, []);

    const deleteTask = useCallback((id) => {
        dispatch({
            type: "DELETE_TASK",
            payload: id,
        });
    }, []);

    const restoreTask = useCallback((id) => {
        dispatch({
            type: "RESTORE_TASK",
            payload: id,
        });
    }, []);

    const emptyTrash = useCallback(() => {
        dispatch({
            type: "EMPTY_TRASH",
        })
    }, [])

    const addCategory = useCallback((category) => {
        dispatch({
            type: "ADD_CATEGORY",
            payload: category,
        })
    }, [])

    const toggleTaskComplete = useCallback((id) => {
        dispatch({
            type: 'TOGGLE_TASK_COMPLETE',
            payload: id,
        });
    }, []);

    const clearAllData = useCallback(() => {
        dispatch({
            type: "SET_INITIAL_STATE",
            payload: {
                tasks: [],
                trash: [],
                categories: DEFAULT_CATEGORIES,
            },
        });
        localStorage.clear();
    }, []);

    const value = {
        tasks: state.tasks,
        trash: state.trash,
        categories: state.categories,
        addTask, //this is also a shorthand for addTask: addTask, where the key and value have the same name
        updateTask,
        deleteTask,
        restoreTask,
        emptyTrash,
        addCategory,
        toggleTaskComplete,
        clearAllData
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>

}