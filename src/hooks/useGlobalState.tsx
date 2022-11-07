import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

import { MongooseAccount } from '../interfaces/Account';
import { MongooseService } from '../interfaces/Service';

export interface GlobalStateInterface {
  account: MongooseAccount | null,
  services: MongooseService[] | null,
  expiresOn: string | null,
  loggedIn: boolean
}

export const mongoApi: string = process.env.NEXT_PUBLIC_mongoapi || 'http://localhost:4000'

const initialState: GlobalStateInterface = {
  account: null,
  services: [],
  expiresOn: null,
  loggedIn: false
}

const GlobalStateContext = createContext({
  state: initialState,
  setState: {} as Dispatch<SetStateAction<GlobalStateInterface>>,
});


const GlobalStateProvider = ({
  children,
  value = initialState,
}: {
  children: React.ReactNode;
  value?: GlobalStateInterface;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  )
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };