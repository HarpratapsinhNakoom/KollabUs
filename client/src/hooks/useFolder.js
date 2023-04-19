import { useEffect } from "react";
import { useReducer } from "react";
import { firebase_db, formattedDoc } from "../firebase";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useLocalContext } from "../context/context";

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER:' update-folder',
    SET_CHILD_FOLDER: 'set-child-folder',
    SET_CHILD_FILES:'set-child-files',
};

function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFiles: []
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDER:
            return {
                ...state,
                childFolders: payload.childFolders
            }
        case ACTIONS.SET_CHILD_FILES:
            return{
                ...state,
                childFiles:payload.childFiles,
            }
        default:
            return state;
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })

    const {currentUser} = useAuth();
    const  {currentRootFolder} = useLocalContext();

    useEffect(() => {
        dispatch({type: ACTIONS.SELECT_FOLDER,
            payload: {folderId,folder}
        });
    }, [folderId, folder])

    useEffect(()=>{
        async function doUpdateFolder() {
            if(folderId === currentRootFolder) {
                return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: {folder: {
                        name : "Home",
                        id: currentRootFolder,
                        path: []
                    }}
                });
            } else {
                try {
                    const docRef = doc(firebase_db, "folders", folderId);
                    const docSnap = await getDoc(docRef);

                    dispatch({
                        type: ACTIONS.UPDATE_FOLDER,
                        payload: {folder: formattedDoc(docSnap)}
                    });
                }catch(err) {
                    dispatch({
                        type: ACTIONS.UPDATE_FOLDER,
                        payload: {folder: {
                            name : "Home",
                            id: currentRootFolder,
                            path: []
                        }}
                    });
                }
            }
        }

        doUpdateFolder();
    }, [folderId, currentRootFolder])

    useEffect(() => {

        const q = query(collection(firebase_db, "folders"),
        where("parentId", "==", folderId));
        
        return onSnapshot(q, (querySnapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDER,
                payload: {
                    childFolders: querySnapshot.docs.map(formattedDoc),
                }
            })
        });
    //    return collection(firebase_db, "folders")
    //     .where("parentId", "==", folderId)
    //     .where("userId", "==", currentUser.uid)
    //     .orderBy("createdAt")
    //     .onSnapShot(snapShot => {
    //         dispatch({
    //             type: ACTIONS.SET_CHILD_FOLDER,
    //             payload: {
    //                 childFolders: snapShot.docs.map(formattedDoc)
    //             }
    //         })
    //     })
    }, [folderId, currentUser])

    useEffect(()=>{
        const fileRef=collection(firebase_db,"files")
        const q=query(fileRef,where("parentId","==",folderId))
        return onSnapshot(q,(snapshot)=>{
            dispatch({
                type:ACTIONS.SET_CHILD_FILES,
                payload:{childFiles:snapshot.docs.map(formattedDoc)}
                
            })
        })

    },[folderId,currentUser])


    return state;
}