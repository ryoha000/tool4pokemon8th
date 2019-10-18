import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ParentTabs from './components/ParentTabs'
import {getPokemons, insertPokemonDatas, getWazas, insertWazaDatas} from '../src/components/shared_js'
import { PokemonData, waza } from './components/shared'
import { CircularProgress } from '@material-ui/core';

interface Props{
}
  
interface State{
  initialized1: boolean;
  initialized2: boolean;
  pokemons: PokemonData[];
  wazas: waza[];
}

export default class App extends React.Component<Props,State>{
  constructor(props: any) {
    super(props);
    this.state = {
      initialized1: false,
      initialized2: false,
      pokemons: [],
      wazas: []
    };
  }
  componentDidMount() {
    if (!this.state.initialized1) {
      getPokemons()
        .then(res => {
          let result: any = res
          if (result.length === 0) {
            insertPokemonDatas()
              .then(() => {
                getPokemons()
                  .then(res => {
                    this.setState({ initialized1: true, pokemons: res})
                  })
                  .catch(e => { alert("エラーが発生しました。再起動してみてください。") })
              })
              .catch(e => { alert("エラーが発生しました。再起動してみてください。") })
          }
          this.setState({ initialized1: true, pokemons: res})
        })
        .catch(e => { alert("エラーが発生しました。再起動してみてください。") })
    }
    if (!this.state.initialized2){
      getWazas()
        .then(res => {
          if (res.length === 0) {
            insertWazaDatas()
            .then(() => {
              getWazas()
                .then(res => {
                  this.setState({ initialized2: true, wazas: res })
                })
                .catch(e => { alert("エラーが発生しました。再起動してみてください。") })
            })
            .catch(e => { alert("エラーが発生しました。再起動してみてください。") })
          }
          this.setState({ initialized2: true, wazas: res })
        })
        // .catch(e => { alert("エラーが発生しました。再起動してみてください。") })
    }
  }
  render() {
    if (!this.state.initialized1 && this.state.initialized2) {
      return (
        <div className="App">
          <CircularProgress/>
        </div>
      )
    } else {
      return (
        <div className="App">
          <ParentTabs pokemons={this.state.pokemons} wazas={this.state.wazas}/>
        </div>
      )
    }
  } 
}
