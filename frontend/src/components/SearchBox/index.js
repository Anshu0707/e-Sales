import React from "react";
import { TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchBox.css";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
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
    </Box>
  );
};

export default SearchBox;
