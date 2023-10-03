import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

// 1) Context creation
const DarkModeContext = createContext()

// 2) Custome Context Provider 

const DarkModeContextProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme: light)').matches,'isDarkMode');

    function darkModeToogler () {
        setIsDarkMode((isDark) => !isDark);
    }


    // DOM MANIPULATION FOR DARK MODE
    useEffect(() => {
        if(isDarkMode){
            document.documentElement.classList.add('light--mode')
            document.documentElement.classList.remove('dark--mode')
        }else{
            document.documentElement.classList.add('dark--mode')
            document.documentElement.classList.remove('light--mode')
        }
    }, [isDarkMode])


    return (
        <DarkModeContext.Provider 
        value={{isDarkMode, darkModeToogler}}
        >
            {children}
        </DarkModeContext.Provider>
    )
}


// 3) Custome hook for the usage of context with ease 

const useDarkMode = () => {
    const darkMode = useContext(DarkModeContext);
    if(darkMode === 'undefined') toast.error('DarkModeContext is beeing used outside the DarkModeContextProvider');

    return darkMode;
}

export {useDarkMode, DarkModeContextProvider}