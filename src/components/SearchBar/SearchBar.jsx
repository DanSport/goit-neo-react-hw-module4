import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Please enter a search term"); 
    }
    onSubmit(inputValue); 
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
