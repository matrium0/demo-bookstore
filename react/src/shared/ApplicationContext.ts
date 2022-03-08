import {createContext} from 'react';

export interface ApplicationContextType {
  user: string | null,
  showIntroductionMessage: boolean,
  disableIntroductionMessage: () => void,
  setUser: (newUser: string) => void
}

const ApplicationContext = createContext<ApplicationContextType>({
  user: null,
  showIntroductionMessage: true,
  disableIntroductionMessage: () => {
  },
  setUser: (newUser: string) => newUser
});
export default ApplicationContext;
