import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';


// intialize firebase
var firebaseConfig = {
  apiKey: "AIzaSyAUMEDobnJRekYsP0RkCqcI-wq0lf9Iut8",
  authDomain: "myinfo-cloud.app.com",
  databaseURL: "https://myinfo-cloud.firebaseio.com",
  projectId: "myinfo-cloud",
  storageBucket: "myinfo-cloud.appspot.com",
  messagingSenderId: "283875174607",
  appId: "1:283875174607:web:b72967e788491f5dee6fba",
  measurementId: "G-7NNY87CHLT"
};
// Initialize Firebase

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    doSendAnEmail = () =>{
      this.auth.sendEmailVerification().then(function() {
      }).catch(function(error) {
        // An error happened.
      });
    } 



// *** User API ***
 
  user = uid => this.db.ref(`Users/${uid}`);


  // ** Call API  **

  calls = uid => this.db.ref(`Users/${uid}/mCallList`);
  messages = uid => this.db.ref(`Users/${uid}/mMessageList`);
  notes = uid => this.db.ref(`Users/${uid}/mNoteList`);
  userInfo = uid => this.db.ref(`Users/${uid}/mUserInfo`);
}
   
export default Firebase;
