import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Calculate from './Calculate'
import PokemonInBattle, { PokemonInBattleState } from './PokemonInBattle'
import { PokemonData, waza, Status } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import PokemonStatus from './PokemonStatus'
import PokemonMove from './PokemonMove'
import ClearIcon from '@material-ui/icons/Clear';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';

interface Props{
  wazas: waza[];
  pokemons: PokemonData[];
}

interface State{
  party: PokemonData[]
  selectedPokemon?: PokemonData
}

export default class Register extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      party: [{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"}],
    };
  }
  handleSelect = (pokemon: PokemonData) => {
    this.setState({ selectedPokemon: pokemon })
    console.log(pokemon)
  }
  handleChangeInputPokemon = (pokemon: PokemonData) => {
    let newArray: PokemonData[] = this.state.party
    let done: boolean = false
    for (let index = 0; index < newArray.length; index++) {
      const element = newArray[index];
      if (!done && element.number === "000") {
        done = true
        newArray[index] = pokemon
      }
      if (!done && index === 5){
        done = true
        newArray.shift()
        newArray[5] = pokemon
      }
    }
    this.setState({ party: newArray })
    console.log(this.state.party)
  }
  clickClear = (pokemon: PokemonData) => {
    let num: number = -1
    const target: PokemonData | undefined = this.state.party.find((element: PokemonData, i: number) => {
      if (pokemon.name === element.name) {
        num = i
      }
      return element.name === pokemon.name
    })
    let newArray: PokemonData[] = this.state.party
    if (num !== -1) {
      newArray.splice(num, 1)
      newArray.push({number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"})
      this.setState({ party: newArray })
    }
  }
  render() {
    return (
      <Grid container className="root" spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
              <Grid item>
                <Paper style={{ height: 430,width: 300 }}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  style={{flexGrow: 1}}
                >
                  <InputAutoPokemon handleInput={this.handleChangeInputPokemon} />
                  {this.state.party.map((element: PokemonData, i: number, array: PokemonData[]) => {
                    return (
                      <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleSelect(element);}} key={i} disabled={element.number === "000"} selected={element === this.state.selectedPokemon}>
                        <ListItemAvatar>
                          <PokemonIcon number={element.number}/>
                        </ListItemAvatar>
                        <ListItemText primary={element.name} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={(event: React.MouseEvent<HTMLElement>) => {this.clickClear(element)}} >
                            <ClearIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
                </List>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                <PokemonStatus color="primary" pokemon={this.state.selectedPokemon} wazas={this.props.wazas} pokemons={this.props.pokemons}/>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300}}>
                <PokemonMove color="primary" pokemon={this.state.selectedPokemon} wazas={this.props.wazas} pokemons={this.props.pokemons}/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
