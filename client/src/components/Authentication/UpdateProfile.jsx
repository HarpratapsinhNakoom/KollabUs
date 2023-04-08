import React,{useRef,useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'
import {Link, useNavigate} from "react-router-dom"
import CenteredContainer from './CenteredContainer'



const UpdateProfile = () => {

  const emailRef=useRef()
  const passwordRef=useRef()
  const passwordConfirmRef=useRef()
  const {currentUser,updatePassword,updateEmail}=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()


  function handleSubmit(e){
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Password do not match')
    }


    const promises=[]
    setLoading(true);
    setError('')
    if(emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
    
    }

    Promise.all(promises).then(()=>{
        navigate("/user")
    }).catch(()=>{
        setError("failed update account")
    }).finally(()=>{
        setLoading(false);
    })
    
    

  }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
            </Form.Group>

            <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef}  placeholder='Leave blank to keep the same'></Form.Control>
            </Form.Group>

            <Form.Group id="password-conform">
                <Form.Label>Password Conformation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef}  placeholder='Leave blank to keep the same'></Form.Control>
            </Form.Group>

            <Button disabled={loading} type="submit" className='w-100 mt-2'>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" > <Link to="/user">Cancel</Link></div>
    </CenteredContainer>
  )
}

export default UpdateProfile
