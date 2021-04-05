import { useEffect, useState } from 'react';
import { api } from "../services/api";
import { Button } from '../components/Button';
import '../styles/content.scss';
import { IGenreResponse } from '../model/movies';


interface SideBarProps{
  onTransactionMovie: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({onTransactionMovie, selectedGenreId}: SideBarProps) {
  const [genres, setGenres] = useState<IGenreResponse[]>([]);

  useEffect(() => {
    api.get<IGenreResponse[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

 return(  
  <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => onTransactionMovie(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>

 );
}