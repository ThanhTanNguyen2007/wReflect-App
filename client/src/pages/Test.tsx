import React from 'react';
import configureStore from '../store/configureStore';

import * as actions from '../store/workspaces';
import * as projectActions from '../store/Projects';

const store = configureStore();

const Test = (): JSX.Element => {
  store.dispatch(
    projectActions.projectAdded({
      name: 'hello',
      description: 'test',
      ownerEmail: 'test',
      members: [],
      startDate: new Date(),
      endDate: new Date(),
      status: 'Done',
    }),
  );

  return (
    <>
      <div> Hello</div>
    </>
  );
};

export default Test;
