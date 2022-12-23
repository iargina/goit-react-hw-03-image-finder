import css from './Modal.module.css';
import { Component } from 'react';
export class Modal extends Component {
  escapeClick = event => {
    if (event.key !== 'Escape') {
      return;
    }
    const { modalClose } = this.props;
    modalClose();
    return;
  };

  componentDidMount = () => {
    document.addEventListener(`keydown`, this.escapeClick);
    return;
  };
  componentWillUnmount = () => {
    document.removeEventListener(`keydown`, this.escapeClick);
    return;
  };
  render() {
    const { largeSrc, modalClose } = this.props;
    return (
      <div className={css.overlay} onClick={modalClose}>
        <div className={css.modal}>
          <img src={largeSrc.src} alt={largeSrc.alt} />
        </div>
      </div>
    );
  }
}
