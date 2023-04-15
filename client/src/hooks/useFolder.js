import { useEffect } from "react";
import { useReducer } from "react";
import { firebase_db, formattedDoc } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER:' update-folder'
};

const ROOT_FOLDER = {
    name: "Root",
    id: null,
    path: []
}

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

    useEffect(() => {
        dispatch({type: ACTIONS.SELECT_FOLDER,
            payload: {folderId,folder}
        });
    }, [folderId, folder])

    useEffect(()=>{
        // console.log("har");
        async function doUpdateFolder() {
            if(folderId == null) {
                return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: {folder: ROOT_FOLDER}
                });
            } else {
                try {
                    const docRef = doc(firebase_db, "folders", folderId);
                    const docSnap = await getDoc(docRef);

                    console.log(formattedDoc(docSnap));
                }catch(err) {
                    dispatch({
                        type: ACTIONS.UPDATE_FOLDER,
                        payload: {folder: ROOT_FOLDER}
                    });
                }
            }
        }

        doUpdateFolder();
    }, [folderId])

    return state;
}