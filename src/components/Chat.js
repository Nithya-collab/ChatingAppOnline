import React, { useState, useEffect } from "react";
import Signout from "./Signout";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db , auth} from "../FireBase/firebase";  // Assuming your Firebase configuration is exported from this file
import SendMsgs from "./SendMsgs";
import '../App.css'
const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Create a query to order messages by 'createdAt' and limit to 50 messages
        const q = query(
            collection(db, "messages"),   // Reference to 'messages' collection
            orderBy("createdAt"),         // Order messages by 'createdAt' field
            limit(50)                     // Limit results to 50 messages
        );

        // Listen to snapshot updates in real-time
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,         // Include the document ID
                ...doc.data()        // Spread the document data
            })));
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []); // Empty dependency array to run this effect only once when the component mounts

    return (
        <div>
            <Signout />

            {/* Display the messages */}
            {
                messages.map(({ id, text, photoURL , uid}) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}>
                            <div className="msg-content">
                                <p>{text}</p>
                                <span><img src={photoURL} alt="img" /></span>
                            </div>
                        </div>
                    </div>

                ))
            }
             <SendMsgs />
        </div>
    );
};

export default Chat;
