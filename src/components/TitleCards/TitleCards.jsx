import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'



const TitleCards = ({ title, category }) => {

  const [apiData, setApidata] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTE4MzI0MDk0MmE0M2ZmYmU1MGFjYjczNmM2MmI5MSIsIm5iZiI6MTc3Mzk4MDc0NC42NjQsInN1YiI6IjY5YmNjYzQ4YjRlZjg5NGI1OGVhMzY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRXhfc_NIEeS9Ejn2tOGWfNot_clyObzY_OtlaK7yGQ'
    }
  };



  const handleWheel = (event) => {
    event.preventDefault
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}`, options)
      .then(res => res.json())
      .then(res => setApidata(res.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handleWheel)

  }, [])
  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
