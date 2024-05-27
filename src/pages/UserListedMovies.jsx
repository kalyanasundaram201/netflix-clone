import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, retrieveData, deleteDataById } from "../utils/firebase.config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";


export default function UserListedMovies() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [movies, setmovies] = useState([]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  async function retrieveDatafn(){
    const movieslist = await retrieveData();
    setmovies(movieslist);
  }

  useEffect(() => {
    retrieveDatafn()
  }, [ ]);

  // Callback function to handle rerendering after movie deletion
  const handleMovieDeletion = async (id, moviename) => {
    await deleteDataById(id);
    setmovies(movies.filter(movie => movie.id !== id));
  };


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
                onMovieDelete={handleMovieDeletion}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;