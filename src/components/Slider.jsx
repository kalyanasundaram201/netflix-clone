import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <Container>
      <CardSlider data={getMoviesFromRange(30, 40)} title="Trending Now"/>
      <CardSlider data={getMoviesFromRange(61, 72)} title="Popular on Netflix" />
      <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" />
      <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" />
      <CardSlider data={getMoviesFromRange(55, 65)} title="Blockbuster Movies"/>
      {/* <CardSlider data={getMoviesFromRange(1, 10)} title="Radio" /> */}
    </Container>
  );
}

const Container = styled.div``;