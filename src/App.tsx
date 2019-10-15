import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ParentTabs from './components/ParentTabs'
import {getPokemonByName, insertDatas} from '../src/components/shared_js'
import { CircularProgress } from '@material-ui/core';

interface Props{
}
  
interface State{
  initialized: boolean;
}

export default class App extends React.Component<Props,State>{
  constructor(props: any) {
    super(props);
    this.state = {
      initialized: false,
    };
  }
  componentDidMount() {
    if (!this.state.initialized) {
      getPokemonByName("ガブリアス")
        .then(res => {
          let result: any = res
          if (!result) {
            insertDatas()
              .then(() => {
                this.setState({ initialized: true})
              })
          }
          this.setState({ initialized: true})
        })
    }
  }
  render() {
    if (!this.state.initialized) {
      return (
        <div className="App">
          <CircularProgress/>
        </div>
      )
    } else {
      return (
        <div className="App">
          <ParentTabs />
        </div>
      )
    }
  } 
}
