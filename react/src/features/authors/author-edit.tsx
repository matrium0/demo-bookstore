import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from 'react-router-dom';
import {Checkbox, Paper, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Author} from '@local/mock-backend/author/Author';
import {createOrUpdateAuthor, findAuthorById} from '@local/mock-backend/author/author-mock-data';
import {DatePicker, DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import LuxonAdapter from "@date-io/luxon";
import GenderDisplay from '../../shared/GenderDisplay';
import ReactQuill from 'react-quill';
import {GlobalMessage} from '../../shared/GlobalMessageContext';
import UploadImageDialog from './upload-image-dialog';


interface AuthorEditState {
  loading: boolean,
  author: Author,
  errors: {
    [key: string]: string | null
  }
  imageUrl?: string,
  showImageUploadDialog: boolean
}

const defaultState: AuthorEditState = {
  loading: true,
  author: {
    firstname: "",
    lastname: "",
    penName: false,
    gender: "MALE",
    placeOfBirth: "",
    birthdate: undefined,
    placeOfDeath: undefined,
  },
  errors: {},
  showImageUploadDialog: false //TODO change back to false
}

const AuthorEdit = () => {
  const [state, setState] = useState<AuthorEditState>(defaultState);
  const {id} = useParams();
  const navigate = useNavigate();
  const [globalMessage_, setGlobalMessage] = useState<GlobalMessage>({message: "", severity: "info"});

  useEffect(() => {
    console.log("useEffect");

    function loadAuthor() {
      if (id === "new") {
        setState({...defaultState, loading: false});
        return;
      }

      const authorId = Number(id);
      console.log("loadAuthor", authorId);
      setState({...defaultState, loading: true, author: {}, errors: {}});

      findAuthorById(authorId).subscribe(
        {
          next: (a: Author) => {
            console.log("findAuthorById SUCCESS", a);
            const imageUrl = URL.createObjectURL(a.foto!);
            setState({loading: false, author: a, errors: {}, showImageUploadDialog: false, imageUrl});
          },
          error: (error: any) => {
            console.log("findAuthorById ERROR", error);
          }
        });
    }

    return loadAuthor();
  }, [id]);

  function handleInputChange(event: SyntheticEvent) {
    //TODO fix textarea bug (input jumps to start on type)
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    changeStateField(target.required, name, value);
  }

  function changeStateField(required: boolean, name: string, value: any) {
    console.log("changeStateField", required, name, value);

    validateFieldAndSetErrorIfNecessary(required, name, value);

    if (name === "dateOfDeath") {
      console.log(name + ": " + value?.toFormat("dd.LL.yyyy"));
    }

    setState({
      ...state, author: {...state.author, [name]: value},
    });

    setTimeout(() =>
      console.log(state), 1000);
  }

  function validateFieldAndSetErrorIfNecessary(required: boolean, name: string, value: any) {
    //TODO vdalidate dates and display error message
    if ((required || name === "birthdate") && !value) {
      state.errors[name] = "Cannot be empty";
      console.log("setting required error message");
    } else {
      state.errors[name] = null;
    }
    setState({
      ...state
    });
  }

  function openFotoUploadDialog() {
    console.log(openFotoUploadDialog);
    setState({...state, showImageUploadDialog: true});
  }

  function navigateBackToAuthorList() {
    console.log("navigateBackToAuthorList");
    navigate("/author");
  }

  function saveAndNavigateToDetail() {
    console.log("saveAndNavigateToDetail", state.author);

    const requiredFields = ["firstname", "lastname", "gender", "birthdate", "placeOfBirth", "foto"];
    for (const key of requiredFields) {
      const isRequiredField = requiredFields.includes(key);
      validateFieldAndSetErrorIfNecessary(isRequiredField, key, state.author[key as keyof Author]);
    }

    const errorPresent = Object.values(state.errors).some(v => v);
    if (!errorPresent) {

      createOrUpdateAuthor(state.author).subscribe(
        {
          next: (a: Author) => {
            console.log("createOrUpdateAuthor SUCCESS", a);
            setGlobalMessage({message: "Author saved", severity: "success"});
            navigate("/author");
          },
          error: (error: any) => {
            console.log("createOrUpdateAuthor ERROR", error);
            setGlobalMessage({message: "Error saving Author", severity: "danger"});
          }
        });
    }
  }

  function handleImageAcceptedInDialog(image: Blob | null) {
    console.log("handleImageAcceptedInDialog", image);
    setState({...state, showImageUploadDialog: false});
  }

  return (
    <LocalizationProvider dateAdapter={LuxonAdapter}>
      <div className="comp-wrapper">
        <Paper elevation={8} className="app-col">
          <div className="p-2 ms-lg-3 title-row d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <h1>
                {!state.author.id && !state.loading && "New Author"}
                {state.author.id && "Author: " + state.author?.firstname + " " + state.author?.lastname}
              </h1>
            </div>
            <button className="btn btn-danger btn-lg me-4">delete</button>
          </div>
          <LoadingIndicatorWrapper loading={state.loading}>
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

                  <DatePicker value={state.author.birthdate ? state.author.birthdate.toJSDate() : null}
                              onChange={(e) => changeStateField(true, "birthdate", e)}
                              mask="dd.LL.yyyy" inputFormat="dd.LL.yyyy"
                              renderInput={(props) => (
                                <TextField {...props} required label="Birthdate"
                                           error={!!state.errors["birthdate"]} helperText={state.errors["birthdate"]}
                                           variant="outlined" className="w-100 mt-4"/>
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
                  <TextField name="placeOfDeath" label="Place of Death" value={state.author.placeOfDeath || ""} onChange={handleInputChange}
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
                </div>

                <div className="col-lg-6 pt-2">
                  <h2 className="mt-lg-0 mb-2">Notes</h2>
                  <ReactQuill value={state.author?.note} onChange={(value) => changeStateField(true, "note", value)}
                              theme="snow" modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{'header': [1, 2, 3, 4, false]}],
                    ]
                  }}
                  />

                  <div className="d-flex align-items-center mt-4 mt-lg-3">
                    <h2 className="me-3">Foto</h2>
                    {/*//TODO conditional show this  message*/}
                    <div className="text-danger fw-bold">You changed the foto - don't forget to save!</div>
                    {/*TODO error handling*/}
                    {/*<app-reactive-validation-display [control]="formGroup?.get('foto')"></app-reactive-validation-display>*/}
                  </div>
                  <div
                    className="foto-wrapper col-sm-7 col-md-6 col-lg-5 col-xl-4 position-relative d-flex flex-column justify-content-center align-items-center">
                    {state.imageUrl && <img src={state?.imageUrl} className="author-foto-img" alt="Foto of the Author"/>}
                    <a onClick={openFotoUploadDialog} className="author-foto-change-link"
                       role="button">{state.author.id ? 'change foto' : 'upload foto'}</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 px-4 px-lg-5 mb-3 d-flex align-items-center justify-content-between ">
                <button onClick={() => navigateBackToAuthorList()} className="btn btn-secondary btn-lg">
                  cancel
                </button>
                <button onClick={() => saveAndNavigateToDetail()} className="btn btn-success btn-lg px-4">
                  save
                </button>
              </div>
            </div>
          </LoadingIndicatorWrapper>
        </Paper>
      </div>
      <UploadImageDialog show={state.showImageUploadDialog} closeImageUploadDialog={(image) => handleImageAcceptedInDialog(image)}/>
    </LocalizationProvider>
  )
}

export default AuthorEdit;
