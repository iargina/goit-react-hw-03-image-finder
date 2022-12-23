import css from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={css.wrap}>
      <div className={css.stage}>
        <div className={css.box}></div>
      </div>
    </div>
  );
};
