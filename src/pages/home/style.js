import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  background-color: #000;
`;

export const MovieList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  background-color:#000;
`;

export const Movie = styled.li`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 10px 10px 0 0;
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1rem;
    display: block;
    text-align: center;
  }
`;

export const Btn = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 15px;
  color: #ffffff;
  background-color: #007bff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
