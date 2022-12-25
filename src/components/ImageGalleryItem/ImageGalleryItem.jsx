import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imagesArr, onClickImg }) => {
  return imagesArr.map(image => {
    const { id, medium, large, alt } = image;
    return (
      <li
        key={id}
        className={css.galleryItem}
        onClick={() => onClickImg({ large })}
      >
        <img className={css.galleryItemImg} src={medium} alt={alt} />
      </li>
    );
  });
};
