import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';


// intialize firebase add info here
var firebaseConfig = {
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
