import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Details } from "./Details";
import { ArrowBtn } from "./Btn";
import { searchArrayStyle, buttonRightStyle, buttonLeftStyle } from "./styles";

export const SearchResults = ({ searchData, searchString, setError }) => {
  let searchArr = [];
  const [clickedDetails, setClickedDetails] = useState({ Title: "" });
  const [arrElement, setArrElement] = useState({});
  const [toggleDetails, setToggleDetails] = useState([]);
  let _arrElement = document.getElementById("searchArray1");

  useEffect(() => {
    setArrElement(document.getElementById("searchArray1"));
  }, [_arrElement]);

  const moveArrRight = () => {
    const scrollWidth = arrElement.offsetWidth * 0.8;
    arrElement.scrollLeft += scrollWidth;
  };
  const moveArrLeft = () => {
    const scrollWidth = arrElement.offsetWidth * 0.8;
    arrElement.scrollLeft -= scrollWidth;
  };

  if (searchData.Response === "True") {
    searchArr = searchData.Search;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p style={{}}>Search Results for: {searchString}</p>
      <div id='searchArray1' style={searchArrayStyle}>
        {searchArr.map((data) => (
          //these parentheses are very important make sure you dont use curlies
          <MovieCard
            key={data.imdbID}
            poster={data.Poster}
            title={data.Title}
            type={data.Type}
            data={data}
            setClickedDetails={setClickedDetails}
            clickedDetails={clickedDetails}
            setError={setError}
            setToggleDetails={setToggleDetails}
            toggleDetails={toggleDetails}
          />
        ))}
        <ArrowBtn onClick={moveArrLeft} style={buttonLeftStyle} />
        <ArrowBtn onClick={moveArrRight} style={buttonRightStyle} />
        {/* <button style={buttonLeft} onClick={moveArrLeft}></button> */}
      </div>
      {clickedDetails.Response === "True" && toggleDetails === true ? (
        <Modal>
          <Details data={clickedDetails} setToggleDetails={setToggleDetails} />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};
