import React, { useState, useRef, forwardRef } from "react";
import {
  FormControl,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { getPlacesAutocomplete } from "../functions/utilFunction";
// import { useQuery } from "@tanstack/react-query";
// import useDebounce from "../hooks/useDebounce";
import useOnClickOutside from "../hooks/useOnclickOutside";

const SearchResults = forwardRef<
  HTMLDivElement,
  { data: any[]; handleResultCLick: () => void }
>(function SearchResults({ data, handleResultCLick }, ref) {
  return (
    <div className="places-search-result" aria-label="search results" ref={ref}>
      {data && (
        <List className="py-2">
          {data.map((data) => (
            <ListItem key={data.name} button onClick={handleResultCLick}>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`${data.name?.split(", ").slice(0, 2)?.join("-")}/${
                  data.latitude
                } ${data.longitude}`}
              >
                <ListItemText primary={data.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
});

const SearchBox: React.FC = () => {
  const [search, setSearch] = useState("");
  // const debouncedSearchTerm = useDebounce(search, 300);

  const [showResult, setShowResult] = useState(false);
  const handleResultsHide = () => setShowResult(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handleResultsHide);

  // const placesQuery = useQuery({
  //   queryKey: ["places", debouncedSearchTerm],
  //   queryFn: async () => {
  //     const response = await getPlacesAutocomplete(debouncedSearchTerm);
  //     const placesQueryData = response?.data;

  //     if (placesQueryData.length === 0) {
  //       return;
  //     }

  //     const filteredData = placesQueryData.map((placesObject: any) => ({
  //       name: placesObject?.display_name,
  //       latitude: placesObject?.lat,
  //       longitude: placesObject?.lon,
  //     }));

  //     return filteredData;
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled: !!debouncedSearchTerm,
  // });

  const handleResultCLick = () => setShowResult(false);

  return (
    <div className="places-search">
      {/* input Box */}
      <FormControl
        className="mx-auto places-search-form"
        onSubmit={(e: any) => e.preventDefault()}
      >
        <TextField
          aria-label="Search a place"
          aria-describedby="search-location"
          placeholder="search places ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowResult(true)}
          className="places-search-input rounded-pill "
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <BsSearch />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      {/* Search Results */}
      {showResult && (
        <SearchResults
          // data={placesQuery?.data || []}
          data={[]}
          handleResultCLick={handleResultCLick}
          ref={ref}
        />
      )}
    </div>
  );
};

export default SearchBox;
