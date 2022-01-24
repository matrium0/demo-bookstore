import {useParams} from 'react-router-dom';
import {Checkbox, Paper, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import Author from '@local/mock-backend/author/Author';
import {findAuthorById} from '@local/mock-backend/author/author-mock-data';
import {DatePicker, DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import LuxonAdapter from "@date-io/luxon";
import GenderDisplay from '../../shared/GenderDisplay';

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
            next: (a: Author) => {
              console.log("findAuthorById SUCCESS", a);
              if (!a.dateOfDeath) {
                a.dateOfDeath = undefined;
                // a.dateOfDeath = DateTime.local(2000,10,10);
              }
              setState({loading: false, author: a, errors: {}});
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

    if (name === "dateOfDeath") {
      console.log(name + ": " + value?.toFormat("dd.LL.yyyy"));
    }

    setState({
      ...state, author: {...state.author, [name]: value},
    });

    setTimeout(() =>
        console.log(state), 1000);
  }

  return (
      <LocalizationProvider dateAdapter={LuxonAdapter}>
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
                      <>
                        <DatePicker value={state.author.birthdate?.toJSDate()}
                                    onChange={(e) => changeStateField(true, "birthdate", e)}
                                    mask="dd.LL.yyyy" inputFormat="dd.LL.yyyy"
                                    renderInput={(props) => (
                                        <TextField {...props} required
                                                   error={!!state.errors["birthdate"]}
                                                   helperText={state.errors["birthdate"]}
                                                   label="Birthdate" variant="outlined" className="w-100 mt-4"/>
                                    )}>
                        </DatePicker>
                        <TextField name="placeOfBirth" label="Place of birth" value={state.author.placeOfBirth} onChange={handleInputChange}
                                   required error={!!state.errors["placeOfBirth"]} helperText={state.errors["placeOfBirth"]}
                                   variant="outlined" className="w-100 mt-4"/>

                        <DesktopDatePicker value={state.author.dateOfDeath ? state.author.dateOfDeath.toJSDate() : null}
                                           onChange={(e) => changeStateField(false, "dateOfDeath", e)}
                                           mask="dd.LL.yyyy" inputFormat="dd.LL.yyyy"
                                           renderInput={(props) => (
                                               <TextField {...props}
                                                          label="Date of death" variant="outlined" className="w-100 mt-4"/>
                                           )}>
                        </DesktopDatePicker>
                        <TextField name="placeOfDeath" label="Place of Death" value={state.author.placeOfDeath} onChange={handleInputChange}
                                   error={!!state.errors["placeOfDeath"]} helperText={state.errors["placeOfDeath"]}
                                   variant="outlined" className="w-100 mt-4"/>

                        <div className="d-flex align-items-center mt-4">
                          <label className="me-3">Gender</label>
                          <ToggleButtonGroup value={state.author.gender} exclusive
                                             onChange={(_$event, value) => changeStateField(true, "gender", value)}
                          >
                            <ToggleButton value="MALE"><GenderDisplay gender="MALE"/></ToggleButton>
                            <ToggleButton value="FEMALE"><GenderDisplay gender="FEMALE"/></ToggleButton>
                            <ToggleButton value="NON_BINARY"><GenderDisplay gender="NON_BINARY"/></ToggleButton>
                          </ToggleButtonGroup>
                        </div>

                        <div className="d-flex align-items-center mt-2">
                          <label htmlFor="pen-name">Pen name</label>
                          <Checkbox id="pen-name" value={state.author.penName} onChange={handleInputChange}/>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              </form>
            </LoadingIndicatorWrapper>
          </Paper>
        </div>
      </LocalizationProvider>
  )
}

export default AuthorEdit;
