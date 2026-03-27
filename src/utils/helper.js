export const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const options = { month: "short", day: "numeric", year: "numeric" };// this object must have reserved key-value pair, cuz localestring (the fn that formats date object into readable string) is very specific about key-value pairs
    return d.toLocaleString("en-US", options); //passing the string "en-US" for formatting, while options for customizing the format of date
}

export const formatDateTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const options = { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return d.toLocaleString("en-US", options);
}

export const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    const taskDate = new Date(date);
    return ( //checking if task date is same as today based on year, month and date
        today.getFullYear() === taskDate.getFullYear() &&
        today.getMonth() === taskDate.getMonth() &&
        today.getDate() === taskDate.getDate()
    );
}

export const isOverdue = (date, completed) => {
    if (!date || completed) return false; //if date isnt provided, or if task is completed, its not overdue
    const today = new Date();
    today.setHours(0,0,0,0); // Set time to the start of the day i,e, 00:00:00:00 (hrs, mins, secs, ms) for accurate comparison
    const taskDate = new Date(date);
    taskDate.setHours(0,0,0,0);
    return taskDate < today; //checking if task date is already passed based on today
}

export const isTodayOrNo = (date) => { //for the today view page
    if (!date) return true; //if no date is provided, we consider it as today for the today view page
    return isToday(date) || isOverdue(date, false);
}

export const generateTaskId = () => {
    return `task_${Date.now()}_${Math.random().toString(36).slice(2,11)}`;
    //Math.random(): Generates a random decimal,
    // .toString(36): Converts that decimal into Base 36. Base 36 uses numbers (0-9) and letters (a-z).
    //Example: 0.12345 becomes something like 0.4f3g...
    // .slice(2, 11): start from index 2 to index 11 this takes the next 9 characters after index 2.
}

export const sortTaskByDueDate = (tasks) => {
    const priorityOrder = { "High": 0, "Medium": 1, "Low": 2 }; //here making keys literal strings
    return [...tasks].sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]); //object["lookupKey"] is a Square Bracket Notation (or Key-Value Lookup).
    //If a.priority is "High", then priorityOrder["High"] becomes 0. cuz its looking for the value of the matched key in object
    //using [...tasks] to create new array to avoid mutating original tasks array
    //sort((a,b)=> a-b), here a is 1st element and b is 2nd element, and both are incremented to next position when the current sort is done
    //sort is done in this manner: if a-b is -ve then a comes before b, if a-b is +ve then b comes before a, if a-b is 0 then they remain unchanged
}

export const filterTasksBySearchTerm = (tasks, searchTerm) => {
    if (!searchTerm) return tasks; //if search term is empty, return all tasks
    const term = searchTerm.toLowerCase();
    return tasks.filter(
        task => task.title.toLowerCase().includes(term) ||  ( task.description && task.description.toLowerCase().includes(term) )
        //checking if task title or description includes the search term, and also handling case where description might be undefined
    )
}

export const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0,0,0,0); // Set time to the start of the day for accurate comparison
    const taskDate = new Date(dueDate);
    taskDate.setHours(0,0,0,0);
    const diffTime = taskDate - today; //difference in milliseconds
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); //converting milliseconds to days
    return diffDays;
}