import React, { createContext, useContext } from "react";

const AddContext = createContext();

export function useAddContext() {
    return useContext(AddContext);
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
        <AddContext.Provider value={values}>
            {children}
        </AddContext.Provider>
    )
}