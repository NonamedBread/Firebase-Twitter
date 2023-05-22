import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const auth = authService;
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
