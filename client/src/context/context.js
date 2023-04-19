import React, { createContext, useContext } from "react";

const LocalContext = createContext();

export function useLocalContext() {
    return useContext(LocalContext);
}

export function ContextProvider({children}) {
    const [createSpace, setCreateSpace] = React.useState(false);
    const [joinSpace, setJoinSpace] = React.useState(false);
    const [createFolder, setCreateFolder] = React.useState(false);
    const [createFile, setCreateFile] = React.useState(false);
    const [selectedSpace, setSelectedSpace] = React.useState({});
    const [currentRootFolder, setCurrentRootFolder] = React.useState("");
    const [workSpaceCount, setWorkSpaceCount] = React.useState(0);
    const [currentVoiceChannels, setCurrentVoiceChannels] = React.useState([]);
    const [voiceChannelsCount, setVoiceChannelsCount] = React.useState(0);

    const values = {
        createSpace,
        setCreateSpace,
        joinSpace,
        setJoinSpace,
        createFolder,
        setCreateFolder,
        createFile,
        setCreateFile,
        selectedSpace,
        setSelectedSpace,
        currentRootFolder,
        setCurrentRootFolder,
        workSpaceCount,
        setWorkSpaceCount,
        currentVoiceChannels,
        setCurrentVoiceChannels,
        voiceChannelsCount,
        setVoiceChannelsCount
    }
    return (
        <LocalContext.Provider value={values}>
            {children}
        </LocalContext.Provider>
    )
}