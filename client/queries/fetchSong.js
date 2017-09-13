import gql from 'graphql-tag';

// the '!' stipulates that it is required
export default gql`
query SongQuery($id: ID!) {
  song(id: $id) {
    id
    title
    lyrics {
      id
      content
      likes
    }
  }
}`
