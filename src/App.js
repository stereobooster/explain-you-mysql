import React, { Component } from 'react'

import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './toolbox/theme.js'
import './toolbox/theme.css'

import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import Input from 'react-toolbox/lib/input/Input';
import Card from 'react-toolbox/lib/card/Card';

import Bar from './components/Bar'
import ExplainTable from './components/ExplainTable'
import ExampleQueriesBar from './components/ExampleQueriesBar'

class App extends Component {
  state = { sql: '' };

  handleChange = (value) => {
    this.setState({...this.state, sql: value});
  };

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Panel>
            <Bar />
            <Card>
              <ExampleQueriesBar onChange={this.handleChange.bind(this)} />
              <ExplainTable sql={this.state.sql} />
              <Input type='text' multiline label='Result of SQL explain' value={this.state.sql} onChange={this.handleChange.bind(this)} />
            </Card>
          </Panel>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default App
