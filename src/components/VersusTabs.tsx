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
import { PokemonData, waza, Status, MyPokemon, MyParty, MyLog, datas } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import PostAddIcon from '@material-ui/icons/PostAdd';
import ClearIcon from '@material-ui/icons/Clear';
import { ListItemSecondaryAction, IconButton, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, FormLabel, FormControlLabel, FormControl, FormGroup, Checkbox, Radio } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import FromRegisteredDialog from './fromRegisteredDialog';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios';

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
  party_id?: number
  isOpenSelectDialog: boolean
  isOpenLogDialog: boolean
  dialogType: string
  registerIndex: number
  loading: boolean,
  result: boolean
  logName: string
  memo: string
  mySelect1: boolean
  mySelect2: boolean
  mySelect3: boolean
  mySelect4: boolean
  mySelect5: boolean
  mySelect6: boolean
  oppoSelect1: boolean
  oppoSelect2: boolean
  oppoSelect3: boolean
  oppoSelect4: boolean
  oppoSelect5: boolean
  oppoSelect6: boolean
  myfirst: number
  oppofirst: number
}

export default class VersusTabs extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      myfirst: 0,
      oppofirst: 0,
      mySelect1: false,
      mySelect2: false,
      mySelect3: false,
      mySelect4: false,
      mySelect5: false,
      mySelect6: false,
      oppoSelect1: false,
      oppoSelect2: false,
      oppoSelect3: false,
      oppoSelect4: false,
      oppoSelect5: false,
      oppoSelect6: false,
      result: true,
      logName: '',
      memo: '',
      isOpenLogDialog: false,
      registerIndex: -1,
      dialogType: '',
      isOpenSelectDialog: false,
      openMy: false,
      openOppo: false,
      loading: false,
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
      this.setState({ myParty: newArray, party_id: undefined })
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
  handleMyPokemon = (pokemon: MyPokemon, index: number) => {
    if (pokemon.id) {
      let myParty: PokemonData[] = this.state.myParty
      let pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
        return element.number === pokemon.number
      })
      console.log(pokemon.number)
      if (pokemonData === undefined) {
        alert('指定されたポケモンが不適切です')
        return
      }
      pokemonData.id = pokemon.id
      myParty[index] = pokemonData
      this.setState({myParty: myParty})
    }
  }
  handleMyParty = (party: MyParty) => {
    let myParty: PokemonData[] = this.state.myParty
    let pokemon: MyPokemon
    if (party.pokemon_1) {
      pokemon = party.pokemon_1
      let pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
        return element.number === pokemon.number
      })
      if (!pokemonData) {
        alert('指定されたポケモンが不適切です')
        return
      }
      pokemonData.id = party.pokemon_1_id
      myParty[0] = pokemonData
    }
    if (party.pokemon_2) {
      pokemon = party.pokemon_2
      let pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
        return element.number === pokemon.number
      })
      if (!pokemonData) {
        alert('指定されたポケモンが不適切です')
        return
      }
      pokemonData.id = party.pokemon_2_id
      myParty[1] = pokemonData
    }
    if (party.pokemon_3) {
      pokemon = party.pokemon_3
      console.log(pokemon)
      let pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
        return element.number === pokemon.number
      })
      if (!pokemonData) {
        alert('指定されたポケモンが不適切です')
        // return
      } else {

        pokemonData.id = party.pokemon_3_id
        myParty[2] = pokemonData
      }
    }
    if (party.pokemon_4) {
      pokemon = party.pokemon_4
      let pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
        return element.number === pokemon.number
      })
      if (!pokemonData) {
        alert('指定されたポケモンが不適切です')
        return
      }
      pokemonData.id = party.pokemon_4_id
      myParty[3] = pokemonData
    }
    if (party.pokemon_5) {
      pokemon = party.pokemon_5
      let pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
        return element.number === pokemon.number
      })
      if (!pokemonData) {
        alert('指定されたポケモンが不適切です')
        return
      }
      pokemonData.id = party.pokemon_5_id
      myParty[4] = pokemonData
    }
    if (party.pokemon_6) {
      pokemon = party.pokemon_6
      let pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
        return element.number === pokemon.number
      })
      if (!pokemonData) {
        alert('指定されたポケモンが不適切です')
        return
      }
      pokemonData.id = party.pokemon_6_id
      myParty[5] = pokemonData
    }
    myParty[0].id = party.pokemon_1_id
    myParty[1].id = party.pokemon_2_id
    myParty[2].id = party.pokemon_3_id
    myParty[3].id = party.pokemon_4_id
    myParty[4].id = party.pokemon_5_id
    myParty[5].id = party.pokemon_6_id
    this.setState({party_id: party.id, myParty: myParty})
  }
  handleOpenSelectDialog = (i: number, type: string) => {
    this.setState({isOpenSelectDialog: true, dialogType: type, registerIndex: i})
  }
  handleCloseSelectDialog = () => {
    this.setState({isOpenSelectDialog: false})
  }
  handleOpenLogDialog = () => {
    this.setState({isOpenLogDialog: true, logName: new Date().toISOString()})
  }
  handleCloseLogDialog = () => {
    this.setState({isOpenLogDialog: false, logName: ''})
  }
  handleResult = (result: boolean) => {
    this.setState({result: result})
  }
  handleSelect = (i: number, side: boolean) => {
    if (!side) {
      let first: boolean = false
      if (this.state.mySelect1 || this.state.mySelect2 || this.state.mySelect3 || this.state.mySelect4 || this.state.mySelect5 || this.state.mySelect6) {
        first = false
      } else {
        first = true
      }
      if (this.state.myfirst === 0) {
        first = true
      }
      if (i === 1) {
        if (this.state.myfirst === i) {
          this.setState({myfirst: 0})
        }
        this.setState({mySelect1: !this.state.mySelect1})
      }
      if (i === 2) {
        if (this.state.myfirst === i) {
          this.setState({myfirst: 0})
        }
        this.setState({mySelect2: !this.state.mySelect2})
      }
      if (i === 3) {
        if (this.state.myfirst === i) {
          this.setState({myfirst: 0})
        }
        this.setState({mySelect3: !this.state.mySelect3})
      }
      if (i === 4) {
        if (this.state.myfirst === i) {
          this.setState({myfirst: 0})
        }
        this.setState({mySelect4: !this.state.mySelect4})
      }
      if (i === 5) {
        if (this.state.myfirst === i) {
          this.setState({myfirst: 0})
        }
        this.setState({mySelect5: !this.state.mySelect5})
      }
      if (i === 6) {
        if (this.state.myfirst === i) {
          this.setState({myfirst: 0})
        }
        this.setState({mySelect6: !this.state.mySelect6})
      }
      if (first) {
        this.setState({myfirst: i})
      }
    } else {
      let first: boolean = false
      if (this.state.oppoSelect1 || this.state.oppoSelect2 || this.state.oppoSelect3 || this.state.oppoSelect4 || this.state.oppoSelect5 || this.state.oppoSelect6) {
        first = false
      } else {
        first = true
      }
      if (this.state.oppofirst === 0) {
        first = true
      }
      if (i === 1) {
        if (this.state.oppofirst === i) {
          this.setState({oppofirst: 0})
        }
        this.setState({oppoSelect1: !this.state.oppoSelect1})
      }
      if (i === 2) {
        if (this.state.oppofirst === i) {
          this.setState({oppofirst: 0})
        }
        this.setState({oppoSelect2: !this.state.oppoSelect2})
      }
      if (i === 3) {
        if (this.state.oppofirst === i) {
          this.setState({oppofirst: 0})
        }
        this.setState({oppoSelect3: !this.state.oppoSelect3})
      }
      if (i === 4) {
        if (this.state.oppofirst === i) {
          this.setState({oppofirst: 0})
        }
        this.setState({oppoSelect4: !this.state.oppoSelect4})
      }
      if (i === 5) {
        if (this.state.oppofirst === i) {
          this.setState({oppofirst: 0})
        }
        this.setState({oppoSelect5: !this.state.oppoSelect5})
      }
      if (i === 6) {
        if (this.state.oppofirst === i) {
          this.setState({oppofirst: 0})
        }
        this.setState({oppoSelect6: !this.state.oppoSelect6})
      }
      if (first) {
        this.setState({oppofirst: i})
      }
    }
  }
  renderLogDialog = () => {
    return (
      <Dialog maxWidth='xs' fullWidth onClose={this.handleCloseLogDialog} open={this.state.isOpenLogDialog}>
        <DialogTitle>ログの保存</DialogTitle>
        <TextField
          label='ログ名'
          value={this.state.logName}
          onChange={this.handleLogName()}
          margin="normal"
          multiline={true}
          fullWidth
        />
        <DialogContent>
          <FormControl>
            <FormLabel>Result</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={<Radio color="secondary" />}
                label="WIN"
                checked={this.state.result}
                onChange={(event: React.ChangeEvent<{}>, checked: boolean) => {this.handleResult(true)}}
                labelPlacement="end"
              />
              <FormControlLabel
                checked={!this.state.result}
                control={<Radio color="primary" />}
                label="LOSE"
                onChange={(event: React.ChangeEvent<{}>, checked: boolean) => {this.handleResult(false)}}
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormGroup row>
              <Checkbox
                color={this.state.myfirst === 1 ? 'secondary' : 'primary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(1, false)}}
                checked={this.state.mySelect1}
              />
              <Checkbox
                color={this.state.myfirst === 2 ? 'secondary' : 'primary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(2, false)}}
                checked={this.state.mySelect2}
              />
              <Checkbox
                color={this.state.myfirst === 3 ? 'secondary' : 'primary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(3, false)}}
                checked={this.state.mySelect3}
              />
              <Checkbox
                color={this.state.myfirst === 4 ? 'secondary' : 'primary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(4, false)}}
                checked={this.state.mySelect4}
              />
              <Checkbox
                color={this.state.myfirst === 5 ? 'secondary' : 'primary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(5, false)}}
                checked={this.state.mySelect5}
              />
              <Checkbox
                color={this.state.myfirst === 6 ? 'secondary' : 'primary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(6, false)}}
                checked={this.state.mySelect6}
              />
            </FormGroup>
          </FormControl>
          <Grid item container>
            <PokemonIcon number={this.state.myParty[0].number} />
            <PokemonIcon number={this.state.myParty[1].number} />
            <PokemonIcon number={this.state.myParty[2].number} />
            <PokemonIcon number={this.state.myParty[3].number} />
            <PokemonIcon number={this.state.myParty[4].number} />
            <PokemonIcon number={this.state.myParty[5].number} />
          </Grid>
          <FormControl>
            <FormGroup row>
              <Checkbox
                color={this.state.oppofirst === 1 ? 'primary' : 'secondary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(1, true)}}
                checked={this.state.oppoSelect1}
              />
              <Checkbox
                color={this.state.oppofirst === 2 ? 'primary' : 'secondary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(2, true)}}
                checked={this.state.oppoSelect2}
              />
              <Checkbox
                color={this.state.oppofirst === 3 ? 'primary' : 'secondary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(3, true)}}
                checked={this.state.oppoSelect3}
              />
              <Checkbox
                color={this.state.oppofirst === 4 ? 'primary' : 'secondary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(4, true)}}
                checked={this.state.oppoSelect4}
              />
              <Checkbox
                color={this.state.oppofirst === 5 ? 'primary' : 'secondary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(5, true)}}
                checked={this.state.oppoSelect5}
              />
              <Checkbox
                color={this.state.oppofirst === 6 ? 'primary' : 'secondary'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {this.handleSelect(6, true)}}
                checked={this.state.oppoSelect6}
              />
            </FormGroup>
          </FormControl>
          <Grid item container>
            <PokemonIcon number={this.state.oppoParty[0].number} />
            <PokemonIcon number={this.state.oppoParty[1].number} />
            <PokemonIcon number={this.state.oppoParty[2].number} />
            <PokemonIcon number={this.state.oppoParty[3].number} />
            <PokemonIcon number={this.state.oppoParty[4].number} />
            <PokemonIcon number={this.state.oppoParty[5].number} />
          </Grid>
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
          <Button disabled={this.state.loading} onClick={this.send} variant="outlined" style={{height: 35,width: 200, marginTop: 50}}>SAVE</Button>
        </DialogActions>
      </Dialog>
    )
  }
  handleMemo = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const memo: string = event.target.value
    this.setState({memo: memo})
  }
  handleLogName = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const logName: string = event.target.value
    this.setState({logName: logName})
  }
  send = () => {
    this.setState({loading: true})
    const mypokemons: PokemonData[] = this.state.myParty
    let pokemonDatas: MyPokemon[] = []
    mypokemons.map((pokemon: PokemonData, i: number) => {
      console.log('send')
      const name: string = new Date().toISOString()
      const efforts = {effort_h: 0, effort_a: 0, effort_b: 0, effort_c: 0, effort_d: 0, effort_s: 0}
      const dammywaza: waza = {name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー", _id: "000000"}
      const moves = [dammywaza, dammywaza, dammywaza, dammywaza]
      let pokemonData: MyPokemon = {
        ability: pokemon.ability1,
        effort_a: efforts.effort_a,
        effort_b: efforts.effort_b,
        effort_c: efforts.effort_c,
        effort_d: efforts.effort_d,
        effort_s: efforts.effort_s,
        effort_h: efforts.effort_h,
        memo: '',
        item: '',
        move_1: moves[0].name,
        move_2: moves[1].name,
        move_3: moves[2].name,
        move_4: moves[3].name,
        name: name,
        nature: 'ようき',
        number: pokemon.number
      }
      if (pokemon.id !== undefined) {
        pokemonData.id = pokemon.id
      }
      pokemonDatas.push(pokemonData)
    })
    let oppoFirst: PokemonData | undefined = undefined
    if (this.state.oppoParty[this.state.oppofirst]) {
      oppoFirst = this.state.oppoParty[this.state.oppofirst]
    }
    if (!oppoFirst) {
      alert('相手の先発を入力してください')
      return
    }
    let logInfo: MyLog = {
      name: this.state.logName,
      memo: this.state.memo,
      pokemon_num_1: this.state.oppoParty[0].number,
      pokemon_num_2: this.state.oppoParty[1].number,
      pokemon_num_3: this.state.oppoParty[2].number,
      pokemon_num_4: this.state.oppoParty[3].number,
      pokemon_num_5: this.state.oppoParty[4].number,
      pokemon_num_6: this.state.oppoParty[5].number,
      my_select_1: this.state.mySelect1,
      my_select_2: this.state.mySelect2,
      my_select_3: this.state.mySelect3,
      my_select_4: this.state.mySelect4,
      my_select_5: this.state.mySelect5,
      my_select_6: this.state.mySelect6,
      oppo_select_1: this.state.oppoSelect1,
      oppo_select_2: this.state.oppoSelect2,
      oppo_select_3: this.state.oppoSelect3,
      oppo_select_4: this.state.oppoSelect4,
      oppo_select_5: this.state.oppoSelect5,
      oppo_select_6: this.state.oppoSelect6,
      oppo_first: oppoFirst.number,
      my_first: this.state.myfirst,
      pokemons: pokemonDatas
    }
    if (this.state.party_id) {
      logInfo.party_id = this.state.party_id
    }
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/log',
      {
        name: this.props.username,
        pass: this.props.password,
        log: logInfo
      }
    ).then((res: any) => {
      alert('ログが記録されました')
      this.setState({isOpenLogDialog: false, loading: false})
    }).catch((e: any) => {
      if (e.response.data.message) {
        alert(e.response.data.message)
        this.setState({isOpenLogDialog: false, loading: false})
      }
    })
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
                <ListItem>
                  <InputAutoPokemon handleInput={this.handleChangeInputMyPokemon} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleOpenSelectDialog(0, 'party')}}
                    >
                      <FolderIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <FromRegisteredDialog
                  myParties={this.props.myParties}
                  myPokemons={this.props.myPokemons}
                  type={this.state.dialogType}
                  isOpen={this.state.isOpenSelectDialog}
                  onClose={this.handleCloseSelectDialog}
                  index={this.state.registerIndex ? this.state.registerIndex : 0}
                  selectParty={this.handleMyParty}
                  selectPokemon={this.handleMyPokemon}
                  handleAllData={this.props.handleAllData}
                  username={this.props.username}
                  password={this.props.password}
                />
                {this.state.myParty.map((element: PokemonData, i: number, array: PokemonData[]) => {
                  return (
                    <ListItem button onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleClickMyPoke();this.handleMySelect(element);}} key={i} disabled={element.number === "000"}>
                      <ListItemAvatar>
                        <PokemonIcon number={element.number}/>
                      </ListItemAvatar>
                      <ListItemText primary={element.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleOpenSelectDialog(i, 'pokemon')}}
                        >
                          <FolderIcon />
                        </IconButton>
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
              <ListItem>
                <InputAutoPokemon handleInput={this.handleChangeInputOppoPokemon} />
                <ListItemSecondaryAction>
                  <IconButton disabled={true}>
                    <ImageIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleOpenLogDialog()}}>
                    <PostAddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
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
            {this.renderLogDialog()}
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                {this.state.openMy ? <PokemonInBattle color="primary" backParty={this.handleClickMyPoke} decidion={this.handleClickMyPokeWithState} pokemon={this.state.mySelect} wazas={this.props.wazas} myPokemons={this.props.myPokemons} myParties={this.props.myParties} /> : this.renderPartyListMy()}
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                {this.state.openOppo ? <PokemonInBattle color="a" backParty={this.handleClickOppoPoke} decidion={this.handleClickOppoPokeWithState} pokemon={this.state.oppoSelect} wazas={this.props.wazas} myPokemons={this.props.myPokemons} myParties={this.props.myParties} /> : this.renderPartyListOppo()}
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
