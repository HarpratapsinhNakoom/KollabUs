import React,{useState} from 'react'
import{Button,Modal,Form} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faFilePlus } from '@fortawesome/free-solid-svg-icons'
import {setDoc,serverTimestamp, arrayUnion, doc, updateDoc} from "firebase/firestore"
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../../context/AuthContext';
import { firebase_db } from '../../../firebase'
import {v4 as uuidV4} from "uuid"



export default function AddFileButton({currentFolder}) {
    const [open,setOpen]=useState(false);
    const[name,setName]=useState('');
    const {currentUser}=useAuth();

    function openModal(){
        setOpen(true)
    }
    function closeModal(){
        setOpen(false)
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
        <Button onClick={openModal} variant="outline-success" size="sm">
            <FontAwesomeIcon icon="fa-thin fa-file-arrow-up" />
        </Button> 
        <Modal show={open} onHide={closeModal}>
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
