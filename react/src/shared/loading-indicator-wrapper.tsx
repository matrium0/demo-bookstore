import React from 'react';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const LoadingIndicatorWrapper = (props: { loading: boolean, children: React.ReactNode }) => {

  function renderLoadingIndicator() {
    return (
      <div className="overlay-icon-wrapper d-flex align-items-center justify-content-center">
        <FontAwesomeIcon icon={faSpinner} size={'6x'} className="fa-spin"/>
      </div>
    )
  }

  return (
    <div className="rounded">
      <div className={"overlay-base " + (props.loading ? 'overlay-backdrop' : '')}>
        {props.loading ? renderLoadingIndicator() : props.children}
      </div>
    </div>
  );
}

export default LoadingIndicatorWrapper;
