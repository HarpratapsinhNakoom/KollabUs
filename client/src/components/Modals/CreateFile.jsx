import React,{useState} from 'react'
import{Button,Modal,Form} from "react-bootstrap"
import {setDoc,serverTimestamp, arrayUnion, doc, updateDoc} from "firebase/firestore"
import "bootstrap/dist/css/bootstrap.min.css";
import { firebase_db } from '../../firebase'
import {v4 as uuidV4} from "uuid"
import { useLocalContext } from '../../context/context';



export default function CreateFile({currentFolder}) {
    const {createFile, setCreateFile} = useLocalContext()
    const[name,setName]=useState('');

    function closeModal(){
        setCreateFile(false)
    }
    async function handleSubmit(e){
        e.preventDefault();

        // create file in database
        


        if(currentFolder==null) return


        try {
        // console.log(currentUser.uid);
        const fileId=uuidV4();
        await setDoc(doc(firebase_db, "files",fileId), {
          name: name,  //name for folder stored in db
          parentId: currentFolder.id,  
          createdAt:serverTimestamp()  //time when it was created
        });

        await updateDoc(doc(firebase_db,"folders",currentFolder.id),{
            childFiles:arrayUnion(fileId)
        })

        setName("");
        closeModal();
      } catch(err) {
        
        console.log(err);
      }
        

    
    }
  return (
    <>
        <Modal show={createFile} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>File Name</Form.Label>
                        <Form.Control type="text" required value={name} onChange={e=> setName(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="success" type="submit">Add File</Button>

                </Modal.Footer>
            </Form>
        </Modal>
    </>
    
  )
}
