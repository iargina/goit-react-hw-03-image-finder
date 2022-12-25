import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
import { getImagesArr } from 'services/getphoto';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalPages: null,
    loading: false,
    largeImg: null,
  };

  onSubmit = ({ text }) => {
    this.setState({
      query: text,
      images: [],
      page: 1,
      totalPages: 0,
      error: '',
    });
  };
  modalClose = () => {
    this.setState({ largeImg: null });
  };
  onClickImg = ({ large, alt }) => {
    this.setState({ largeImg: { src: large, alt: alt } });
    return;
  };

  getImages = async () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    try {
      const { finalPhotos, total_results } = await getImagesArr(query, page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...finalPhotos],
          totalPages: Math.floor(total_results / 12),
        };
      });
    } catch (error) {
      this.setState({
        error: 'You did something strange. Try again or contact us',
      });
    } finally {
      this.setState({ loading: false });
    }
  };
  componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }
  };
  loadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { page, images, totalPages, loading, largeImg, error } = this.state;
    return (
      <div className={css.mainDiv}>
        <SearchBar onSubmit={this.onSubmit} />

        {images.length > 0 ? (
          <>
            <ImageGallery>
              <ImageGalleryItem
                imagesArr={images}
                onClickImg={this.onClickImg}
              />
            </ImageGallery>
            {totalPages > page && !loading && (
              <Button loadMoreClick={this.loadMoreClick} />
            )}
          </>
        ) : (
          <h3>There is no images here. Type or refine your search query</h3>
        )}
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {largeImg && <Modal largeSrc={largeImg} modalClose={this.modalClose} />}
      </div>
    );
  }
}
