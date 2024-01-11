import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

import supabase from "../services/supabase";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

const FAKE_USER_AVATAR = "https://i.pravatar.cc/100?u=zz";
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // function login(email, password) {
  //   if (email === FAKE_USER.email && password === FAKE_USER.password)
  //     dispatch({ type: "login", payload: FAKE_USER });
  // }
  async function login(email, password) {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Authentication error:", error.message);
        // Handle authentication error as needed
      } else {
        dispatch({ type: "login", payload: user });
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      // Handle authentication error as needed
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user: { ...user, avatar: FAKE_USER_AVATAR },
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
