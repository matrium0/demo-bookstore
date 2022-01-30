import React, {memo, SyntheticEvent, useContext, useEffect, useState} from 'react';
import LuxonAdapter from '@date-io/luxon';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import {Autocomplete, Paper, TextField} from '@mui/material';
import LoadingIndicatorWrapper from '../../shared/loading-indicator-wrapper';
import {EnrichedBook} from '../../mock-backend/util/book-utils';
import {useNavigate, useParams} from 'react-router-dom';
import {createOrUpdateBook, findBookById} from '../../mock-backend/book/book-mock-data';
import {Book} from '../../mock-backend/book/Book';
import ReactQuill, {UnprivilegedEditor} from 'react-quill';
import {DateTime} from 'luxon';
import UploadImageDialog from '../authors/upload-image-dialog';
import {GlobalMessageContext} from '../../shared/GlobalMessageContext';
import {findAllAuthors} from '../../mock-backend/author/author-mock-data';
import {Author} from '../../mock-backend/author/Author';

interface BookEditState {
  loading: boolean;
  book: EnrichedBook,
  imageUrl?: string,
  showImageUploadDialog: boolean

  fotoChanged: boolean;

  showDeleteDialog: boolean,
  errors: {
    [key: string]: string | null
  }
  authors: Author[]
}

const BookEdit = () => {
  const globalMessageContext = useContext(GlobalMessageContext);
  const [state, setState] = useState<BookEditState>({
    loading: true,
    book: {},
    showImageUploadDialog: false,
    fotoChanged: false,
    showDeleteDialog: true,
    errors: {},
    authors: []
  });
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect");

    function loadBook() {
      if (id === "new") {
        setState((st => ({...st, loading: false})));
        return;
      }

      const bookId = Number(id);
      console.log("loadBook", bookId);

      findBookById(bookId).subscribe(
        {
          next: (book: Book) => {
            console.log("findBookById SUCCESS", book);
            const imageUrl = URL.createObjectURL(book.image!);

            setState((st => ({...st, loading: false, book, imageUrl})));
          },
          error: (error: any) => {
            console.log("findBookById ERROR", error);
            setState((st => ({...st, loading: false, book: {}, imageUrl: undefined})));
          }
        });
    }

    return loadBook();
  }, [id]);


  useEffect(() => {
    console.log("useEffect");

    function loadAuthors() {
      findAllAuthors().subscribe(
        {
          next: (authors: Author[]) => {
            console.log("findAllAuthors SUCCESS", authors);
            setState((st => ({...st, authors})));
          },
          error: (error: any) => {
            console.log("findAllAuthors ERROR", error);
          }
        });
    }

    return loadAuthors();
  }, []);

  function openDeleteDialog() {
    //TODO open delete dialog
  }

  function handleInputChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    changeStateField(target.required, name as keyof Book, value);
  }

  function handleAuthorSelect(author: Author) {
    console.log("handleAuthorSelect", author);

    if (author) {
      state.errors["author"] = null;
      setState({
        ...state, book: {...state.book, authorId: author.id, authorFullName: author.firstname + " " + author.lastname},
      });
    } else {
      state.errors["author"] = "cannot be empty";
    }
  }


  function changeStateField(required: boolean, name: keyof Book, value: any) {
    console.log("changeStateField", required, name, value);

    validateFieldAndSetErrorIfNecessary(required, name, value);

    setState({
      ...state, book: {...state.book, [name]: value},
    });
  }

  function validateFieldAndSetErrorIfNecessary(required: boolean, name: keyof Book, value: any) {
    console.log("validateFieldAndSetErrorIfNecessary", name, value, state.book[name]);

    if ((required || name === "firstPublished") && !value) {
      state.errors[name] = "Cannot be empty";
    } else if ((name === "firstPublished") && !(value as DateTime).isValid) {
      state.errors[name] = "Date is invalid";
    } else {
      state.errors[name] = null;
    }

    setState({
      ...state
    });
  }

  function onNoteBlur(range: ReactQuill.Range, value: any, editor: UnprivilegedEditor) {
    setState({...state, book: {...state.book, description: editor.getHTML()}});
  }

  function openFotoUploadDialog() {
    console.log("openfotouploadialog");
    setState({...state, showImageUploadDialog: true});
  }

  function navigateBackToBookList() {
    console.log("navigateBackToBookList");
    navigate("/book");
  }

  function saveAndNavigateToDetail() {
    console.log("saveAndNavigateToDetail", state.book);

    const requiredFields = ["title", "author", "firstPublished", "genre", "image"];
    for (const key of requiredFields) {
      const isRequiredField = requiredFields.includes(key);
      validateFieldAndSetErrorIfNecessary(isRequiredField, key as keyof Book, state.book[key as keyof Book]);
    }

    const errorPresent = Object.values(state.errors).some(v => v);
    if (!errorPresent) {

      createOrUpdateBook(state.book).subscribe(
        {
          next: (a: Book) => {
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

  function handleImageAcceptedInDialog(image: Blob | undefined) {
    console.log("handleImageAcceptedInDialog", image);
    if (image) {
      setState((st) => ({
        ...st,
        errors: {...state.errors, "image": null},
        showImageUploadDialog: false,
        book: {...state.book, image: image},
        imageUrl: URL.createObjectURL(image)
      }));
    }
  }

  return (
    <LocalizationProvider dateAdapter={LuxonAdapter}>
      <div className="comp-wrapper">
        <Paper elevation={8} className="app-col">
          <div className="title-row">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <h1>
                {!state.book.id && !state.loading && "New Book"}
                {state.book.id && state.book?.title}
              </h1>
            </div>
            <button onClick={() => openDeleteDialog()} className="btn btn-danger btn-lg me-4">delete</button>
          </div>
          <LoadingIndicatorWrapper loading={state.loading}>
            <div className="pb-3">
              <div className="row mx-3 gx-0 gx-lg-5">
                <div className="col-lg-6 pt-2">
                  <h2 className="mb-2">Personal Data</h2>
                  <TextField name="title" label="Title" value={state.book.title || ''} onChange={handleInputChange}
                             required error={!!state.errors["title"]} helperText={state.errors["title"]}
                             variant="outlined" className="w-100"/>
                  <TextField name="subtitle" label="Subtitle" value={state.book.subtitle || ''} onChange={handleInputChange}
                             error={!!state.errors["subtitle"]} helperText={state.errors["subtitle"]}
                             variant="outlined" className="w-100 mt-4"/>

                  <h1 className="text-danger">TODO fix autocomplete</h1>
                  <h3>{JSON.stringify(state.errors)}</h3>
                  {/*TODO fix autocomplete*/}
                  <Autocomplete
                    options={state.authors} getOptionLabel={(option) => option.firstname! + " " + option.lastname!}
                    id="combo-box-demo" className="w-100"
                    onChange={(event, newValue) => {
                      handleAuthorSelect(newValue!);
                    }}
                    renderInput={(params) =>
                      <TextField {...params} label="Author" className="w-100 mt-4" required
                                 error={!!state.errors["author"]} helperText={state.errors["author"]}
                      />
                    }
                  />

                  <DatePicker value={state.book.firstPublished ? state.book.firstPublished.toJSDate() : null}
                              onChange={(e) => changeStateField(true, "firstPublished", e)}
                              mask="dd.LL.yyyy" inputFormat="dd.LL.yyyy"
                              renderInput={(props) => (
                                <TextField {...props} required label="First published"
                                           error={!!state.errors["firstPublished"]} helperText={state.errors["firstPublished"]}
                                           variant="outlined" className="w-100 mt-4"/>
                              )}>
                  </DatePicker>

                  <TextField name="series" label="Series" value={state.book.series || ''} onChange={handleInputChange}
                             error={!!state.errors["series"]} helperText={state.errors["series"]}
                             variant="outlined" className="w-100 mt-4"/>
                  <TextField name="numberWithinSeries" label="Book in Series" value={state.book.numberWithinSeries || ''}
                             onChange={handleInputChange}
                             error={!!state.errors["numberWithinSeries"]} helperText={state.errors["numberWithinSeries"]}
                             variant="outlined" className="w-100 mt-4"/>

                  <TextField name="genre" label="Genre" value={state.book.genre || ''} onChange={handleInputChange}
                             error={!!state.errors["genre"]} helperText={state.errors["genre"]}
                             variant="outlined" className="w-100 mt-4"/>
                </div>

                <div className="col-lg-6 pt-2">
                  <h2 className="mt-lg-0 mb-2">Description</h2>
                  <ReactQuill value={state.book?.description || ''} onBlur={(range, value, editor) => onNoteBlur(range, value, editor)}
                              theme="snow" modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{'header': [1, 2, 3, 4, false]}],
                    ]
                  }}
                  />

                  <div className="d-flex align-items-center mt-4 mt-lg-3">
                    <h2 className="me-3">Cover</h2>
                    {state.errors["image"] && <div className="error-label">Please upload a foto!</div>}
                    {state.book.id && state.fotoChanged &&
                      <div className="text-danger fw-bold">You changed the cover - don't forget to save!</div>
                    }
                  </div>
                  <div
                    className="foto-wrapper col-sm-7 col-md-6 col-lg-5 col-xl-4 position-relative d-flex flex-column justify-content-center align-items-center">
                    {state.imageUrl && <img src={state?.imageUrl} className="author-foto-img" alt="Foto of the Author"/>}
                    <button type="button" onClick={openFotoUploadDialog} className="author-foto-change-link btn btn-link">
                      {state.book.id ? 'change foto' : 'upload foto'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 px-4 px-lg-5 mb-3 d-flex align-items-center justify-content-between ">
                <button onClick={() => navigateBackToBookList()} className="btn btn-secondary btn-lg">
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
  );
}

export default memo(BookEdit);
