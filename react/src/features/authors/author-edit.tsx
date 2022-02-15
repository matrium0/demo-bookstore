import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from 'react-router-dom';
import {Checkbox, Paper, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {DatePicker, DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import LuxonAdapter from "@date-io/luxon";
import GenderDisplay from '../../shared/GenderDisplay';
import ReactQuill, {UnprivilegedEditor} from 'react-quill';
import {GlobalMessageContext} from '../../shared/GlobalMessageContext';
import UploadImageDialog from './upload-image-dialog';
import {DateTime} from 'luxon';
import ConfirmationDialog from '../../shared/confirmation-dialog';
import {Author} from '../../mock-backend/author/Author';
import {createOrUpdateAuthor, deleteAuthor, findAuthorById} from '../../mock-backend/author/author-mock-data';


interface AuthorEditState {  // could be split up into multiple states - recommendation is to group things if they tend to change together
  loading: boolean,
  author: Author,
  errors: {
    [key: string]: string | null
  }
  imageUrl?: string,
  fotoChanged: boolean
  showImageUploadDialog: boolean,
  showDeleteConfirmationDialog: boolean
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
    fullRealName: undefined
  },
  errors: {},
  showImageUploadDialog: false,
  fotoChanged: false,
  showDeleteConfirmationDialog: false
}

const AuthorEdit = () => {
  const [state, setState] = useState<AuthorEditState>(defaultState);
  const {id} = useParams();
  const navigate = useNavigate();
  const globalMessageContext = useContext(GlobalMessageContext);

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
            setState({
              loading: false, author: a, errors: {}, showImageUploadDialog: false,
              showDeleteConfirmationDialog: false, fotoChanged: false, imageUrl
            });
          },
          error: (error: any) => {
            console.log("findAuthorById ERROR", error);
          }
        });
    }

    return loadAuthor();
  }, [id]);

  function handlePenNameChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.checked;
    changeStateField(target.required, "penName", value);
  }

  function handleInputChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    changeStateField(target.required, name as keyof Author, value);
  }

  function changeStateField(required: boolean, name: keyof Author, value: any) {
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

  function validateFieldAndSetErrorIfNecessary(required: boolean, name: keyof Author, value: any) {
    console.log("validateFieldAndSetErrorIfNecessary", name, value, state.author[name]);

    if ((required || name === "birthdate") && !value) {
      state.errors[name] = "Cannot be empty";
    } else if ((name === "birthdate" || name === "dateOfDeath") && !(value as DateTime).isValid) {
      state.errors[name] = "Date is invalid";
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

  function navigateBackToDetail() {
    console.log("navigateBackToDetail");
    navigate("/author/" + state.author.id);
  }

  function saveAndNavigateToDetail() {
    console.log("saveAndNavigateToDetail", state.author);

    const requiredFields = ["firstname", "lastname", "gender", "birthdate", "placeOfBirth", "foto"];
    for (const key of requiredFields) {
      const isRequiredField = requiredFields.includes(key);
      validateFieldAndSetErrorIfNecessary(isRequiredField, key as keyof Author, state.author[key as keyof Author]);
    }

    const errorPresent = Object.values(state.errors).some(v => v);
    if (!errorPresent) {

      createOrUpdateAuthor(state.author).subscribe(
        {
          next: (a: Author) => {
            console.log("createOrUpdateAuthor SUCCESS", a);
            globalMessageContext.setMessage({message: "Author saved", severity: "success"});
            navigate("/author");
          },
          error: (error: any) => {
            console.log("createOrUpdateAuthor ERROR", error);
            globalMessageContext.setMessage({message: "Error saving Author", severity: "danger"});
          }
        });
    }
  }

  function handleImageAcceptedInDialog(image?: Blob) {
    console.log("handleImageAcceptedInDialog", image);
    setState({
      ...state,
      showImageUploadDialog: false,
      fotoChanged: true,
      author: {...state.author, foto: image},
      imageUrl: image ? URL.createObjectURL(image) : undefined
    });
  }

  function onNoteBlur(range: ReactQuill.Range, value: any, editor: UnprivilegedEditor) {
    setState({...state, author: {...state.author, note: editor.getHTML()}});
  }

  function openDeleteDialog() {
    globalMessageContext.setMessage({message: "Sorry, this operation is not supported yet", severity: "info"});
  }

  function handleDismissDialog() {
    setState({
      ...state, showDeleteConfirmationDialog: false
    });
  }

  function deleteAuth() {
    console.log("deleteAuth");
    deleteAuthor(Number(id)).subscribe(
      {
        next: () => {
          console.log("deleteAuth SUCCESS");
          globalMessageContext.setMessage({
            message: "Successfully deleted " + state.author.firstname + " " + state.author.lastname,
            severity: "info"
          });
          navigate("/author");
        },
        error: (error: any) => {
          console.log("deleteAuth ERROR", error);
          globalMessageContext.setMessage({message: "Error deleting Author", severity: "danger"});
        }
      });
  }

  return (
    <LocalizationProvider dateAdapter={LuxonAdapter}>
      <div className="comp-wrapper">
        <Paper elevation={8} className="app-col">
          <div className="title-row-wrapper">
            <div className="title-row">
              <h1>
                {!state.author.id && !state.loading && "New Author"}
                {state.author.id && state.author?.firstname + " " + state.author?.lastname}
              </h1>
              <button onClick={() => openDeleteDialog()} className="btn btn-danger btn-lg me-4">delete</button>
            </div>
          </div>
          <LoadingIndicatorWrapper loading={state.loading}>
            <div className="pb-3">
              <div className="row mx-3 gx-0 gx-lg-5">
                <div className="col-lg-6 pt-2">
                  <h2 className="mb-2">General Data</h2>
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
                                       <TextField {...props} error={!!state.errors["dateOfDeath"]} helperText={state.errors["dateOfDeath"]}
                                                  label="Date of death" variant="outlined" className="w-100 mt-4"/>
                                     )}>
                  </DesktopDatePicker>
                  <TextField name="placeOfDeath" label="Place of Death" value={state.author.placeOfDeath || ""} onChange={handleInputChange}
                             error={!!state.errors["placeOfDeath"]} helperText={state.errors["placeOfDeath"]}
                             variant="outlined" className="w-100 mt-4"/>

                  <TextField name="genre" label="Genre" value={state.author.genre} onChange={handleInputChange}
                             error={!!state.errors["genre"]} helperText={state.errors["genre"]}
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
                    <Checkbox id="pen-name" checked={state.author.penName} onChange={handlePenNameChange}/>
                  </div>
                  {state.author.penName &&
                    <TextField name="fullRealName" label="Real name" value={state.author.fullRealName || ""} onChange={handleInputChange}
                               error={!!state.errors["fullRealName"]} helperText={state.errors["fullRealName"]}
                               variant="outlined" className="w-100 mt-2"/>
                  }
                </div>

                <div className="col-lg-6 pt-2">
                  <h2 className="mt-lg-0 mb-2">Notes</h2>
                  <ReactQuill value={state.author?.note} onBlur={(range, value, editor) => onNoteBlur(range, value, editor)}
                              theme="snow" modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{'header': [1, 2, 3, 4, false]}],
                    ]
                  }}
                  />

                  <div className="d-flex align-items-center mt-4 mt-lg-3">
                    <h2 className="me-3">Foto</h2>
                    {state.errors["foto"] && <div className="error-label">Please upload a foto!</div>}
                    {state.author.id && state.fotoChanged &&
                      <div className="text-danger fw-bold">You changed the foto - don't forget to save!</div>
                    }
                  </div>
                  <div
                    className="foto-wrapper col-sm-7 col-md-6 col-lg-5 col-xl-4 position-relative d-flex flex-column justify-content-center align-items-center">
                    {state.imageUrl && <img src={state?.imageUrl} className="author-foto-img" alt="Foto of the Author"/>}
                    <button type="button" onClick={openFotoUploadDialog} className="author-foto-change-link btn btn-link">
                      {state.author.id ? 'change foto' : 'upload foto'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 px-4 px-lg-5 mb-3 d-flex align-items-center justify-content-between ">
                <button onClick={() => navigateBackToDetail()} className="btn btn-secondary btn-lg">
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
      <ConfirmationDialog show={state.showDeleteConfirmationDialog} title="Delete Author" confirmButtonType="danger"
                          message="Are you sure that you want to delete the author?" confirmButtonText="Delete" cancelButtonText="Cancel"
                          dismissDialog={() => handleDismissDialog()} actionAfterConfirm={() => deleteAuth()}
      />
    </LocalizationProvider>
  )
}

export default AuthorEdit;
