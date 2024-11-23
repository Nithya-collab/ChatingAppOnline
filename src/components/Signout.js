import React from 'react';
import { Button } from '@mui/material';
import { auth } from '../FireBase/firebase';
import "../App.css"
const Signout = () =>{
    return (
        <div className="signout">
            <Button onClick={()=> auth.signOut()} style={{color:"white"}} > Sign Out </Button>
        </div>
    )
}

export default Signout;