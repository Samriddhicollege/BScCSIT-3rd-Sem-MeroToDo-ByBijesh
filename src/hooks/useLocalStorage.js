import { useState } from "react"

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(
        () => { //setting the "storedValue" state's initial value
            try {
                const item = window.localStorage.getItem("key");
                return item ? JSON.parse(item) : initialValue; //parsing the stringified value from localStorage
            } catch (error) {
                console.log("Error reading from localStorage: ", error);
                return initialValue;
            }
        }
    )

    //setting up the setValue function to update both the state and localStorage
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value; //allowing the setValue function to accept a function as an argument, similar to how the useState setter works
            setStoredValue(valueToStore); // updating the storedValue state based on the value passed on our custom hook as an array of object, or a fn that returns array of object
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log("Error writing to localStorage: ", error);
        }
    }

    return [storedValue, setValue]; // providing setValue as a state updater fn rather than setStoredValue fn we got from useState
}

/*
lets say some component uses this custom hook like this:
const [tasks, setTasks] = useLocalStorage("my-todo-list", []);

setTasks can be used in two ways:
Directly: setTasks(newArray)
Functional: setTasks(prev => [...prev, newTask])

if the functional form is used, the setValue function will call the provided function with the current storedValue (tasks)
 as an argument, allowing us to update the state based on its previous value.
  This is particularly useful when the new state depends on the old state,
   such as when adding a new task to an existing list of tasks.
 */