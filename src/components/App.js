import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth = authService.getAuth();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        // setUserObj({
        //   displayName: user.displayName,
        //   uid: user.uid,
        //   updateProfile: (args) => user.updateProfile(args),
        // });
      } else {
        setUserObj(null);
      }

      setInit(true);
    });
  }, []);
  const refreshUser = async () => {
    const user = auth.currentUser;
    setUserObj(Object.assign({}, user));
    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid,
    //   //updateProfile: (args) => user.authService.updateProfile(args),
    // });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing...."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Twitter</footer> */}
    </>
  );
}

export default App;
