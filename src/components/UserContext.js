import React, {useContext, useState} from 'react'

export const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

export function UserProvider({children }) {

  const [ user, setUser ] = useState(null)

  const login = (currentUser) => {
    setUser(currentUser)
  }

  const logout = () => {
    setUser(null)
  }

  return <UserContext.Provider value={{ user, login, logout }}>
    {children}
  </UserContext.Provider>
}