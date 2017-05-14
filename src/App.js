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

const sql = `*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: some_table
   partitions: NULL
         type: index_merge
possible_keys: a,b
          key: a,b
      key_len: 60,60
          ref: NULL
         rows: 169
     filtered: 100.00
        Extra: Using sort_union(a, b); Using where
1 row in set, 1 warning (0.01 sec)`

class App extends Component {
  state = { sql: sql };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Panel>
            <Bar />
            <Card>
              <Input type='text' multiline label='Result of SQL explain' value={this.state.sql} onChange={this.handleChange.bind(this, 'sql')} />
            </Card>
            <Card>
              <ExplainTable sql={this.state.sql} />
            </Card>
          </Panel>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default App
