import React, {useState} from 'react';
import './App.scss';
import ApplicationContext, {ApplicationContextType} from './shared/ApplicationContext';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './features/home';
import Header from './header/header';
import {GlobalMessage, GlobalMessageContext} from './shared/GlobalMessageContext';
import GlobalMessageDisplay from './shared/GlobalMessageDisplay';
import YourBooksList from './features/yourBooks/yourBooksList';
import Library from './features/library/library';
import AuthorList from './features/authors/author-list';
import AuthorEdit from './features/authors/author-edit';
import AuthorDetail from './features/authors/author-detail';
import BookEdit from './features/library/book-edit';


// @ts-ignore
function ApplicationContextProvider({children}) {
  const defaultApplicationContext = {
    user: "your-username",
    setUser: (newUser: string) => setState({...state, user: newUser}),
    showIntroductionMessage: true,
    disableIntroductionMessage: () => {
      console.log("disableIntroductionMessage called");
      setState({...state, showIntroductionMessage: false})
    }
  };
  const [state, setState] = React.useState<ApplicationContextType>(defaultApplicationContext)
  return <ApplicationContext.Provider value={state}>{children}</ApplicationContext.Provider>
}


function App() {
  console.log("App");

  const [globalMessage, setGlobalMessage] = useState<GlobalMessage>({message: "", severity: "info"});

  function handleSetGlobalMessage(globalMessage: GlobalMessage | null) {
    if (globalMessage) {
      setGlobalMessage(globalMessage);
    } else {
      setGlobalMessage({message: "", severity: "info"});
    }
  }

  return (
    <ApplicationContextProvider>
      <GlobalMessageContext.Provider value={{...globalMessage, setMessage: handleSetGlobalMessage}}>
        <BrowserRouter>
          <Header/>
          <div style={{marginTop: 55}}>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/your-books" element={<YourBooksList/>}/>
              <Route path="/library" element={<Library/>}/>
              <Route path="/library/edit/:id" element={<BookEdit/>}/>
              <Route path="/author">
                <Route path="" element={<AuthorList/>}/>
                <Route path="edit/:id" element={<AuthorEdit/>}/>
                <Route path=":id" element={<AuthorDetail/>}/>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
        <GlobalMessageDisplay/>
      </GlobalMessageContext.Provider>
    </ApplicationContextProvider>
  );
}

export default App;
