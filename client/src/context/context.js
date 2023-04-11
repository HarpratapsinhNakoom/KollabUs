import React, { createContext, useContext } from "react";

const LocalContext = createContext();

export function useLocalContext() {
    return useContext(LocalContext);
}

export function ContextProvider({children}) {
    const [createSpace, setCreateSpace] = React.useState(false);
    const [joinSpace, setJoinSpace] = React.useState(false);

    const values = {
        createSpace,
        setCreateSpace,
        joinSpace,
        setJoinSpace
    }
    return (
        <LocalContext.Provider value={values}>
            {children}
        </LocalContext.Provider>
    )
}