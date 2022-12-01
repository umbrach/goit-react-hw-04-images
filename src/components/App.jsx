import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import {fetchImg} from '../services/pixabay-api';

class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    largeImageURL: '',
    showModal: false,
    isLoading: false,
    msg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, currentPage } = this.state;
    this.setState({ isLoading: true });

   fetchImg(query, currentPage)
      .then(data => {
        if (data.length > 0) {
          this.setState(({ images, currentPage }) => ({
            images: [...images, ...data],
            currentPage: currentPage + 1,
          }));
          currentPage >= 2 &&
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
        } else {
          this.setState({
            msg: 'Enter the correct request',
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  hendleChangeQuery = currentValue => {
    this.setState({
      query: currentValue,
      images: [],
      currentPage: 1,
      msg: '',
    });
  };

  getlargeImageURL = link => {
    this.setState({
      largeImageURL: link,
    });
  };

  toogleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { isLoading, images, showModal, largeImageURL, msg } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.hendleChangeQuery} />
        <ImageGallery
          toogleModal={this.toogleModal}
          images={images}
          onClick={this.getlargeImageURL}
          errorMsg={msg}
        />

        {!isLoading && images.length >= 12 && (
          <Button onClick={this.fetchImages} />
        )}
        {isLoading && <Loader />}

        {showModal && (
          <Modal link={largeImageURL} toogleModal={this.toogleModal} />
        )}
      </div>
    );
  }
}

export default App;