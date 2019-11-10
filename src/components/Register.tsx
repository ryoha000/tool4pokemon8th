import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Item } from './ItemData'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { PokemonData, waza, Status } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import PokemonStatus from './PokemonStatus'
import PokemonMove from './PokemonMove'
import ClearIcon from '@material-ui/icons/Clear';
import { ListItemSecondaryAction, IconButton, Modal, Typography, CardHeader, Card, CardContent, CardActions, Button } from '@material-ui/core';

interface SendData {
  moves?: waza[];
  efforts?: Effort
  nature?: string;
  item?: Item;
  ability?: string;
  name?: string;
  index: number;
}

interface Effort {
  effort_h: number
  effort_a: number
  effort_b: number
  effort_c: number
  effort_d: number
  effort_s: number
}

interface Props{
  wazas: waza[];
  pokemons: PokemonData[];
}

interface State{
  party: PokemonData[];
  memo?: string;
  selectedPokemonIndex?: number,
  selectedPokemon?: PokemonData
  partyDetail: SendData[]
  isOpenModal: boolean
  modalTitle: string
}

export default class Register extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      isOpenModal: false,
      modalTitle: '',
      partyDetail: [{index: 0}, {index: 1}, {index: 2}, {index: 3}, {index: 4}, {index: 5}],
      party: [{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"}],
    };
  }
  handleSelect = (i: number, pokemon: PokemonData) => {
    this.setState({ selectedPokemonIndex: i, selectedPokemon: pokemon})
  }
  openPokeModal = () => {
    this.setState({isOpenModal: true, modalTitle: 'ポケモン単体の登録'})
  }
  closeModal = () => {
    this.setState({isOpenModal: false, modalTitle: ''})
  }
  selectPokeStatus = (effort_h: number, effort_a: number, effort_b: number, effort_c: number, effort_d: number, effort_s: number, name: string | undefined, nature: string) => {
    if (this.state.selectedPokemonIndex) {
      let nowParty: SendData[] = this.state.partyDetail
      const i: number = this.state.selectedPokemonIndex
      nowParty[i].efforts = {effort_h: effort_h, effort_a: effort_a, effort_b: effort_b, effort_c: effort_c, effort_d: effort_d, effort_s: effort_s}
      nowParty[i].name = name
      nowParty[i].nature = nature
      this.setState({partyDetail: nowParty})
    }
  }
  selectPokeMove = (move_1: waza, move_2: waza, move_3: waza, move_4: waza, item: Item, ability: string) => {
    if (this.state.selectedPokemonIndex) {
      let nowParty: SendData[] = this.state.partyDetail
      const i: number = this.state.selectedPokemonIndex
      nowParty[i].moves = [move_1, move_2, move_3, move_4]
      nowParty[i].item = item
      nowParty[i].ability = ability
      this.setState({partyDetail: nowParty})
    }
  }
  send = () => {
    if (this.state.modalTitle === 'ポケモン単体の登録' && this.state.selectedPokemonIndex) {
      const pokemon: SendData = this.state.partyDetail[this.state.selectedPokemonIndex]
      if (pokemon.ability && pokemon.efforts && pokemon.item && pokemon.moves && pokemon.nature) {
        const name: string = pokemon.name ? pokemon.name : new Date().toISOString()
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon',
          {
            ability: pokemon.ability,
            effort_a: pokemon.efforts.effort_a,
            effort_b: pokemon.efforts.effort_b,
            effort_c: pokemon.efforts.effort_c,
            effort_d: pokemon.efforts.effort_d,
            effort_s: pokemon.efforts.effort_s,
            effort_h: pokemon.efforts.effort_h,
            memo: this.state.memo ? this.state.memo : '',
            move_1: pokemon.moves[0].name,
            move_2: pokemon.moves[1].name,
            move_3: pokemon.moves[2].name,
            move_4: pokemon.moves[3].name,
            name: name,
            nature: pokemon.nature,
            number: this.state.party[this.state.selectedPokemonIndex].number
          }
        ).then((res: any) => {
          if (this.state.selectedPokemonIndex) {
            alert(name + '(' + this.state.party[this.state.selectedPokemonIndex].name + ')が登録されました')
          }
        }).catch((e: any) => {
          alert(e.response.data.message)
        })
      }
    }
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
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.isOpenModal}
                onClose={this.closeModal}
              >
                <Paper style={{width: 500, height:300, marginTop: 100, position: 'absolute', left: '50%'}}>
                  <Card>
                    <CardHeader
                      title={this.state.modalTitle}
                    />
                    <CardContent>
                      <Typography>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={this.send} variant="outlined" style={{height: 35,width: 200, marginTop: 50}}>Register</Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Modal>
                <Paper style={{ height: 430,width: 300 }}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  style={{flexGrow: 1}}
                >
                  <InputAutoPokemon handleInput={this.handleChangeInputPokemon} />
                  {this.state.party.map((element: PokemonData, i: number, array: PokemonData[]) => {
                    return (
                      <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleSelect(i, element);}} key={i} disabled={element.number === "000"} selected={element === this.state.selectedPokemon}>
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
                <PokemonStatus sendPokemonStatus={this.selectPokeStatus} color="primary" pokemon={this.state.selectedPokemon} wazas={this.props.wazas} pokemons={this.props.pokemons}/>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300}}>
                <PokemonMove sendPokeMove={this.selectPokeMove} openModal={this.openPokeModal} color="primary" pokemon={this.state.selectedPokemon} wazas={this.props.wazas} pokemons={this.props.pokemons}/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
