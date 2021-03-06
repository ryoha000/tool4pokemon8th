import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import  {name2Pokemon, PokemonData, makeDB, waza, Status, MyParty, MyPokemon , datas}  from './shared';
import  {getPokemonByName, getWazas}  from './shared_js';
import { computeStatus, natures, Nature } from './ComputeMethods'
import { CircularProgress, Slider, ListItem, ListItemText, List, ListItemAvatar, SnackbarContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Fab, Button, Grid, Menu, MenuItem, Select, Icon, TextField } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InputAuto from './InputAuto';
import { AllItem, availableItems, Item } from './ItemData';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PokemonIcon from './PokemonIcon'
import { wazaData }from './WazaData';

interface Props{
  myPokemons: MyPokemon[]
  myParties: MyParty[]
  backParty: any;
  decidion: any
  pokemon?: PokemonData;
  wazas: waza[];
  color: string
  fc: (poke: PokemonData) => void
}
  
export interface PokemonInBattleState{
  expanded: boolean;
  isOpenEffort: boolean;
  isOpenWaza: boolean;
  isOpenNature?: any;
  isOpenAbility?: any;
  isOpenItem?: any;
  isOpenNatureBool: boolean;
  effortForm: string;
  pokemonData: PokemonData;
  loading: boolean;
  natureName: string;
  effortHP: number;
  effortA: number;
  effortB: number;
  effortC: number;
  effortD: number;
  effortS: number;
  status: Status
  IndividualH: number;
  IndividualA: number;
  IndividualB: number;
  IndividualC: number;
  IndividualD: number;
  IndividualS: number;
  wazaLabel: any;
  inputWaza: waza;
  wazaTime: number
  selectedWaza: waza;
  customizedWazas: waza[];
  selectedAbility: string;
  selectedItem: Item;
  pokemonName?: string
  memo: string
}
 
export default class PokemonInBattle extends React.Component<Props,PokemonInBattleState> {
  constructor(props: any) {
    super(props);
    this.state = {
      expanded: false,
      isOpenEffort: false,
      isOpenWaza: false,
      isOpenNature: null,
      isOpenAbility: null,
      isOpenItem: null,
      isOpenNatureBool: false,
      effortForm: "slider",
      pokemonData: {number:"0",name:"ダミー",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},
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
      inputWaza: {name:"",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー", _id: "000000"},
      selectedWaza: {name:"",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー", _id: "000000"},
      wazaTime: 0,
      selectedAbility: "",
      selectedItem: {name: "なし"},
      memo: ''
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  };
  onAvatarClickHandler = () => {
    this.props.backParty(this.state)
  }
  handleChangeCommittedSlider = () => {
    const pokemon: PokemonInBattleState = computeStatus(this.state)
    const status: Status = { statusH: Math.floor(pokemon.status.statusH), statusA: Math.floor(pokemon.status.statusA), statusB: Math.floor(pokemon.status.statusB), statusC: Math.floor(pokemon.status.statusC), statusD: Math.floor(pokemon.status.statusD), statusS: Math.floor(pokemon.status.statusS)}
    this.setState({
      status: status
    })
    this.props.decidion(status, this.state.selectedWaza, 0, this.state.selectedItem.name, this.state.selectedAbility)
  }
  componentDidUpdate = () => {
  }
  componentDidMount() {
    const wazaLabels: any = []
    const dammywaza: waza = {name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー", _id: "000000"}
    wazaData.forEach((element) => {
      wazaLabels.push({lanel: element.name})
    })
    this.setState({ wazaLabel: wazaLabels })
    if (this.props.pokemon) {
      const propPoke = this.props.pokemon
      if (this.state.pokemonData.name !== this.props.pokemon.name) {
        if (this.props.pokemon.id) {
          const mypokemon: MyPokemon | undefined = this.props.myPokemons.find((element: MyPokemon) => {
            return element.id === propPoke.id
          })
          if (mypokemon === undefined) {
            alert('選択画面の登録したポケモン単体を選ぶ画面でリロードアイコンをおしてみてください')
            return
          }
          const nature: Nature | undefined = natures.find((element: Nature) => {
            return element.name === mypokemon.nature
          })
          if (!nature) {
            alert('性格が適切ではありません')
            return
          }
          let state: PokemonInBattleState = this.state
          state.pokemonData = this.props.pokemon
          state.effortA = mypokemon.effort_a
          state.effortB = mypokemon.effort_b
          state.effortC = mypokemon.effort_c
          state.effortD = mypokemon.effort_d
          state.effortS = mypokemon.effort_s
          state.effortHP = mypokemon.effort_h
          let move_1: waza | undefined = wazaData.find((element: waza) => {
            return element.name === mypokemon.move_1
          })
          let move_2: waza | undefined = wazaData.find((element: waza) => {
            return element.name === mypokemon.move_2
          })
          let move_3: waza | undefined = wazaData.find((element: waza) => {
            return element.name === mypokemon.move_3
          })
          let move_4: waza | undefined = wazaData.find((element: waza) => {
            return element.name === mypokemon.move_4
          })
          if (!move_1) {
            move_1 = dammywaza
          }
          if (!move_2) {
            move_2 = dammywaza
          }
          if (!move_3) {
            move_3 = dammywaza
          }
          if (!move_4) {
            move_4 = dammywaza
          }
          state.customizedWazas = [move_1,move_2,move_3,move_4]
          state = computeStatus(state)
          const status: Status = { statusH: Math.floor(state.status.statusH), statusA: Math.floor(state.status.statusA), statusB: Math.floor(state.status.statusB), statusC: Math.floor(state.status.statusC), statusD: Math.floor(state.status.statusD), statusS: Math.floor(state.status.statusS)}
          this.setState({
            loading: false,
            status: status,
            selectedAbility: mypokemon.ability,
            pokemonData: state.pokemonData,
            customizedWazas: state.customizedWazas,
            effortA: mypokemon.effort_a,
            effortB: mypokemon.effort_b,
            effortC: mypokemon.effort_c,
            effortD: mypokemon.effort_d,
            effortS: mypokemon.effort_s,
            effortHP: mypokemon.effort_h,
            natureName: mypokemon.nature
          })
        } else {
          this.setState({ loading: true })
          let state: PokemonInBattleState = this.state
          state.pokemonData = this.props.pokemon
          const pokemon: PokemonInBattleState = computeStatus(state)
          const status: Status = { statusH: Math.floor(pokemon.status.statusH), statusA: Math.floor(pokemon.status.statusA), statusB: Math.floor(pokemon.status.statusB), statusC: Math.floor(pokemon.status.statusC), statusD: Math.floor(pokemon.status.statusD), statusS: Math.floor(pokemon.status.statusS)}
          this.setState({
            loading: false,
            status: status,
            selectedAbility: pokemon.pokemonData.ability1,
            pokemonData: state.pokemonData
          })
          this.props.decidion(status, this.state.selectedWaza, this.state.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
          this.setState({ customizedWazas: [dammywaza, dammywaza, dammywaza, dammywaza]})
        }
      }
    }
  }
  renderOver508 = () => {
    let allEffort: number = this.state.effortA + this.state.effortB + this.state.effortC + this.state.effortD + this.state.effortS + this.state.effortHP
    if (allEffort > 508 && window.parent.screen.width > 600) {
      return (
        <SnackbarContent
          style={{backgroundColor: 'red', height: 30}}
          message="努力値の合計が508を超えています"
        />
      )
    } else if (allEffort < 509 && window.parent.screen.width > 600) {
      return (
        <div style={{whiteSpace: 'pre-line', height: 42}}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{this.state.status.statusH + "-" +  this.state.status.statusA + "-" +  this.state.status.statusB + "-" +  this.state.status.statusC + "-" +  this.state.status.statusD + "-" +  this.state.status.statusS}</FormLabel>
            <Grid item>
              <Grid container>
                <Button onClick={this.openNature} variant="outlined" color={this.props.color === "primary" ? "primary" : 'secondary'	} style={{height: 35,width: 125}}>
                  {this.state.natureName}▼
                </Button>
                <Menu
                  id="long-menu"
                  anchorEl={this.state.isOpenNature}
                  keepMounted
                  open={Boolean(this.state.isOpenNature)}
                  onClose={this.closeNature}
                  PaperProps={{
                    style: {
                      maxHeight: 216,
                      width: 200,
                    },
                  }}
                >
                  {natures.map(nature => (
                    <MenuItem key={nature.id} selected={nature.name === this.state.natureName} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleNature(nature.name);this.closeNature(event);}}>
                      {nature.name}
                    </MenuItem>
                  ))}
                </Menu>
                <RadioGroup aria-label="position" name="position" value={this.state.effortForm} onChange={this.handleChangeEffortForm()} row>
                  <FormControlLabel
                    value="slider"
                    control={<Radio color={this.props.color === "primary" ? "primary" : 'secondary'	} />}
                    label="Slider"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="input"
                    control={<Radio color={this.props.color === "primary" ? "primary" : 'secondary'	} />}
                    label="Input"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      )
    } else {
      return (
        <div style={{whiteSpace: 'pre-line', height: 42}}>
          <FormControl component="fieldset">
            <Grid item>
              <Grid container>
                <Button onClick={this.openNature} variant="outlined" color={this.props.color === "primary" ? "primary" : 'secondary'	} style={{height: 35,width: 125}}>
                  {this.state.natureName}▼
                </Button>
                <Menu
                  id="long-menu"
                  anchorEl={this.state.isOpenNature}
                  keepMounted
                  open={Boolean(this.state.isOpenNature)}
                  onClose={this.closeNature}
                  PaperProps={{
                    style: {
                      maxHeight: 216,
                      width: 200,
                    },
                  }}
                >
                  {natures.map(nature => (
                    <MenuItem key={nature.id} selected={nature.name === this.state.natureName} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleNature(nature.name);this.closeNature(event);}}>
                      {nature.name}
                    </MenuItem>
                  ))}
                </Menu>
                <RadioGroup aria-label="position" name="position" value={this.state.effortForm} onChange={this.handleChangeEffortForm()} row>
                  <FormControlLabel
                    value="slider"
                    control={<Radio color={this.props.color === "primary" ? "primary" : 'secondary'	} />}
                    label="Slider"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="input"
                    control={<Radio color={this.props.color === "primary" ? "primary" : 'secondary'	} />}
                    label="Input"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      )
    }
  }
  renderAbility = () => {
    if (this.state.pokemonData.ability2 !== "") {
      if (this.state.pokemonData.ability3 !== "") {
        if (this.state.pokemonData.ability2 === "とうそうしん") {
          return (
            <div>
              <MenuItem selected={this.state.selectedAbility === "とうそうしん(弱化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(弱化)");this.closeAbility(event);}}>
                とうそうしん(弱化)
              </MenuItem>
              <MenuItem selected={this.state.selectedAbility === "とうそうしん(強化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(強化)");this.closeAbility(event);}}>
                とうそうしん(強化)
              </MenuItem>
              <MenuItem selected={this.state.pokemonData.ability3 === this.state.selectedAbility} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility(this.state.pokemonData.ability2);this.closeAbility(event);}}>
                {this.state.pokemonData.ability3}
              </MenuItem>
            </div>
          )
        }
        if (this.state.pokemonData.ability3 === "とうそうしん") {
          return (
            <div>
              <MenuItem selected={this.state.pokemonData.ability2 === this.state.selectedAbility} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility(this.state.pokemonData.ability2);this.closeAbility(event);}}>
                {this.state.pokemonData.ability2}
              </MenuItem>
              <MenuItem selected={this.state.selectedAbility === "とうそうしん(弱化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(弱化)");this.closeAbility(event);}}>
                とうそうしん(弱化)
              </MenuItem>
              <MenuItem selected={this.state.selectedAbility === "とうそうしん(強化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(強化)");this.closeAbility(event);}}>
                とうそうしん(強化)
              </MenuItem>
            </div>
          )
        }
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
      if (this.state.pokemonData.ability2 === "とうそうしん") {
        return (
          <div>
            <MenuItem selected={this.state.selectedAbility === "とうそうしん(弱化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(弱化)");this.closeAbility(event);}}>
              とうそうしん(弱化)
            </MenuItem>
            <MenuItem selected={this.state.selectedAbility === "とうそうしん(強化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(強化)");this.closeAbility(event);}}>
              とうそうしん(強化)
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
  renderEffortForm = () => {
    if (this.state.effortForm == "slider" && window.parent.screen.width < 600) {
      return (
        <List component="div" disablePadding dense>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>H:{this.state.effortHP}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortHP"
              value={this.state.effortHP}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortHP()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>A:{this.state.effortA}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortA"
              value={this.state.effortA}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortA()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>B:{this.state.effortB}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortB"
              value={this.state.effortB}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortB()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>C:{this.state.effortC}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortC"
              value={this.state.effortC}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortC()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>D:{this.state.effortD}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortD"
              value={this.state.effortD}
              valueLabelDisplay="auto"
              step={4}
              onChangeCommitted={this.handleChangeCommittedSlider}
              onChange={this.handleEffortD()}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>S:{this.state.effortS}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortS"
              value={this.state.effortS}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortS()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
        </List>
      )
    } else if (this.state.effortForm == "slider") {
      return (
        <List component="div" disablePadding>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>H:{this.state.effortHP}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortHP"
              value={this.state.effortHP}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortHP()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>A:{this.state.effortA}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortA"
              value={this.state.effortA}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortA()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>B:{this.state.effortB}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortB"
              value={this.state.effortB}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortB()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>C:{this.state.effortC}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortC"
              value={this.state.effortC}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortC()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>D:{this.state.effortD}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortD"
              value={this.state.effortD}
              valueLabelDisplay="auto"
              step={4}
              onChangeCommitted={this.handleChangeCommittedSlider}
              onChange={this.handleEffortD()}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>S:{this.state.effortS}    </Typography>
            <Slider
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              aria-labelledby="effortS"
              value={this.state.effortS}
              valueLabelDisplay="auto"
              step={4}
              onChange={this.handleEffortS()}
              onChangeCommitted={this.handleChangeCommittedSlider}
              min={0}
              max={252}
              style={{width: 200}}
            />
          </ListItem>
        </List>
      )
    }
    if (this.state.effortForm == "input") {
      return (
        <Grid item>
          <Typography style={{marginTop: 10, marginBottom: 0}}>努力値から入力</Typography>
          <Grid container>
            <TextField
              label="HP"
              value={this.state.effortHP}
              onChange={this.handleEffortHPInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Attack"
              value={this.state.effortA}
              onChange={this.handleEffortAInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Block"
              value={this.state.effortB}
              onChange={this.handleEffortBInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Contact"
              value={this.state.effortC}
              onChange={this.handleEffortCInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Defence"
              value={this.state.effortD}
              onChange={this.handleEffortDInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Speed"
              value={this.state.effortS}
              onChange={this.handleEffortSInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
          <Typography style={{marginTop: 0, marginBottom: 0}}>実数値から入力</Typography>
          <Grid container>
            <TextField
              label="HP"
              value={this.state.status.statusH}
              onChange={this.handleStatusHPInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Attack"
              value={this.state.status.statusA}
              onChange={this.handleStatusAInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Block"
              value={this.state.status.statusB}
              onChange={this.handleStatusBInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Contact"
              value={this.state.status.statusC}
              onChange={this.handleStatusCInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Defence"
              value={this.state.status.statusD}
              onChange={this.handleStatusDInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Speed"
              value={this.state.status.statusS}
              onChange={this.handleStatusSInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
          <Typography style={{marginTop: 0, marginBottom: 0}}>個体値を入力</Typography>
          <Grid container>
            <TextField
              label="HP"
              value={this.state.IndividualH}
              onChange={this.handleIndividualHPInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Attack"
              value={this.state.IndividualA}
              onChange={this.handleIndividualAInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Block"
              value={this.state.IndividualB}
              onChange={this.handleIndividualBInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Contact"
              value={this.state.IndividualC}
              onChange={this.handleIndividualCInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Defence"
              value={this.state.IndividualD}
              onChange={this.handleIndividualDInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
            <TextField
              label="Speed"
              value={this.state.IndividualS}
              onChange={this.handleIndividualSInput()}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              style={{width: 50, marginTop: 0, marginBottom: 0 }}
            />
          </Grid>
        </Grid>
      )
    }
  }
  handleClickOpenEffort = () => {
    this.setState({ isOpenEffort: !this.state.isOpenEffort})
    if (this.state.isOpenWaza) {
      this.setState({ isOpenWaza: false})
    }
  }
  handleClickWaza = () => {
    this.setState({ isOpenWaza: !this.state.isOpenWaza})
    if (this.state.isOpenEffort) {
      this.setState({ isOpenEffort: false})
    }
  }
  handleNature = (name: string) => {
    this.setState({ natureName: name })
    setTimeout(() => {
      const pokemon: PokemonInBattleState = computeStatus(this.state)
      const status: Status = { statusH: Math.floor(pokemon.status.statusH), statusA: Math.floor(pokemon.status.statusA), statusB: Math.floor(pokemon.status.statusB), statusC: Math.floor(pokemon.status.statusC), statusD: Math.floor(pokemon.status.statusD), statusS: Math.floor(pokemon.status.statusS)}
      this.setState({
        status: status
      })
      this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
    }, 300)
  }
  openNature = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenNature: event.currentTarget})
  }
  closeNature = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenNature: null})
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
  handleChangeEffortForm = () => (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    this.setState({ effortForm: value })
  }
  handleChangeInputWaza = (waza: waza) => {
    this.setState({ inputWaza: waza , selectedWaza: waza , wazaTime: new Date().getTime()})
    this.props.decidion(this.state.status, waza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleCheckWaza = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const selectWaza: waza | undefined = wazaData.find((element: waza) => {
      return element.name === event.target.value
    })
    if (!selectWaza) {
      alert('内部エラー')
      return
    }
    this.setState({ selectedWaza: selectWaza , wazaTime: new Date().getTime()})
    this.props.decidion(this.state.status, selectWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleCheckWazaGroup = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const selectWaza: waza | undefined = wazaData.find((element: waza) => {
      return element.name === value
    })
    if (!selectWaza) {
      alert('内部エラー')
      return
    }
    this.setState({ selectedWaza: selectWaza , wazaTime: new Date().getTime()})
    this.props.decidion(this.state.status, selectWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleAbility = (name: string) => {
    this.setState({ selectedAbility: name })
    this.props.decidion(this.state.status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem, name)
  }
  handleItem = (name: string) => {
    const item: any = availableItems.find((element) => {
      return element.name === name
    })
    this.setState({ selectedItem: item })
    this.props.decidion(this.state.status, this.state.selectedWaza, new Date().getTime(), name, this.state.selectedAbility)
  }
  handleEffortHP = () => (event: React.ChangeEvent<{}>, value: number|number[]) => {
    if (typeof value == "number") {
      this.setState({ effortHP: value })
    }
  }
  handleEffortA = () => (event: React.ChangeEvent<{}>, value: number|number[]) => {
    if (typeof value == "number") {
      this.setState({ effortA: value })
    }
  }
  handleEffortB = () => (event: React.ChangeEvent<{}>, value: number|number[]) => {
    if (typeof value == "number") {
      this.setState({ effortB: value })
    }
  }
  handleEffortC = () => (event: React.ChangeEvent<{}>, value: number|number[]) => {
    if (typeof value == "number") {
      this.setState({ effortC: value })
    }
  }
  handleEffortD = () => (event: React.ChangeEvent<{}>, value: number|number[]) => {
    if (typeof value == "number") {
      this.setState({ effortD: value })
    }
  }
  handleEffortS = () => (event: React.ChangeEvent<{}>, value: number|number[]) => {
    if (typeof value == "number") {
      this.setState({ effortS: value })
    }
  }
  handleEffortHPInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+event.target.value > 252) {
      this.setState({ effortHP: 252 })
    } else {
      this.setState({ effortHP: +event.target.value })
    }
  }
  handleEffortAInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+event.target.value > 252) {
      this.setState({ effortA: 252 })
    } else {
      this.setState({ effortA: +event.target.value })
    }
  }
  handleEffortBInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+event.target.value > 252) {
      this.setState({ effortB: 252 })
    } else {
      this.setState({ effortB: +event.target.value })
    }
  }
  handleEffortCInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+event.target.value > 252) {
      this.setState({ effortC: 252 })
    } else {
      this.setState({ effortC: +event.target.value })
    }
  }
  handleEffortDInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+event.target.value > 252) {
      this.setState({ effortD: 252 })
    } else {
      this.setState({ effortD: +event.target.value })
    }
  }
  handleEffortSInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+event.target.value > 252) {
      this.setState({ effortS: 252 })
    } else {
      this.setState({ effortS: +event.target.value })
    }
  }
  handleStatusHPInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_h + this.state.IndividualH / 2 + 252 / 8 + 60) * 1.1) {
      status.statusH =  Math.floor((this.state.pokemonData.base_h + this.state.IndividualH / 2 + 252 / 8 + 60) * 1.1)
      this.setState({ status: status })
    } else {
      status.statusH = +event.target.value
      this.setState({ status: status })
    }
    this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusAInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_a + this.state.IndividualA / 2 + 252 / 8 + 5) * 1.1) {
      status.statusA =  Math.floor((this.state.pokemonData.base_a + this.state.IndividualA / 2 + 252 / 8 + 5) * 1.1)
      this.setState({ status: status })
    } else {
      status.statusA = +event.target.value
      this.setState({ status: status })
    }
    this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusBInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_b + this.state.IndividualB / 2 + 252 / 8 + 5) * 1.1) {
      status.statusB =  Math.floor((this.state.pokemonData.base_b + this.state.IndividualB / 2 + 252 / 8 + 5) * 1.1)
      this.setState({ status: status })
    } else {
      status.statusB = +event.target.value
      this.setState({ status: status })
    }
    this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusCInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_c + this.state.IndividualC / 2 + 252 / 8 + 5) * 1.1) {
      status.statusC = Math.floor((this.state.pokemonData.base_c + this.state.IndividualC / 2 + 252 / 8 + 5) * 1.1)
    } else {
      status.statusC = +event.target.value
    }
    this.setState({ status: status })
    this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusDInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_d + this.state.IndividualD / 2 + 252 / 8 + 5) * 1.1) {
      status.statusD = Math.floor((this.state.pokemonData.base_d + this.state.IndividualD / 2 + 252 / 8 + 5) * 1.1)
    } else {
      status.statusD = +event.target.value
    }
    this.setState({ status: status })
    this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusSInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_s + this.state.IndividualS / 2 + 252 / 8 + 5) * 1.1) {
      status.statusS = Math.floor((this.state.pokemonData.base_s + this.state.IndividualS / 2 + 252 / 8 + 5) * 1.1)
    } else {
      status.statusS = +event.target.value
    }
    this.setState({ status: status })
    this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleIndividualHPInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let pastState: PokemonInBattleState = this.state
    if (+event.target.value > 31) {
      pastState.IndividualH = 31
      this.setState({ IndividualH: 31 })
    } else {
      pastState.IndividualH = +event.target.value
      this.setState({ IndividualH: +event.target.value })
    }
    pastState = computeStatus(pastState)
    this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleIndividualAInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let pastState: PokemonInBattleState = this.state
    if (+event.target.value > 31) {
      pastState.IndividualA = 31
      this.setState({ IndividualA: 31 })
    } else {
      pastState.IndividualA = +event.target.value
      this.setState({ IndividualA: +event.target.value })
    }
    pastState = computeStatus(pastState)
    this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleIndividualBInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let pastState: PokemonInBattleState = this.state
    if (+event.target.value > 31) {
      pastState.IndividualB = 31
      this.setState({ IndividualB: 31 })
    } else {
      pastState.IndividualB = +event.target.value
      this.setState({ IndividualB: +event.target.value })
    }
    pastState = computeStatus(pastState)
    this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleIndividualCInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let pastState: PokemonInBattleState = this.state
    if (+event.target.value > 31) {
      pastState.IndividualC = 31
      this.setState({ IndividualC: 31 })
    } else {
      pastState.IndividualC = +event.target.value
      this.setState({ IndividualC: +event.target.value })
    }
    pastState = computeStatus(pastState)
    this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleIndividualDInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let pastState: PokemonInBattleState = this.state
    if (+event.target.value > 31) {
      pastState.IndividualD = 31
      this.setState({ IndividualD: 31 })
    } else {
      pastState.IndividualD = +event.target.value
      this.setState({ IndividualD: +event.target.value })
    }
    pastState = computeStatus(pastState)
    this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleIndividualSInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let pastState: PokemonInBattleState = this.state
    if (+event.target.value > 31) {
      pastState.IndividualS = 31
      this.setState({ IndividualS: 31 })
    } else {
      pastState.IndividualS = +event.target.value
      this.setState({ IndividualS: +event.target.value })
    }
    pastState = computeStatus(pastState)
    this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleFC = () => {
    const fc: PokemonData[] = datas.filter((element: PokemonData) => {
      return element.number.indexOf(this.state.pokemonData.number.replace(/[^0-9]/g, '')) > -1
    })
    if (fc.length < 2) {
      return
    }
    let nowNum: number = -1
    fc.forEach((element: PokemonData, i: number) => {
      if (element.number === this.state.pokemonData.number) {
        nowNum = i
      }
    })
    if (nowNum === -1) {
      return
    }
    const fcLength: number = fc.length
    if (fcLength === nowNum + 1) {
      let pastState: PokemonInBattleState = this.state
      pastState.pokemonData = fc[0]
      pastState = computeStatus(pastState)
      const status: Status = {
        statusH: Math.floor(pastState.status.statusH),
        statusA: Math.floor(pastState.status.statusA),
        statusB: Math.floor(pastState.status.statusB),
        statusC: Math.floor(pastState.status.statusC),
        statusD: Math.floor(pastState.status.statusD),
        statusS: Math.floor(pastState.status.statusS)
      }
      this.setState({pokemonData: fc[0]})
      this.props.fc(fc[0])
      this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, pastState.selectedItem.name, pastState.selectedAbility)
    } else {
      let pastState: PokemonInBattleState = this.state
      pastState.pokemonData = fc[nowNum + 1]
      pastState = computeStatus(pastState)
      const status: Status = {
        statusH: Math.floor(pastState.status.statusH),
        statusA: Math.floor(pastState.status.statusA),
        statusB: Math.floor(pastState.status.statusB),
        statusC: Math.floor(pastState.status.statusC),
        statusD: Math.floor(pastState.status.statusD),
        statusS: Math.floor(pastState.status.statusS)
      }
      this.setState({pokemonData: fc[nowNum + 1]})
      this.props.fc(fc[nowNum + 1])
      this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, pastState.selectedItem.name, pastState.selectedAbility)
    }
  }
  computeHeight = (): number => {
    if (window.parent.screen.width < 600) {
      return 530
    } else {
      return 430
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <Card style={{ height: this.computeHeight(), width: 300 }}>
          <div>
            <CircularProgress/>
          </div>
        </Card>
      )
    }
    return (
    <Card style={{ height: this.computeHeight(), width: 300 }}>
      <CardHeader
        avatar={
          <Grid item>
            <Grid container>
              <IconButton style={{marginLeft: 0}} onClick={this.onAvatarClickHandler} >
                <ArrowBackIcon />
              </IconButton>
              <IconButton onClick={this.handleFC}>
                <PokemonIcon  number={this.state.pokemonData.number}/>
              </IconButton>
            </Grid>
          </Grid>
        }
        title={this.state.pokemonData.name}
        subheader={this.state.pokemonData.base_h + "-" +  this.state.pokemonData.base_a + "-" +  this.state.pokemonData.base_b + "-" +  this.state.pokemonData.base_c + "-" +  this.state.pokemonData.base_d + "-" +  this.state.pokemonData.base_s}
        style={{height: 26}}
      />
      <ListItem button onClick={this.handleClickWaza}>
        <ListItemText primary="わざ" />
        {this.state.isOpenWaza ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.isOpenWaza} timeout="auto" unmountOnExit>
        <Grid item>
          <Grid container>
            <Radio
              checked={this.state.selectedWaza === this.state.inputWaza}
              onChange={this.handleCheckWaza}
              value={this.state.inputWaza.name}
              color={this.props.color === "primary" ? "primary" : 'secondary'	}
              disabled={this.state.inputWaza.name === ""}
            />
            <InputAuto value={this.state.inputWaza.name} datas={wazaData.filter((element: waza) => {return(element.power > 0)})} handleInput={this.handleChangeInputWaza} />
          </Grid>
          <Grid container>
            <RadioGroup onChange={this.handleCheckWazaGroup}>
              {this.state.customizedWazas.map((waza: waza, i: number) => {
                if (i > 4) {return true}
                return (<FormControlLabel
                  value={waza.name === 'ダミー' ? '   ' : waza.name}
                  control={<Radio color={this.props.color === "primary" ? "primary" : 'secondary'	} />}
                  label={waza.name === 'ダミー' ? '   ' : waza.name}
                  labelPlacement="end"
                  style={{marginLeft: 0}}
                  key={i}
                  disabled={waza.name === 'ダミー'}
                  checked={this.state.selectedWaza ? this.state.selectedWaza.name === waza.name : false}
                />)
              })}
            </RadioGroup>
          </Grid>
        </Grid>
        <div>
          <Button onClick={this.openAbility} variant="outlined" color={this.props.color === "primary" ? "primary" : 'secondary'	} style={{height: 35,width: 250}}>
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
                width: 200,
              },
            }}
          >
            {this.state.pokemonData.ability1 === "とうそうしん" ? 
            <div>
              <MenuItem selected={this.state.selectedAbility === "とうそうしん(弱化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(弱化)");this.closeAbility(event);}}>
                とうそうしん(弱化)
              </MenuItem>
              <MenuItem selected={this.state.selectedAbility === "とうそうしん(強化)"} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility("とうそうしん(強化)");this.closeAbility(event);}}>
                とうそうしん(強化)
              </MenuItem> 
            </div> :
              <MenuItem selected={this.state.pokemonData.ability1 === this.state.selectedAbility} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleAbility(this.state.pokemonData.ability1);this.closeAbility(event);}}>
                {this.state.pokemonData.ability1}
              </MenuItem>}
            {this.renderAbility()}
          </Menu>
        </div>
        <div>
          <Button onClick={this.openItem} variant="outlined" color={this.props.color === "primary" ? "primary" : 'secondary'	} style={{height: 35,width: 250}}>
            {this.state.selectedItem.name}▼
          </Button>
          <Menu
            id="long-menu"
            anchorEl={this.state.isOpenItem}
            open={Boolean(this.state.isOpenItem)}
            onClose={this.closeItem}
            PaperProps={{
              style: {
                maxHeight: 216,
                width: 300,
              },
            }}
          >
            {availableItems.map((item: Item) => {
              return (
                <MenuItem selected={item === this.state.selectedItem} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleItem(item.name);this.closeItem(event);}}>
                  {item.name}
                </MenuItem>
              )
            })}
          </Menu>
        </div>
      </Collapse>
      <ListItem button onClick={this.handleClickOpenEffort}>
        <ListItemText primary="努力値" />
        {this.state.isOpenEffort ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.isOpenEffort} timeout="auto" unmountOnExit>
        {this.renderOver508()}
        {this.renderEffortForm()}
      </Collapse>
    </Card>
    );
  }
}
