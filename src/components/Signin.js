// import React from "react";
// import { Button } from "@mui/material";
// import {signInWithPopup, GoogleAuthProvider ,FacebookAuthProvider} from "firebase/auth";
// import '../App.css'
// import { auth } from "../FireBase/firebase"; // Ensure the correct path to your firebase.js
// import Header from "./Header";
// //import { FacebookAuthProvider } from "firebase/auth/web-extension";

// const Signin = () => {
//    function GoogleAuthentication() {
//         const provider = new GoogleAuthProvider(); // Create a Google Auth provider instance
//         signInWithPopup(auth, provider)
//           .then((result) => {
//               // This gives you a Google Access Token. You can use it to access Google API.
//               const credential = GoogleAuthProvider.credentialFromResult(result);
//               const token = credential.accessToken;
//               const user = result.user;
//               console.log("User Info: ", user);
//           })
//           .catch((error) => {
//               // Handle Errors here.
//               const errorCode = error.code;
//               const errorMessage = error.message;
//               console.log("Error: ", errorCode, errorMessage);
//           });
//    }
//    function FbAuthentication(){
//     const provider = new FacebookAuthProvider(); // Create a Google Auth provider instance
//     signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a Google Access Token. You can use it to access Google API.
//         const credential = FacebookAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         const user = result.user;
//         console.log("User Info: ", user);
//     })
//     .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log("Error: ", errorCode, errorMessage);
//     });
// }



//    return (
//     <div>
//         <Header />
//     <div class="signin-image">
//         <div className="signin-container">
               
//             <Button onClick={GoogleAuthentication} className="signin"> Sign in with Google </Button>
//             <Button onClick={FbAuthentication}> Sign in with Facebook </Button>
//             <p><i>end-to-end encrypted</i></p>
//         </div>
//     </div>
//     </div>
//    );
// };

// export default Signin;








import React from "react";
import { Button } from "@mui/material";
import { 
    getAuth, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithPopup, 
    fetchSignInMethodsForEmail 
} from 'firebase/auth';

import '../App.css';
import { auth } from "../FireBase/firebase"; // Ensure the correct path to your firebase.js
import Header from "./Header";

const Signin = () => {
   function GoogleAuthentication() {
        const provider = new GoogleAuthProvider(); 
        signInWithPopup(auth, provider)
          .then((result) => {
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              const user = result.user;
              console.log("User Info: ", user);
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("Error: ", errorCode, errorMessage);
          });
   }

   function FbAuthentication() {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)  // Change to whichever provider is relevant here
    .then((result) => {
        // User successfully signed in
        console.log("Signed in successfully:", result.user);
    })
    .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            const pendingCred = error.credential;
            const email = error.customData.email;

            // Fetch sign-in methods for this email
            fetchSignInMethodsForEmail(auth, email).then((methods) => {
                if (methods.includes('google.com')) {
                    // Sign in with Google to link accounts
                    const googleProvider = new GoogleAuthProvider();
                    signInWithPopup(auth, googleProvider)
                        .then((googleResult) => {
                            // Link the Facebook credential to the Google account
                            return googleResult.user.linkWithCredential(pendingCred);
                        })
                        .then(() => {
                            console.log("Account linked successfully.");
                        })
                        .catch((linkError) => {
                            console.error("Error linking accounts:", linkError);
                        });
                } else {
                    console.log("User has signed in with a different provider:", methods);
                }
            });
        } else {
            console.error("Error during sign-in:", error);
        }
    });

    }

   return (
    <div>
        <Header />
        <div className="signin-image">
            <div className="signin-container">
                <Button onClick={GoogleAuthentication} className="signin"> Sign in with Google </Button>
                <Button onClick={FbAuthentication}> Sign in with Facebook </Button>
                <p><i>end-to-end encrypted</i></p>
            </div>
        </div>
    </div>
   );
};

export default Signin;
