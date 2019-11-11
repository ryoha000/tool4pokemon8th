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
import { PokemonData, waza, MyParty, MyPokemon, MyLog } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import PokemonStatus from './PokemonStatus'
import PokemonMove from './PokemonMove'
import FolderIcon from '@material-ui/icons/Folder';
import ClearIcon from '@material-ui/icons/Clear';
import FromRegisteredDialog from './fromRegisteredDialog'
import { ListItemSecondaryAction, IconButton, Modal, Typography, CardHeader, Card, CardContent, CardActions, Button, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from '@material-ui/core';

export interface SendData {
  moves?: waza[];
  efforts?: Effort
  nature?: string;
  item?: Item;
  ability?: string;
  name?: string;
  id?: number
  index: number;
  memo?: string
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
  username: string
  password: string
  myPokemons: MyPokemon[];
  myParties: MyParty[];
  myLogs: MyLog[];
  handleAllData: (datas: MyPokemon | MyParty | MyLog) => void
}

interface State{
  party: PokemonData[];
  memo?: string;
  selectedPokemonIndex?: number,
  selectedPokemon?: PokemonData
  partyDetail: SendData[]
  isOpenModal: boolean
  modalTitle: string
  loading: boolean
  dialogType: string
  isOpenDialog: boolean
}

export default class Register extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      isOpenModal: false,
      loading: false,
      modalTitle: '',
      dialogType: '',
      isOpenDialog: false,
      partyDetail: [{index: 0}, {index: 1}, {index: 2}, {index: 3}, {index: 4}, {index: 5}],
      party: [{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"}],
    };
  }
  renderModal = () => {
    if (this.state.modalTitle) {
      return (
        <Dialog onClose={this.closeModal} open={this.state.isOpenModal}>
          <DialogTitle>{this.state.modalTitle}</DialogTitle>
          <DialogContent>
            <TextField
              label='メモ'
              value={this.state.memo? this.state.memo : ''}
              onChange={this.handleMemo()}
              margin="normal"
              multiline={true}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={this.state.loading} onClick={this.send} variant="outlined" style={{height: 35,width: 200, marginTop: 50}}>Register</Button>
          </DialogActions>
        </Dialog>
      )
    }
  }
  handleMemo = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const memo: string = event.target.value
    this.setState({memo: memo})
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
    console.log('selectPokeStatus1')
    if (this.state.selectedPokemonIndex !== undefined) {
      console.log('selectPokeStatus2')
      let nowParty: SendData[] = this.state.partyDetail
      const i: number = this.state.selectedPokemonIndex
      nowParty[i].efforts = {effort_h: effort_h, effort_a: effort_a, effort_b: effort_b, effort_c: effort_c, effort_d: effort_d, effort_s: effort_s}
      nowParty[i].name = name
      nowParty[i].nature = nature
      this.setState({partyDetail: nowParty})
    }
  }
  selectPokeMove = (move_1: waza, move_2: waza, move_3: waza, move_4: waza, item: Item, ability: string) => {
    console.log('selectPokeMove1')
    if (this.state.selectedPokemonIndex != undefined) {
      console.log('selectPokeMove2')
      let nowParty: SendData[] = this.state.partyDetail
      const i: number = this.state.selectedPokemonIndex
      nowParty[i].moves = [move_1, move_2, move_3, move_4]
      nowParty[i].item = item
      nowParty[i].ability = ability
      this.setState({partyDetail: nowParty})
    }
  }
  send = () => {
    if (this.state.modalTitle === 'ポケモン単体の登録' && this.state.selectedPokemonIndex !== undefined) {
      this.setState({loading: true})
      const pokemon: SendData = this.state.partyDetail[this.state.selectedPokemonIndex]
      if (pokemon.ability && pokemon.efforts && pokemon.item && pokemon.moves && pokemon.nature) {
        const name: string = pokemon.name ? pokemon.name : new Date().toISOString()
        const pokemonData = {
          ability: pokemon.ability,
          effort_a: pokemon.efforts.effort_a,
          effort_b: pokemon.efforts.effort_b,
          effort_c: pokemon.efforts.effort_c,
          effort_d: pokemon.efforts.effort_d,
          effort_s: pokemon.efforts.effort_s,
          effort_h: pokemon.efforts.effort_h,
          memo: this.state.memo ? this.state.memo : '',
          item: pokemon.item.name,
          move_1: pokemon.moves[0].name,
          move_2: pokemon.moves[1].name,
          move_3: pokemon.moves[2].name,
          move_4: pokemon.moves[3].name,
          name: name,
          nature: pokemon.nature,
          number: this.state.party[this.state.selectedPokemonIndex].number
        }
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon',
          {
            name: this.props.username,
            pass: this.props.password,
            pokemon: pokemonData
          }
        ).then((res: any) => {
          if (this.state.selectedPokemonIndex) {
            alert(name + '(' + this.state.party[this.state.selectedPokemonIndex].name + ')が登録されました')
            this.setState({isOpenModal: false, modalTitle: '', loading: false})
          }
        }).catch((e: any) => {
          if (e.data) {
            alert(e.response.data.message)
            this.setState({isOpenModal: false, modalTitle: '', loading: false})
          }
        })
      }
    }
    this.setState({isOpenModal: false, loading: false})
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
      this.setState({ party: newArray, selectedPokemon: undefined, selectedPokemonIndex: undefined })
    }
  }
  handleOpenDialog = (type: string) => {
    this.setState({isOpenDialog: true, dialogType: type})
  }
  handleCloseDialog = () => {
    this.setState({isOpenDialog: false})
  }
  handleMyParty = (party: MyParty) => {
    
  }
  handleMyPokemon = (pokemon: MyPokemon, index: number) => {
    let nowParty: PokemonData[] = this.state.party
    if (nowParty[index]) {
      nowParty[index].number = pokemon.number
    }
    let nowDetail: SendData[] = this.state.partyDetail
    nowDetail[index].id = pokemon.id
    this.setState({party: nowParty, partyDetail: nowDetail})
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
              <Grid item>
                {this.renderModal()}
                <Paper style={{ height: 430,width: 300 }}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  style={{flexGrow: 1}}
                >
                  <FromRegisteredDialog
                    myParties={this.props.myParties}
                    myPokemons={this.props.myPokemons}
                    type={this.state.dialogType}
                    isOpen={this.state.isOpenDialog}
                    onClose={this.handleCloseDialog}
                    index={this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : -1}
                    selectParty={this.handleMyParty}
                    selectPokemon={this.handleMyPokemon}
                  />
                  <InputAutoPokemon handleInput={this.handleChangeInputPokemon} />
                  {this.state.party.map((element: PokemonData, i: number, array: PokemonData[]) => {
                    return (
                      <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleSelect(i, element);}} key={i} disabled={element.number === "000"} selected={i === this.state.selectedPokemonIndex}>
                        <ListItemAvatar>
                          <PokemonIcon number={element.number}/>
                        </ListItemAvatar>
                        <ListItemText primary={element.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleOpenDialog('pokemon');this.handleSelect(i, element)}} >
                            <FolderIcon />
                          </IconButton>
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
                <PokemonStatus
                  nowDetail={this.state.selectedPokemonIndex !== undefined ? this.state.partyDetail[this.state.selectedPokemonIndex] : undefined}
                  sendPokemonStatus={this.selectPokeStatus}
                  color="primary"
                  pokemon={this.state.selectedPokemon}
                  wazas={this.props.wazas}
                  pokemons={this.props.pokemons}
                />
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300}}>
                <PokemonMove
                  nowDetail={this.state.selectedPokemonIndex !== undefined ? this.state.partyDetail[this.state.selectedPokemonIndex] : undefined}
                  sendPokeMove={this.selectPokeMove}
                  openModal={this.openPokeModal}
                  color="primary"
                  pokemon={this.state.selectedPokemon}
                  wazas={this.props.wazas}
                  pokemons={this.props.pokemons}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
