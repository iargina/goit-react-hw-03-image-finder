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

  onSubmit = ev => {
    this.setState({
      query: ev.text,
      images: [],
      page: 1,
      totalPages: 0,
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
      const { photos, total_results } = await getImagesArr(query, page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...photos],
          totalPages: Math.floor(total_results / 12),
        };
      });
    } catch (error) {
      console.log(error);
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
    return (
      <div className={css.mainDiv}>
        <SearchBar onSubmit={this.onSubmit} />

        {this.state.images.length > 0 && (
          <>
            <ImageGallery>
              <ImageGalleryItem
                imagesArr={this.state.images}
                onClickImg={this.onClickImg}
              />
            </ImageGallery>
            {this.state.totalPages > this.state.page && !this.state.loading && (
              <Button loadMoreClick={this.loadMoreClick} />
            )}
          </>
        )}
        {this.state.loading && <Loader />}
        {this.state.largeImg && (
          <Modal largeSrc={this.state.largeImg} modalClose={this.modalClose} />
        )}
      </div>
    );
  }
}
