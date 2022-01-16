// App
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Components
import Close from '@material-ui/icons/Close';

// import Draggable from 'react-draggable';
// import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

// Styles
import './Popup.scss';

const Popup = (props) => {
  const {
    children,
    popupTitle,
    isPopupShown,
    togglePopupFunc,
    cancelLabel,
    acceptLabel,
    cancelFunction,
    acceptFunction,
    isPending,
  } = props;

  const handlePopupClose = () => {
    if (acceptFunction) acceptFunction();
    togglePopupFunc();
  };

  return (
    <>
      {isPopupShown && (
        <>
          {ReactDOM.createPortal(
            // Inject popup component to modal-root DIV
            <>
              <div className="pop-up-modal">
                <div className="pop-up-header">
                  <div className="close-button">{togglePopupFunc && <Close onClick={togglePopupFunc} />}</div>
                  <div className="title">{popupTitle}</div>
                  <div className="center-fix"></div>
                </div>
                <div className="pop-up-body">{children}</div>
                <div className="pop-up-footer">
                  <div className="buttons">
                    {cancelLabel && (
                      <>
                        <button className="button cancel-btn-2" onClick={cancelFunction}>
                          {cancelLabel || 'No'}
                        </button>
                        <button className="button accept-btn" onClick={acceptFunction} disabled={isPending}>
                          {acceptLabel || 'Yes'}
                        </button>
                      </>
                    )}
                    {!cancelLabel && (
                      <button type="button" className="button ok-btn" onClick={handlePopupClose}>
                        Ok
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="popup-overlay" onClick={togglePopupFunc}></div>,
            </>,
            document.getElementById('modal-root')
          )}
        </>
      )}
    </>
  );
};

Popup.propTypes = {
  popupTitle: PropTypes.string,
  children: PropTypes.any,
  togglePopupFunc: PropTypes.any,
  isPopupShown: PropTypes.any,
  cancelLabel: PropTypes.any,
  acceptLabel: PropTypes.any,
  cancelFunction: PropTypes.any,
  acceptFunction: PropTypes.any,
  isPending: PropTypes.any,
};

export default Popup;
