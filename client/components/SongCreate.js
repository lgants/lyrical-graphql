import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    // NOTE could pass variables to refetchQueries with: refetchQueries: [{ query: query, variables: { ... } }]
    // this mutation returns a promise
    // could use catch to show errors (if any exist)
    // NOTE needed to use refetchQueries as opposed the this.props.data.refetch since the query is not associated with this component (it's on the list component)
    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
`;

// wrapping the component with graphl enables passing query variables (via the mutate object placed on props in the onSubmit handler) to the graphql query/mutation
export default graphql(mutation)(SongCreate);
