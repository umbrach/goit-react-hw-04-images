import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({link, toogleModal}) {
  const handleEscDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        toogleModal();
      }
    },
    [toogleModal]
  );

  const handleBackdropClick = useCallback(
    e => {
      if (e.currentTarget === e.target) {
        toogleModal();
      }
    },
    [toogleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscDown);

    return () => {
      window.removeEventListener('keydown', handleEscDown);
    };
  }, [handleEscDown]);

      return (
        <div className={s.Overlay} onClick={handleBackdropClick}>
          <div className={s.Modal}>
            <img src={link} alt="" />
          </div>
        </div>
      );
}

Modal.propTypes = {
  link: PropTypes.string.isRequired,
  toogleModal: PropTypes.func.isRequired,
};

