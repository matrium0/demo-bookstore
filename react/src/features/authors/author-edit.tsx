import {useParams} from 'react-router-dom';

const AuthorEdit = () => {
  const {id} = useParams();

  return (
      <div>AuthorEdit component with param: {id}</div>
  )

}

export default AuthorEdit;
