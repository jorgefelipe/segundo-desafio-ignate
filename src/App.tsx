import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import './styles/global.scss';
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { IGenreResponse, IMovie } from './model/movies';



export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenreResponse>({} as IGenreResponse);
  
  
  useEffect(() => {
    api.get<IMovie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<IGenreResponse>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onTransactionMovie={handleClickButton} selectedGenreId={selectedGenreId} />
      <Content movies={movies} selectedGenre={selectedGenre}/>
    </div>
  )
}