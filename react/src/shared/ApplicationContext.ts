import {createContext} from 'react';

const ApplicationContext = createContext<{ user: string | null, setUser: (newUser: string) => {} }>({
  user: null,
  setUser: (newUser: string) => newUser
});
export default ApplicationContext;
