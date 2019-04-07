import React, { Component } from 'react';
import styled from '@emotion/styled';
import Generator from './components/Generator';

class App extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <h1>Radient</h1>          
        </Header>
        <Generator />
      </Layout>
    );
  }
}

const Layout = styled('main')`
  width: 800px;
  margin: 0 auto;
`;

const Header = styled('header')`
  width: 100%;
`;

export default App;
