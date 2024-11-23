import React, { useState } from 'react';
import { Input, Button } from "@mui/material";
import { db, auth } from '../FireBase/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";  // Import Firestore functions
import '../App.css';
const SendMsgs = () => {
    const [msg, setMsg] = useState('');

    async function sendMessage(e) {
        e.preventDefault();  // Fix typo (was `e.preventDefautl()`)
        
        const { uid, photoURL } = auth.currentUser;  // Get the current user's uid and photoURL
        
        // Add a new message to the 'messages' collection in Firestore
        await addDoc(collection(db, 'messages'), {
            text: msg,
            photoURL,
            uid,
            createdAt: serverTimestamp()  // Use serverTimestamp for the 'createdAt' field
        });

        setMsg(' ');  // Clear the message input after sending
    }

    return (
        <>
            <form onSubmit={sendMessage}>  {/* Fix action to onSubmit for handling form */}
                <Input 
                    value={msg} 
                    onChange={(e) => setMsg(e.target.value)} 
                    placeholder="Message here ..."
                    className='input'
                />
             
                  <Button type="submit" sx={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>Send</Button>
             
            </form>
        </>
    );
}

export default SendMsgs;
