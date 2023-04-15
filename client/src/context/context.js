import React, { createContext, useContext } from "react";

const LocalContext = createContext();

export function useLocalContext() {
    return useContext(LocalContext);
}

export function ContextProvider({children}) {
    const [createSpace, setCreateSpace] = React.useState(false);
    const [joinSpace, setJoinSpace] = React.useState(false);
    const [createFolder, setCreateFolder] = React.useState(false);
    const [selectedSpace, setSelectedSpace] = React.useState({});
    const [currentRootFolder, setCurrentRootFolder] = React.useState("");

    const values = {
        createSpace,
        setCreateSpace,
        joinSpace,
        setJoinSpace,
        createFolder,
        setCreateFolder,
        selectedSpace,
        setSelectedSpace,
        currentRootFolder,
        setCurrentRootFolder
    }
    return (
        <LocalContext.Provider value={values}>
            {children}
        </LocalContext.Provider>
    )
}