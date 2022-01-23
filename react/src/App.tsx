import React, {useState} from 'react';
import './App.scss';
import ApplicationContext from './shared/ApplicationContext';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TicTacToe from './ticTacToe/ticTacToe';
import Home from './features/home';
import Header from './header/header';
import {GlobalMessage, GlobalMessageContext} from './shared/GlobalMessageContext';
import GlobalMessageDisplay from './shared/GlobalMessageDisplay';
import YourBooks from './features/yourBooks/yourBooksList';
import Library from './features/library/library';
import AuthorList from './features/authors/author-list';
import AuthorEdit from './features/authors/author-edit';

function App() {
  console.log("App");

  const [globalMessage, setGlobalMessage] = useState<GlobalMessage>({
    message: "",
    severity: "info"
  });

  function handleSetGlobalMessage(globalMessage: GlobalMessage | null) {
    if (globalMessage) {
      setGlobalMessage(globalMessage);
    } else {
      setGlobalMessage({message: "", severity: "info"});
    }
  }

  return (
      <ApplicationContext.Provider value={{user: "your-username", setUser: (newUser: string) => newUser}}>
        <GlobalMessageContext.Provider value={{...globalMessage, setMessage: handleSetGlobalMessage}}>
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/your-books" element={<YourBooks/>}/>
              <Route path="/library" element={<Library/>}/>
              <Route path="/authors">
                <Route path="" element={<AuthorList/>}/>
                <Route path="edit/:id" element={<AuthorEdit/>}/>
              </Route>
              <Route path="/ticTacToe" element={<TicTacToe/>}/>
            </Routes>
          </BrowserRouter>
          <GlobalMessageDisplay/>
        </GlobalMessageContext.Provider>
      </ApplicationContext.Provider>
  );
}

export default App;
