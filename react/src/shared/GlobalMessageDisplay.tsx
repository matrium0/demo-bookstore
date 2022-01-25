import React, {useContext, useEffect} from 'react';
import './GlobalMessageDisplay.scss'
import {GlobalMessageContext} from './GlobalMessageContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

function GlobalMessageDisplay() {
  const context = useContext(GlobalMessageContext);

  console.log("GlobalMessageDisplay, displaying message", context);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (context.message?.length > 0) {
      timeout = setTimeout(closeMessage, 10000);

      return function cleanup() {
        clearTimeout(timeout);
      };
    }
  });

  //TODO must also be provider??? (to close the message)
  // <GlobalMessageContext.Provider value={{message: null, messageDetail: null, severity: null}}>
  return (
    <div className="global-messages">
      {context.message?.length > 0 &&
        <div role="alert"
             className={"alert alert-" + context.severity + " d-flex justify-content-between align-items-center"}>
          <div className="d-flex flex-column">
            <div>
              {context.message}
            </div>
            <div>
              {context.messageDetail &&
                <div className="small-message">
                  {context.messageDetail}
                </div>
              }
            </div>
          </div>
          <FontAwesomeIcon id="global-message-icon" onClick={() => closeMessage()} icon={faTimes} size={'lg'}
                           className="ms-3 cursor-pointer"/>
        </div>
      }
    </div>
  );

  function closeMessage() {
    context.setMessage({message: "", severity: "info"});
  }

}


export default GlobalMessageDisplay;
