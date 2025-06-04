import React, { useState, useEffect } from "react";
import { TextField, List, ListItem, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useDebouncedSearch from "../../hooks/useDebouncedSearch";
import axios from "axios";
import "./SearchBox.css";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSearch = useDebouncedSearch(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearch) {
      axios
        .get(`${API_BASE_URL}/api/search?query=${debouncedSearch}`)
        .then((response) => setSuggestions(response.data))
        .catch((error) => console.error("Error fetching suggestions:", error));
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  return (
    <Box className="search-box">
      <TextField
        type="search"
        variant="outlined"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        InputProps={{
          endAdornment: searchQuery && (
            <IconButton onClick={() => setSearchQuery("")}>
              <CloseIcon />
            </IconButton>
          ),
        }}
      />

      {suggestions.length > 0 && (
        <List className="suggestions-box">
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              button
              onClick={() => setSearchQuery(suggestion)}
            >
              {suggestion}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBox;
