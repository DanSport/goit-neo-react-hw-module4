import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "./services/api";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(
          `Unable to fetch images. Please try again later. Error: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      Toaster.error("Please enter a search term");
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    if (selectedImage?.id !== image.id) {
      setSelectedImage(image);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <Toaster position="top-right" />
      <header className="app-header">
        <SearchBar onSubmit={handleSearch} />
      </header>

      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}

      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
