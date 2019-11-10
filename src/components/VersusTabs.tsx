/* eslint-disable import/first */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';;
import Calculate from './Calculate'
import PokemonInBattle from './PokemonInBattle'
import { PokemonData, waza, Status } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import ClearIcon from '@material-ui/icons/Clear';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';

interface Props{
  wazas: waza[];
  pokemons: PokemonData[];
}

interface State{
  openMy: boolean;
  openOppo: boolean;
  myParty: PokemonData[]
  oppoParty: PokemonData[]
  mySelect?: PokemonData
  oppoSelect?: PokemonData
  myStatus?: Status
  oppoStatus?: Status
  myWaza?: waza
  oppoWaza?: waza
  myTime?: number
  oppoTime?: number
  myItem?: string
  oppoItem?: string
  myNature?: string
  oppoNature?: string
}

export default class VersusTabs extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      openMy: false,
      openOppo: false,
      myParty: [{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"}],
      oppoParty: [{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"}],
    };
  }
  handleClickMyPoke = () => {
    this.setState({ openMy: !this.state.openMy })
  };
  handleClickMyPokeWithState = (myStatus: Status, myWaza: waza, myTime: number, myItem: string, myNature: string) => {
    this.setState({myStatus: myStatus, myWaza: myWaza, myTime: myTime, myItem: myItem, myNature: myNature })
    console.log("mywaza:" + myWaza + "time:" + myTime)
  };
  handleChangeInputMyPokemon = (pokemon: PokemonData) => {
    let newArray: PokemonData[] = this.state.myParty
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
    this.setState({ myParty: newArray })
    console.log(this.state.myParty)
  }
  handleChangeInputOppoPokemon = (pokemon: PokemonData) => {
    let newArray: PokemonData[] = this.state.oppoParty
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
    this.setState({ oppoParty: newArray })
    console.log(this.state.oppoParty)
  }
  handleMySelect = (pokemon: PokemonData) => {
    this.setState({ mySelect: pokemon })
  }
  handleOppoSelect = (pokemon: PokemonData) => {
    this.setState({ oppoSelect: pokemon })
  }
  handleClickOppoPoke = () => {
    this.setState({ openOppo: !this.state.openOppo })
  };
  handleClickOppoPokeWithState = (myStatus: Status, myWaza: waza, myTime: number, myItem: string, nature: string) => {
    this.setState({oppoStatus: myStatus, oppoWaza: myWaza, oppoTime: myTime, oppoItem: myItem, oppoNature: nature })
    console.log("oppowaza:" + myWaza + "time:" + myTime)
  };
  clickMyClear = (pokemon: PokemonData) => {
    let num: number = -1
    const target: PokemonData | undefined = this.state.myParty.find((element: PokemonData, i: number) => {
      if (pokemon.name === element.name) {
        num = i
      }
      return element.name === pokemon.name
    })
    let newArray: PokemonData[] = this.state.myParty
    if (num !== -1) {
      newArray.splice(num, 1)
      newArray.push({number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"})
      this.setState({ myParty: newArray })
    }
  }
  clickOppoClear = (pokemon: PokemonData) => {
    let num: number = -1
    const target: PokemonData | undefined = this.state.oppoParty.find((element: PokemonData, i: number) => {
      if (pokemon.name === element.name) {
        num = i
      }
      return element.name === pokemon.name
    })
    let newArray: PokemonData[] = this.state.oppoParty
    if (num !== -1) {
      newArray.splice(num, 1)
      newArray.push({number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"})
      this.setState({ oppoParty: newArray })
    }
  }
  renderPartyListMy = () => {
    return <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Your Party
                  </ListSubheader>
                }
                style={{flexGrow: 1}}
              >
                <InputAutoPokemon handleInput={this.handleChangeInputMyPokemon} />
                {this.state.myParty.map((element: PokemonData, i: number, array: PokemonData[]) => {
                  return (
                    <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleClickMyPoke();this.handleMySelect(element);}} key={i} disabled={element.number === "000"}>
                      <ListItemAvatar>
                        <PokemonIcon number={element.number}/>
                      </ListItemAvatar>
                      <ListItemText primary={element.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={(event: React.MouseEvent<HTMLElement>) => {this.clickMyClear(element)}}>
                          <ClearIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
  }
  renderPartyListOppo = () => {
    return <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Opponent's Party
                </ListSubheader>
              }
              style={{flexGrow: 1}}
            >
              <InputAutoPokemon handleInput={this.handleChangeInputOppoPokemon} />
              {this.state.oppoParty.map((element: PokemonData, i: number, array: PokemonData[]) => {
                return (
                  <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleClickOppoPoke();this.handleOppoSelect(element);}} key={i} disabled={element.number === "000"}>
                    <ListItemAvatar>
                      <PokemonIcon number={element.number}/>
                    </ListItemAvatar>
                    <ListItemText primary={element.name} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end"  onClick={(event: React.MouseEvent<HTMLElement>) => {this.clickOppoClear(element)}}>
                        <ClearIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })}
            </List>
  }
  render() {
    return (
      <Grid container className="root" spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                {this.state.openMy ? <PokemonInBattle color="primary" backParty={this.handleClickMyPoke} decidion={this.handleClickMyPokeWithState} name={this.state.mySelect} wazas={this.props.wazas} pokemons={this.props.pokemons} /> : this.renderPartyListMy()}
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                {this.state.openOppo ? <PokemonInBattle color="a" backParty={this.handleClickOppoPoke} decidion={this.handleClickOppoPokeWithState} name={this.state.oppoSelect} wazas={this.props.wazas} pokemons={this.props.pokemons} /> : this.renderPartyListOppo()}
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300, marginTop: 0 }}>
                <Calculate myStatus={this.state.myStatus} myWaza={this.state.myWaza} myTime={this.state.myTime} mySelect={this.state.mySelect} oppoItem={this.state.oppoItem} myItem={this.state.myItem} myNature={this.state.myNature} oppoNature={this.state.oppoNature} oppoStatus={this.state.oppoStatus} oppoWaza={this.state.oppoWaza} oppoTime={this.state.oppoTime} oppoSelect={this.state.oppoSelect} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
