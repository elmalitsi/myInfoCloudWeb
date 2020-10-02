import React from 'react';


/**
 * The createContext() function essentially creates two components
 * FirebaseContext.Provider -> provides Firebase instance once at the top-level component
 * FirebaseContext.Consumer -> retrieve Firebase instance
 */
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);
 
export default FirebaseContext;