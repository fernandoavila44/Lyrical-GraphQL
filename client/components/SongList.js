import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

const SongList = () => {

  const { data, loading, error } = useQuery(GET_SONGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.songs.map(({ id, title }) => (
          <li key={id}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SongList;