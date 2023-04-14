import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Worksapce from './WorkSpace/Worksapce'
import { doc, getDoc } from 'firebase/firestore';
import { firebase_db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';


const MainContent = () => {
  const [workspaces, setWorkspaces] = React.useState([{}]);
  const [selectedSpace, setSelectedSpace] = React.useState({});
    const {currentUser} = useAuth();
    React.useEffect(() => {
        
        async function getData() {
            try{
                const userRef = doc(firebase_db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                
                const workspaceids = userSnap.data().workspaces;
                const t = [];
                for (let index = 0; index < workspaceids.length; index++) {
                    const ele = (await getDoc(doc(firebase_db, "workspaces", workspaceids[index]))).data();
                    t.push(ele);
                }

                setWorkspaces(t);
                // setWorkspaces(
                //     workspaceids.map( (spaceId) => {
                //         const spaceRef = doc(firebase_db, "workspaces", spaceId);
                //         const spaceSnap = getDoc(spaceRef);

                //         return spaceSnap.data().name;
                //     })
                // )
                // setWorkspaces()
            } catch(err) {
                console.log(err);
            }
        }

        getData();
    }, [currentUser]);
  return (
    <Grid container
          gap={"20px"}
          m={"20px"}
          height="calc(100% - 100px)">
          <Grid item md={2.5}>
              <Sidebar workspaces={workspaces}
              setSelectedSpace={setSelectedSpace}/>
          </Grid>
          <Grid item md={8.5}
            overflow="scroll"
            height={"100%"}
            sx={{
              "::-webkit-scrollbar" :{
                display: "none"
              }
            }}>
              <Worksapce space={selectedSpace}/>
          </Grid>
    </Grid>
  )
}

export default MainContent