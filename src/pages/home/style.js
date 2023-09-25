import styled from "styled-components";

// Container
export const Container = styled.div`
  padding: 2rem;
  background-color: #000;
`;

// MovieList
export const MovieList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 4fr));
  gap: 3.5rem;
  margin-top: 1rem;
`;

// Movie
export const Movie = styled.li`

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius:3px;
  transition: transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 4px 4px 0 0;
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1rem;
    display: block;
    text-align: center;
  }
`;

// Btn
export const Btn = styled.button`
  display: block;
  margin: 0 auto;
  padding: 1rem 5rem;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: #41BF78;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #41BF78;
  }
`;
