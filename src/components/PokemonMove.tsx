import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import  { PokemonData, waza, Status }  from './shared';
import { computeStatus } from './ComputeMethods'
import { CircularProgress, ListItem, ListItemText, List, Button, Grid, Menu, MenuItem, ListItemSecondaryAction } from '@material-ui/core';
import InputAuto from './InputAuto';
import { AllItem } from './ItemData';
import {PokemonInBattleState} from './PokemonInBattle'
import ClearIcon from '@material-ui/icons/Clear';
import InputAutoItem from './InputAutoItem'
import axios from 'axios'

interface Props{
  pokemon?: PokemonData;
  pokemons: PokemonData[];
  wazas: waza[];
  color: string;
  openModal: any;
  sendPokeMove: any;
}

export default class PokemonMove extends React.Component<Props,PokemonInBattleState> {
  constructor(props: any) {
    super(props);
    console.log(this.props.pokemon)
    this.state = {
      expanded: false,
      isOpenEffort: false,
      isOpenWaza: false,
      isOpenNature: null,
      isOpenAbility: null,
      isOpenItem: null,
      isOpenNatureBool: false,
      effortForm: "slider",
      pokemonData: {number:"0",name:"ダミー",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:"f"},
      loading: false,
      natureName: "ようき",
      effortHP: 4,
      effortA: 252,
      effortB: 0,
      effortC: 0,
      effortD: 0,
      effortS: 252,
      status: { statusH: 0, statusA: 0, statusB: 0, statusC: 0, statusD: 0, statusS: 0,},
      IndividualH: 31,
      IndividualA: 31,
      IndividualB: 31,
      IndividualC: 31,
      IndividualD: 31,
      IndividualS: 31,
      wazaLabel: [],
      customizedWazas: [],
      inputWaza: {name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー", _id: "000000"},
      selectedWaza: {name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー", _id: "000000"},
      wazaTime: 0,
      selectedAbility: "",
      selectedItem: {name: "なし"}
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  };
  handleChangeCommittedSlider = () => {
    const pokemon: PokemonInBattleState = computeStatus(this.state)
    const status: Status = { statusH: Math.floor(pokemon.status.statusH), statusA: Math.floor(pokemon.status.statusA), statusB: Math.floor(pokemon.status.statusB), statusC: Math.floor(pokemon.status.statusC), statusD: Math.floor(pokemon.status.statusD), statusS: Math.floor(pokemon.status.statusS)}
    this.setState({
      status: status
    })
    // this.props.decidion(status, this.state.selectedWaza, 0, this.state.selectedItem.name, this.state.selectedAbility)
  }
  componentDidMount() {
    const wazaLabels: any = []
    this.props.wazas.forEach((element) => {
      wazaLabels.push({lanel: element.name})
    })
    this.setState({ wazaLabel: wazaLabels })
    const customizedWaza = [{ name:"げきりん",	type:"ドラゴン", power:120,	accuracy:100,	species:"物理"}, {name:"じしん", type:"じめん",	power:100, accuracy:100, species:"物理"}, {name:"つるぎのまい",	type:"ノーマル", power:0,	accuracy:0,	species:"変化"}, {name:"ほのおのキバ", type:"ほのお",	power:65,	accuracy:95, species:"物理"}]
    this.setState({ customizedWazas: customizedWaza})
    // this.props.sendPokeMove(customizedWaza[0], customizedWaza[1], customizedWaza[2], customizedWaza[3], this.state.selectedItem, this.state.selectedAbility)
  }
  componentDidUpdate = () => {
    this.props.sendPokeMove(this.state.customizedWazas[0], this.state.customizedWazas[1], this.state.customizedWazas[2], this.state.customizedWazas[3], this.state.selectedItem, this.state.selectedAbility)
    if (this.props.pokemon) {
      if (this.state.pokemonData.name !== this.props.pokemon.name) {
        this.setState({ pokemonData: this.props.pokemon, selectedAbility: this.props.pokemon.ability1 })
      }
    }
  }
  renderAbility = () => {
    if (this.state.pokemonData.ability2 !== "") {
      if (this.state.pokemonData.ability3 !== "") {
        return (
          <div>
            <MenuItem selected={this.state.pokemonData.ability2 === this.state.selectedAbility} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility(this.state.pokemonData.ability2);this.closeAbility(event);}}>
              {this.state.pokemonData.ability2}
            </MenuItem>
            <MenuItem selected={this.state.pokemonData.ability3 === this.state.selectedAbility} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility(this.state.pokemonData.ability3);this.closeAbility(event);}}>
              {this.state.pokemonData.ability3}
            </MenuItem>
          </div>
        )
      }
      return (
        <div>
          <MenuItem selected={this.state.pokemonData.ability2 === this.state.selectedAbility} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility(this.state.pokemonData.ability2);this.closeAbility(event);}}>
            {this.state.pokemonData.ability2}
          </MenuItem>
        </div>
      )
    }
    return
  }
  openModal = (event: React.MouseEvent<HTMLElement>) => {
    this.props.openModal()
  }
  sendPokemon = (memo: string) => {
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon', {
      ability: this.state.selectedAbility,
      effort_h: this.state.effortHP,
      effort_a: this.state.effortA,
      effort_b: this.state.effortB,
      effort_c: this.state.effortC,
      effort_d: this.state.effortD,
      effort_s: this.state.effortS,
      memo: memo,
      move_1: this.state.customizedWazas[0],
      move_2: this.state.customizedWazas[1],
      move_3: this.state.customizedWazas[2],
      move_4: this.state.customizedWazas[3],
      name: this.state
    })
  }
  openAbility = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenAbility: event.currentTarget})
  }
  closeAbility = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenAbility: null})
  }
  openItem = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenItem: event.currentTarget})
  }
  closeItem = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenItem: null})
  }
  // handleChangeInputWaza = (waza: waza) => {
  //   this.setState({ inputWaza: waza , selectedWaza: waza , wazaTime: new Date().getTime()})
  //   console.log(waza)
  //   // this.props.decidion(this.state.status, waza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  // }
  handleCheckWaza = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const selectWaza: any = this.props.wazas.find((element: waza) => {
      return element.name === event.target.value
    })
    this.setState({ selectedWaza: selectWaza , wazaTime: new Date().getTime()})
    console.log(selectWaza)
    // this.props.decidion(this.state.status, selectWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleCheckWazaGroup = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const selectWaza: any = this.props.wazas.find((element: waza) => {
      return element.name === value
    })
    this.setState({ selectedWaza: selectWaza , wazaTime: new Date().getTime()})
    console.log(selectWaza)
    // this.props.decidion(this.state.status, selectWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleAbility = (name: string) => {
    this.setState({ selectedAbility: name })
    // this.props.decidion(this.state.status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem, name)
  }
  handleItem = (name: string) => {
    const item: any = AllItem.find((element) => {
      return element.name === name
    })
    this.setState({ selectedItem: item })
    // this.props.decidion(this.state.status, this.state.selectedWaza, new Date().getTime(), name, this.state.selectedAbility)
  }
  handleChangeInputWaza = (waza: waza) => {
    let newArray: waza[] = this.state.customizedWazas
    let done: boolean = false
    for (let index = 0; index < newArray.length; index++) {
      const element = newArray[index];
      if (!done && element.name === "ダミー") {
        done = true
        newArray[index] = waza
      }
      if (!done && index === 3){
        done = true
        newArray.shift()
        newArray[3] = waza
      }
    }
    this.setState({ customizedWazas: newArray })
    console.log(this.state.customizedWazas)
  }
  clickClear = (waza: waza) => {
    let num: number = -1
    const target: waza | undefined = this.state.customizedWazas.find((element: waza, i: number) => {
      if (waza.name === element.name) {
        num = i
      }
      return element.name === waza.name
    })
    let newArray: waza[] = this.state.customizedWazas
    if (num !== -1) {
      newArray.splice(num, 1)
      newArray.push({name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー", _id: "000000"})
      this.setState({ customizedWazas: newArray })
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <Card style={{ height: 430, width: 300 }}>
          <div>
            <CircularProgress/>
          </div>
        </Card>
      )
    } else if (this.state.pokemonData.name === "ダミー") {
			return (
        <Card style={{ height: 430, width: 300 }}>
          <Typography style={{marginTop: 190}}>ポケモンを選択してください</Typography>
        </Card>
      )
		}
    return (
    <Card style={{ height: 430, width: 300 }}>
      <InputAutoItem handleInput={this.handleItem} />
      <Button onClick={this.openAbility} variant="outlined" color={this.props.color === "primary" ? "primary" : 'secondary'	} style={{height: 35,width: 182, marginTop: 5}}>
        {this.state.selectedAbility}▼
      </Button>
      <Menu
        id="long-menu"
        anchorEl={this.state.isOpenAbility}
        open={Boolean(this.state.isOpenAbility)}
        onClose={this.closeAbility}
        PaperProps={{
          style: {
            maxHeight: 216,
            width: 182,
          },
        }}
      >
        <MenuItem selected={this.state.pokemonData.ability1 === this.state.selectedAbility} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility(this.state.pokemonData.ability1);this.closeAbility(event);}}>
          {this.state.pokemonData.ability1}
        </MenuItem>
        {this.renderAbility()}
      </Menu>
      <Grid item>
        <List>
          <InputAuto datas={this.props.wazas.filter((element: waza) => {return(element.power > 0)})} handleInput={this.handleChangeInputWaza} />
            {this.state.customizedWazas.map((waza: waza, i: number) => {
              if (i > 4) {return true}
              return (
                <ListItem key={i} style={{height: 48}}>
                  <ListItemText
                    style={{marginLeft: 0, whiteSpace: 'pre-line'}}
                  >
                    {waza.name === "ダミー" ? "" : waza.name}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={(event: React.MouseEvent<HTMLElement>) => {this.clickClear(waza)}}>
                      <ClearIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>)
            })}
        </List>
      </Grid>
      <Button onClick={this.openModal} variant="outlined" style={{height: 35,width: 200, marginTop: 50}}>
        ポケモン単体を登録
      </Button>
    </Card>
    );
  }
}
