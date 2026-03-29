import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";


export let ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, "light");

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    }

    useEffect(
        () => {
            document.documentElement.setAttribute("data-theme", theme);
            //this means document.documentElement (the root element of the document, which is usually the <html> element) 
            //the setAttibute will set a custom attribute called "data-theme" on the <html> element, and its value will be either "light" or "dark" based on the current theme state.
            //its like: <html data-theme="light"> or <html data-theme="dark">
        }, [theme]
    );

    return (
        <ThemeContext.Provider value={[theme, toggleTheme]}> //passing the value of context as an array
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}


