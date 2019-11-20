import React from 'react';

import SearchResult from './SearchResult';
import './UserList.css';

const searchList = props => {
  const results = props.results.map(result => {
    return (
      <SearchResult
        key={result._id}
        userId={props.authUserId}
        _id={result._id}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list">{results}</ul>;
};

export default searchList;
