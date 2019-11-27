import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import  { PokemonData, waza, Status}  from './shared';
import { computeStatus, natures } from './ComputeMethods'
import { CircularProgress, Slider, ListItem, ListItemText, List, ListItemAvatar, SnackbarContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Fab, Button, Grid, Menu, MenuItem, Select, Icon, TextField, Divider } from '@material-ui/core';
import PokemonIcon from './PokemonIcon'
import {PokemonInBattleState} from './PokemonInBattle'
import InputAutoNature from './InputAutoNature'
import { SendData } from './Register'

interface Props{
  pokemon?: PokemonData;
  pokemons: PokemonData[];
  wazas: waza[];
  color: string;
  sendPokemonStatus: any;
  nowDetail?: SendData
}

export default class PokemonStatus extends React.Component<Props,PokemonInBattleState> {
  constructor(props: any) {
    super(props);
    this.state = {
      memo: '',
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
      effortHP: 0,
      effortA: 0,
      effortB: 0,
      effortC: 0,
      effortD: 0,
      effortS: 0,
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
  componentDidUpdate = () => {
    if (this.props.pokemon) {
      if (this.props.pokemon !== this.state.pokemonData) {
        this.setState({ pokemonData: this.props.pokemon})
        let state: PokemonInBattleState = this.state
        state.pokemonData = this.props.pokemon
        const pokemon: PokemonInBattleState = computeStatus(state)
        const status: Status = { statusH: Math.floor(pokemon.status.statusH), statusA: Math.floor(pokemon.status.statusA), statusB: Math.floor(pokemon.status.statusB), statusC: Math.floor(pokemon.status.statusC), statusD: Math.floor(pokemon.status.statusD), statusS: Math.floor(pokemon.status.statusS)}
        this.setState({
          loading: false,
          status: status,
          selectedAbility: pokemon.pokemonData.ability1
        })
        if (this.props.nowDetail) {
          const det: SendData = this.props.nowDetail
          if (!det.efforts) {
            det.efforts =  {effort_h: 0, effort_a: 0, effort_b: 0, effort_c: 0, effort_d: 0, effort_s: 0}
          }
          if (
            det.efforts.effort_a !== this.state.effortA ||
            det.efforts.effort_b !== this.state.effortB ||
            det.efforts.effort_c !== this.state.effortC ||
            det.efforts.effort_d !== this.state.effortD ||
            det.efforts.effort_s !== this.state.effortS ||
            det.efforts.effort_h !== this.state.effortHP ||
            det.name !== this.state.pokemonName ||
            det.nature !== this.state.natureName
          ) {
            this.setState({
              pokemonData: this.props.pokemon,
              selectedAbility: det.ability ? det.ability : '',
              pokemonName: det.name,
              natureName: det.nature ? det.nature : 'ようき',
              effortA: det.efforts.effort_a,
              effortB: det.efforts.effort_b,
              effortC: det.efforts.effort_c,
              effortD: det.efforts.effort_d,
              effortS: det.efforts.effort_s,
              effortHP: det.efforts.effort_h,
            })
            return
          }
        } else {
          this.props.sendPokemonStatus(this.state.effortHP, this.state.effortA, this.state.effortB, this.state.effortC, this.state.effortD, this.state.effortS, this.state.pokemonName, this.state.natureName)
        }
      } else {
        if (this.props.nowDetail) {
          const det: SendData = this.props.nowDetail
          if (!det.efforts) {
            det.efforts =  {effort_h: 0, effort_a: 0, effort_b: 0, effort_c: 0, effort_d: 0, effort_s: 0}
          }
          if (this.props.nowDetail.id) {
            if (
              det.efforts.effort_a !== this.state.effortA ||
              det.efforts.effort_b !== this.state.effortB ||
              det.efforts.effort_c !== this.state.effortC ||
              det.efforts.effort_d !== this.state.effortD ||
              det.efforts.effort_s !== this.state.effortS ||
              det.efforts.effort_h !== this.state.effortHP ||
              det.name !== this.state.pokemonName ||
              det.nature !== this.state.natureName
            ) {
              this.setState({
                pokemonData: this.props.pokemon,
                selectedAbility: det.ability ? det.ability : '',
                pokemonName: det.name,
                natureName: det.nature ? det.nature : 'ようき',
                effortA: det.efforts.effort_a,
                effortB: det.efforts.effort_b,
                effortC: det.efforts.effort_c,
                effortD: det.efforts.effort_d,
                effortS: det.efforts.effort_s,
                effortHP: det.efforts.effort_h,
              })
              return
            }
          } else {
            if (
              det.efforts.effort_a !== this.state.effortA ||
              det.efforts.effort_b !== this.state.effortB ||
              det.efforts.effort_c !== this.state.effortC ||
              det.efforts.effort_d !== this.state.effortD ||
              det.efforts.effort_s !== this.state.effortS ||
              det.efforts.effort_h !== this.state.effortHP ||
              det.name !== this.state.pokemonName ||
              det.nature !== this.state.natureName
            ) {
              this.props.sendPokemonStatus(this.state.effortHP, this.state.effortA, this.state.effortB, this.state.effortC, this.state.effortD, this.state.effortS, this.state.pokemonName, this.state.natureName)
            }
          }
        } else {
          this.props.sendPokemonStatus(this.state.effortHP, this.state.effortA, this.state.effortB, this.state.effortC, this.state.effortD, this.state.effortS, this.state.pokemonName, this.state.natureName)
        }
      }
    }
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
  }
  componentDidMount() {
    const wazaLabels: any = []
    this.props.wazas.forEach((element) => {
      wazaLabels.push({lanel: element.name})
    })
    this.setState({ wazaLabel: wazaLabels })
    if (this.props.pokemon) {
      if (this.state.pokemonData.name != this.props.pokemon.name) {
        this.setState({ loading: true })
        const pokemon: PokemonData = this.props.pokemon
        this.setState({ pokemonData: pokemon })
        if (!pokemon) { alert("指定されたポケモン名が不正です。再起動してみてください") }
        setTimeout(() => {
          const pokemon: PokemonInBattleState = computeStatus(this.state)
          const status: Status = { statusH: Math.floor(pokemon.status.statusH), statusA: Math.floor(pokemon.status.statusA), statusB: Math.floor(pokemon.status.statusB), statusC: Math.floor(pokemon.status.statusC), statusD: Math.floor(pokemon.status.statusD), statusS: Math.floor(pokemon.status.statusS)}
          this.setState({
            loading: false,
            status: status,
            selectedAbility: pokemon.pokemonData.ability1,
            pokemonName: undefined,
            natureName: "ようき"
          })
          
        },50)
      }
    }
    this.setState({ customizedWazas: [{ name:"げきりん",	type:"ドラゴン", power:120,	accuracy:100,	species:"物理"}, {name:"じしん", type:"じめん",	power:100, accuracy:100, species:"物理"}, {name:"つるぎのまい",	type:"ノーマル", power:0,	accuracy:0,	species:"変化"}, {name:"ほのおのキバ", type:"ほのお",	power:65,	accuracy:95, species:"物理"}]})
  }
  renderOver508 = () => {
    let allEffort: number = this.state.effortA + this.state.effortB + this.state.effortC + this.state.effortD + this.state.effortS + this.state.effortHP
    if (allEffort > 508) {
      return (
        <SnackbarContent
          style={{backgroundColor: 'red', height: 30}}
          message="努力値の合計が508を超えています"
        />
      )
    } else {
      return (
        <div style={{whiteSpace: 'pre-line', height: 42}}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{this.state.status.statusH + "-" +  this.state.status.statusA + "-" +  this.state.status.statusB + "-" +  this.state.status.statusC + "-" +  this.state.status.statusD + "-" +  this.state.status.statusS}</FormLabel>
            <Grid item>
              <Grid container>
                <RadioGroup aria-label="position" name="position" value={this.state.effortForm} onChange={this.handleChangeEffortForm()} row>
                  <FormControlLabel
                    disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
                    value="slider"
                    control={<Radio color={this.props.color === "primary" ? "primary" : 'secondary'	} />}
                    label="Slider"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="input"
                    disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
  renderEffortForm = () => {
    if (this.state.effortForm == "slider") {
      return (
        <List component="div" disablePadding>
          <ListItem className="nested">
            <Typography style={{whiteSpace: 'break-spaces', width: 70}}>H:{this.state.effortHP}    </Typography>
            <Slider
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
              disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
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
  handleNature = (name: string) => {
    this.setState({ natureName: name })
    setTimeout(() => {
      const pokemon: PokemonInBattleState = computeStatus(this.state)
      const status: Status = { statusH: Math.floor(pokemon.status.statusH), statusA: Math.floor(pokemon.status.statusA), statusB: Math.floor(pokemon.status.statusB), statusC: Math.floor(pokemon.status.statusC), statusD: Math.floor(pokemon.status.statusD), statusS: Math.floor(pokemon.status.statusS)}
      this.setState({
        status: status
      })
      // this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
    }, 300)
  }
  handlePokemonName = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name: string = event.target.value
    this.setState({pokemonName: name})
  }
  handleChangeEffortForm = () => (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    this.setState({ effortForm: value })
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
    // this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusCInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_c + this.state.IndividualC / 2 + 252 / 8 + 5) * 1.1) {
      status.statusC = Math.floor((this.state.pokemonData.base_c + this.state.IndividualC / 2 + 252 / 8 + 5) * 1.1)
    } else {
      status.statusC = +event.target.value
    }
    this.setState({ status: status })
    // this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusDInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_d + this.state.IndividualD / 2 + 252 / 8 + 5) * 1.1) {
      status.statusD = Math.floor((this.state.pokemonData.base_d + this.state.IndividualD / 2 + 252 / 8 + 5) * 1.1)
    } else {
      status.statusD = +event.target.value
    }
    this.setState({ status: status })
    // this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
  }
  handleStatusSInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const status: Status = this.state.status
    if (+event.target.value > (this.state.pokemonData.base_s + this.state.IndividualS / 2 + 252 / 8 + 5) * 1.1) {
      status.statusS = Math.floor((this.state.pokemonData.base_s + this.state.IndividualS / 2 + 252 / 8 + 5) * 1.1)
    } else {
      status.statusS = +event.target.value
    }
    this.setState({ status: status })
    // this.props.decidion(status, this.state.selectedWaza, new Date().getTime(), this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
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
    // this.props.decidion(pastState.status, pastState.selectedWaza, pastState.wazaTime, this.state.selectedItem.name, this.state.selectedAbility)
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
      <CardHeader
      avatar={
        <PokemonIcon number={this.state.pokemonData.number}/>
      }
      title={this.state.pokemonData.name}
      subheader={this.state.pokemonData.base_h + "-" +  this.state.pokemonData.base_a + "-" +  this.state.pokemonData.base_b + "-" +  this.state.pokemonData.base_c + "-" +  this.state.pokemonData.base_d + "-" +  this.state.pokemonData.base_s}
      style={{height: 26}}
      />
      <TextField
        disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
        placeholder='登録名'
        value={this.state.pokemonName? this.state.pokemonName : ''}
        onChange={this.handlePokemonName()}
        margin="normal"
      />
      <InputAutoNature
        handleInput={this.handleNature}
        disabled={this.props.nowDetail ? this.props.nowDetail.id !== undefined : false}
        value={this.state.natureName}
      />
      <Divider style={{marginTop: 3}} />
			{this.renderOver508()}
      {this.renderEffortForm()}
    </Card>
    );
  }
}
