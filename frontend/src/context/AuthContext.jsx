import {
  createContext,
  useState
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [usuario, setUsuario] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const login = (data) => {

    localStorage.setItem(
      "token",
      data.token
    );

    setToken(data.token);

    setUsuario(data.usuario);
  };

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};