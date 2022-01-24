import {useParams} from 'react-router-dom';
import {Paper, TextField} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import Author from '@local/mock-backend/author/Author';
import {findAuthorById} from '@local/mock-backend/author/author-mock-data';
import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import LuxonAdapter from "@date-io/luxon";

interface AuthorEditState {
  loading: boolean,
  author: Author,
  errors: {
    [key: string]: string | null
  }
}

const AuthorEdit = () => {
  const [state, setState] = useState<AuthorEditState>({loading: true, author: {}, errors: {}});
  const {id} = useParams();

  useEffect(() => {
    function loadAuthor() {
      const authorId = Number(id);
      console.log("loadAuthor", authorId);
      setState({loading: true, author: {}, errors: {}});

      findAuthorById(authorId).subscribe(
          {
            next: (results: Author) => {
              console.log("findAuthorById SUCCESS", results);
              setState({loading: false, author: results, errors: {}});
            },
            error: (error: any) => {
              console.log("findAuthorById ERROR", error);
            }
          });
    }

    return loadAuthor();
  }, [id]);

  function handleInputChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    changeStateField(target.required, name, value);
  }

  function changeStateField(required: boolean, name: string, value: any) {
    console.log("changeStateField", name, value);

    if ((required || name === "birthdate") && !value) {
      state.errors[name] = "Cannot be empty";
      console.log("setting required error message");
    } else {
      state.errors[name] = null;
    }

    setState({
      ...state, author: {...state.author, [name]: value},
    });

    setTimeout(() =>
        console.log(state), 500);
  }

  return (
      <div className="comp-wrapper">
        <Paper elevation={8} className="app-col">
          <div className="p-2 ms-lg-3 title-row d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex align-items-center">
                <h1>Author: {state.author?.firstname} {state.author?.lastname}</h1>
              </div>
            </div>
            <button className="btn btn-danger btn-lg me-4">delete</button>
          </div>
          <LoadingIndicatorWrapper loading={state.loading}>
            <form>
              <div className="pb-3" style={{borderTop: "2px solid gray"}}>
                <div className="row mx-3 gx-0 gx-lg-5">
                  <div className="col-lg-6 pt-2">
                    <h2 className="mb-2">Personal Data</h2>
                    <TextField name="firstname" label="Firstname" value={state.author.firstname} onChange={handleInputChange}
                               required error={!!state.errors["firstname"]} helperText={state.errors["firstname"]}
                               variant="outlined" className="w-100"/>
                    <TextField name="lastname" label="Lastname" value={state.author.lastname} onChange={handleInputChange}
                               required error={!!state.errors["lastname"]} helperText={state.errors["lastname"]}
                               variant="outlined" className="w-100 mt-4"/>
                    <LocalizationProvider dateAdapter={LuxonAdapter}>
                      <DesktopDatePicker value={state.author.birthdate?.toJSDate()} onChange={(e) => changeStateField(true, "birthdate", e)}
                                         mask="dd.LL.yyyy" inputFormat="dd.LL.yyyy"
                                         renderInput={(props) => (
                                             <TextField {...props} required
                                                        error={!!state.errors["birthdate"]}
                                                        helperText={state.errors["birthdate"]}
                                                        label="Birthdate" variant="outlined" className="w-100 mt-4"/>
                                         )}>
                      </DesktopDatePicker>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            </form>
          </LoadingIndicatorWrapper>
        </Paper>
      </div>
  )
}

export default AuthorEdit;
