import React, { Component } from 'react';
import styled from '@emotion/styled';
import Generator from './components/Generator';

class App extends Component {
  render() {
    return (
      <Layout>
        <Generator />
      </Layout>
    );
  }
}

const Layout = styled('main')`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled('header')`
  width: 100%;
`;

export default App;
