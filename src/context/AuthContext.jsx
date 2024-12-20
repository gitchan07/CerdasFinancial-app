import { createContext, useContext } from "react";

/**
 * @var import {  } from "module";
 */
export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);
