import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

import './Modal.scss';

/**
 * Wrap any component with this component to turn it into a modal
 ** You must provide this component the isModalShown prop (it should be in appSlice)
 ** Optional - Provide onCloseModal only if you  want the modal to close when clicked outside
 */
const Modal = (props) => {
  const { children: ModalContent, isModalShown, onCloseModal } = props;

  const closeModalOnEsc = (e) => {
    if (e.keyCode === 27) onCloseModal();
  };

  useEffect(() => {
    if (isModalShown && onCloseModal) {
      // Binding close modal function to Esc key only if function exists
      window.addEventListener('keydown', closeModalOnEsc, false);
    }
    // Removing closeModalOnEsc function after component dismount
    return () => window.removeEventListener('keydown', closeModalOnEsc, false);
  }, [isModalShown]);

  const transition = useTransition(isModalShown, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  return (
    <>
      {ReactDOM.createPortal(
        // Inject modal component to modal-root DIV
        <>
          {transition(
            (style, item) =>
              item && (
                <>
                  <animated.div style={style} className="modal">
                    {ModalContent}
                  </animated.div>
                  <animated.div
                    style={style}
                    className="modal-overlay"
                    onClick={isModalShown ? onCloseModal : null}
                  ></animated.div>
                </>
              )
          )}
        </>,
        document.getElementById('modal-root')
      )}
    </>
  );
};

Modal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  onCloseModal: PropTypes.func,
};

export default Modal;
