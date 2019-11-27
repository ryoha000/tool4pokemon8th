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
import { PokemonData, waza, MyParty, MyPokemon, MyLog, datas } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import PokemonStatus from './PokemonStatus'
import PokemonMove from './PokemonMove'
import FolderIcon from '@material-ui/icons/Folder';
import ClearIcon from '@material-ui/icons/Clear';
import FromRegisteredDialog from './fromRegisteredDialog'
import { ListItemSecondaryAction, IconButton, Button, TextField, DialogActions, DialogContent, DialogTitle, Dialog } from '@material-ui/core';

export interface SendData {
  moves?: waza[];
  efforts?: Effort
  nature?: string;
  item?: Item;
  ability?: string;
  name?: string;
  id?: number
  index: number;
  memo?: string;
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
  partyName?: string
  pokemonName?: string
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
      party: [{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0}],
    };
  }
  componentDidUpdate = () => {
  }
  handleAllData = (datas: MyPokemon | MyParty | MyLog) => {
    this.props.handleAllData(datas)
  }
  renderModal = () => {
    if (this.state.modalTitle === 'ポケモン単体の登録') {
      const i: number = this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : 0
      if (i === -1) {
        alert('内部エラーです。報告してくれたらうれしいです')
      }
      const pokemonName = this.state.partyDetail[i].name
      return (
        <Dialog maxWidth='xs' fullWidth onClose={this.closeModal} open={this.state.isOpenModal}>
          <DialogTitle>{this.state.modalTitle}</DialogTitle>
          {/* <DialogContent>
            <TextField
              label='ポケモン名'
              value={this.state.pokemonName? this.state.pokemonName : ''}
              onChange={this.handlePokemonName()}
              margin="normal"
              multiline={true}
              fullWidth
            />
          </DialogContent> */}
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
    if (this.state.modalTitle === 'パーティの登録') {
      return (
        <Dialog onClose={this.closeModal} open={this.state.isOpenModal}>
          <DialogTitle>{this.state.modalTitle}</DialogTitle>
          <DialogContent>
            <TextField
              label='パーティ名'
              value={this.state.partyName? this.state.partyName : ''}
              onChange={this.handlePartyName()}
              margin="normal"
              multiline={true}
              fullWidth
            />
          </DialogContent>
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
  handlePartyName = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const partyName: string = event.target.value
    this.setState({partyName: partyName})
  }
  handlePokemonName = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pokemonName: string = event.target.value
    this.setState({pokemonName: pokemonName})
  }
  handleSelect = (i: number, pokemon: PokemonData) => {
    this.setState({ selectedPokemonIndex: i, selectedPokemon: pokemon})
  }
  openPokeModal = () => {
    this.setState({isOpenModal: true, modalTitle: 'ポケモン単体の登録'})
  }
  openPartyModal = () => {
    this.setState({isOpenModal: true, modalTitle: 'パーティの登録'})
  }
  closeModal = () => {
    this.setState({isOpenModal: false, modalTitle: ''})
  }
  selectPokeStatus = (effort_h: number, effort_a: number, effort_b: number, effort_c: number, effort_d: number, effort_s: number, name: string | undefined, nature: string) => {
    if (this.state.selectedPokemonIndex !== undefined) {
      let nowParty: SendData[] = this.state.partyDetail
      const i: number = this.state.selectedPokemonIndex
      nowParty[i].efforts = {effort_h: effort_h, effort_a: effort_a, effort_b: effort_b, effort_c: effort_c, effort_d: effort_d, effort_s: effort_s}
      nowParty[i].name = name
      nowParty[i].nature = nature
      this.setState({partyDetail: nowParty})
    }
  }
  selectPokeMove = (move_1: waza, move_2: waza, move_3: waza, move_4: waza, item: Item, ability: string, memo: string) => {
    if (this.state.selectedPokemonIndex != undefined) {
      let nowParty: SendData[] = this.state.partyDetail
      const i: number = this.state.selectedPokemonIndex
      nowParty[i].moves = [move_1, move_2, move_3, move_4]
      nowParty[i].item = item
      nowParty[i].ability = ability
      nowParty[i].memo = memo
      this.setState({partyDetail: nowParty})
    }
  }
  send = () => {
    if (this.state.modalTitle === 'ポケモン単体の登録') {
      this.setState({loading: true})
      const pokemon: SendData = this.state.partyDetail[this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : 0]
      if (pokemon.ability && pokemon.efforts && pokemon.item && pokemon.moves && pokemon.nature && !pokemon.id) {
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
          number: this.state.party[this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : 0].number
        }
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon',
          {
            name: this.props.username,
            pass: this.props.password,
            pokemon: pokemonData
          }
        ).then((res: any) => {
          if (this.state.selectedPokemonIndex !== undefined) {
            alert(name + '(' + this.state.party[this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : 0].name + ')が登録されました')
            this.setState({isOpenModal: false, modalTitle: '', loading: false})
          } else {
            this.setState({isOpenModal: false, modalTitle: '', loading: false})
          }
        }).catch((e: any) => {
          alert(e)
          this.setState({isOpenModal: false, modalTitle: '', loading: false})
        })
      }
    }
    if (this.state.modalTitle === 'パーティの登録') {
      this.setState({loading: true})
      const pokemons: SendData[] = this.state.partyDetail
      let pokemonDatas: MyPokemon[] = []
      pokemons.map((pokemon: SendData, i: number) => {
        const name: string = pokemon.name ? pokemon.name : new Date().toISOString()
        if (!pokemon.efforts) {
          pokemon.efforts = {effort_h: 0, effort_a: 0, effort_b: 0, effort_c: 0, effort_d: 0, effort_s: 0}
        }
        if (!pokemon.moves) {
          const dammywaza: waza = {name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー"}
          pokemon.moves = [dammywaza, dammywaza, dammywaza, dammywaza]
        }
        // let pokemonData: JSON
        let pokemonData: MyPokemon = {
          ability: pokemon.ability ? pokemon.ability : this.state.party[i].ability1,
          effort_a: pokemon.efforts.effort_a,
          effort_b: pokemon.efforts.effort_b,
          effort_c: pokemon.efforts.effort_c,
          effort_d: pokemon.efforts.effort_d,
          effort_s: pokemon.efforts.effort_s,
          effort_h: pokemon.efforts.effort_h,
          memo: this.state.memo ? this.state.memo : '',
          item: pokemon.item ? pokemon.item.name : '',
          move_1: pokemon.moves[0].name,
          move_2: pokemon.moves[1].name,
          move_3: pokemon.moves[2].name,
          move_4: pokemon.moves[3].name,
          name: name,
          nature: pokemon.nature ? pokemon.nature : 'ようき',
          number: this.state.party[i].number
        }
        if (pokemon.id !== undefined) {
          pokemonData.id = pokemon.id
        }
        pokemonDatas.push(pokemonData)
      })
      const partyName: string = this.state.partyName ? this.state.partyName : new Date().toISOString()
      const partyInfo = {
        name: partyName,
        memo: this.state.memo ? this.state.memo : '',
        pokemons: pokemonDatas
      }
      axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/party',
        {
          name: this.props.username,
          pass: this.props.password,
          party: partyInfo
        }
      ).then((res: any) => {
        let pokemonNames: string = ''
        this.state.party.forEach((element: PokemonData, i: number) => {
          pokemonNames += element.name
        })
        alert(partyName + '(' + pokemonNames.slice(0, -1) + ')が登録されました')
        this.setState({isOpenModal: false, modalTitle: '', loading: false})
      }).catch((e: any) => {
        alert(e)
        this.setState({isOpenModal: false, loading: false, modalTitle: ''})
      })
    }
  }
  handleChangeInputPokemon = (pokemon: PokemonData) => {
    let newArray: PokemonData[] = this.state.party
    let done: boolean = false
    let err: PokemonData | undefined = newArray.find((element: PokemonData) => {
      return element.number === pokemon.number
    })
    if (err) {
      alert("Can't use same pokemon")
      return
    }
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
    let newDetail: SendData[] = this.state.partyDetail
    if (num !== -1) {
      newArray.splice(num, 1)
      newDetail[num] = {
        index: num,
        efforts: undefined,
        name: undefined,
        nature: undefined,
        moves: undefined,
        ability: undefined,
        item: undefined,
        memo: undefined
      }
      newArray.push({number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0})
      this.setState({ party: newArray, selectedPokemon: undefined, selectedPokemonIndex: undefined, partyDetail: newDetail })
    }
  }
  handleOpenDialog = (i: number, type: string) => {
    this.setState({isOpenDialog: true, dialogType: type, selectedPokemonIndex: i})
  }
  handleCloseDialog = () => {
    this.setState({isOpenDialog: false})
  }
  handleMyParty = (party: MyParty) => {
    
  }
  handleMyPokemon = (pokemon: MyPokemon, index: number) => {
    const pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
      return (element.number === pokemon.number)
    })
    let nowParty: PokemonData[] = this.state.party
    if (!pokemonData) {
      return
    }
    let err: PokemonData | undefined = nowParty.find((element: PokemonData) => {
      return element.number === pokemon.number
    })
    if (err) {
      alert("Can't use same pokemon")
      return
    }
    if (nowParty[index]) {
      nowParty[index] = pokemonData
    }
    let nowDetail: SendData[] = this.state.partyDetail
    if (nowDetail[index]) {
      nowDetail[index].id = pokemon.id
      nowDetail[index].ability = pokemon.ability
      nowDetail[index].name = pokemon.name
      nowDetail[index].efforts = {
        effort_a: pokemon.effort_a,
        effort_b: pokemon.effort_b,
        effort_c: pokemon.effort_c,
        effort_d: pokemon.effort_d,
        effort_s: pokemon.effort_s,
        effort_h: pokemon.effort_h,
      }
      nowDetail[index].item = {name: pokemon.item}
      nowDetail[index].memo = pokemon.memo
      const move_1: waza = {name: pokemon.move_1,	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー"}
      const move_2: waza = {name: pokemon.move_2,	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー"}
      const move_3: waza = {name: pokemon.move_3,	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー"}
      const move_4: waza = {name: pokemon.move_4,	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー"}
      nowDetail[index].moves = [move_1, move_2, move_3, move_4]
      nowDetail[index].nature = pokemon.nature
      this.setState({party: nowParty, partyDetail: nowDetail, selectedPokemon: pokemonData})
    }
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
                    index={this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : 0}
                    selectParty={this.handleMyParty}
                    selectPokemon={this.handleMyPokemon}
                    handleAllData={this.handleAllData}
                    username={this.props.username}
                    password={this.props.password}
                  />
                  <InputAutoPokemon handleInput={this.handleChangeInputPokemon} />
                  {this.state.party.map((element: PokemonData, i: number, array: PokemonData[]) => {
                    if (i > 5) {
                      return
                    }
                    return (
                      <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleSelect(i, element);}} key={i} disabled={element.number === "000"} selected={i === this.state.selectedPokemonIndex}>
                        <ListItemAvatar>
                          <PokemonIcon number={element.number}/>
                        </ListItemAvatar>
                        <ListItemText primary={element.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleOpenDialog(i, 'pokemon')}} >
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
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {this.openPartyModal()}}
                  variant="contained"
                  style={{height: 35,width: 200, marginTop: 5}}
                >
                  パーティを登録
                </Button>
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
                  buttonLabel='ポケモン単体を登録'
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
