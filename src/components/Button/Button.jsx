import css from './Button.module.css';

export const Button = ({ loadMoreClick }) => {
  return (
    <button className={css.loadButton} type="button" onClick={loadMoreClick}>
      Load more
    </button>
  );
};
