import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    // this.props.mutate is used to call the mutation
    // this.props.data added automatically from the graphql tag by the react-apollo library
    // the library also includes a refetch function that refetches the data
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ title, id }) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i className="material-icons"
             onClick={() => this.onSongDelete(id)}>
             delete
           </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

// query will be automatically called when the component is rendered; component will rerender when the query response is returned
// const query = gql`
//   {
//     songs {
//       id
//       title
//     }
//   }
// `;

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// graphql is not setup to take multiple queries with multiple mutations; so need to use multiple instances of graphql helper
export default graphql(mutation)(
  graphql(query)(SongList)
);
