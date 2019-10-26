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
import PokemonInBattle, { PokemonInBattleState } from './PokemonInBattle'
import { PokemonData, waza, Status } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import HPbar from './HPbar'
import { powerNature, powerItem, powerWaza, attackItems, attackNatures, defenceItems, defenceNatures, damageNature, damageItem } from './CalculateData'
import { Avatar, TextField, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Typography } from '@material-ui/core';
import { thisExpression, throwStatement } from '@babel/types';
import { DamageCalculate, CheckOptions } from './ComputeMethods'
import classes from '*.module.css';
import { element } from 'prop-types';

interface Props{
  myStatus?: Status
  myWaza?: waza
  myTime?: number
  oppoStatus?: Status
  oppoWaza?: waza
  oppoTime?: number
  mySelect?: PokemonData
  oppoSelect?: PokemonData
  myItem?: string
  oppoItem?: string
  myNature?: string
  oppoNature?: string
}

interface DamageInfo {
  waza?: waza
  time: number
  pokemon: PokemonData
  status?: Status
  item: string
  rank: number
  or?: string
  nature: string
}

interface State{
  attack?: DamageInfo
  defence?: DamageInfo
  checkOption: CheckOptions
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: { height: 430,width: 300 },
    nested: { paddingLeft: theme.spacing(4) },
    control: { padding: theme.spacing(2) },
    avatar: {
      margin: 10,
      width: 30,
      height: 30,
    },
  }),
);

export default class Calculate extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      checkOption: {attackItem: false, attackNature: false, attackWaza: false, defenceItem: false, defenceNature: false, reflect: false, light: false, aurora: false, many: false, scald: false}
    }
  }
  componentDidUpdate() {
    console.log("hi")
    if (this.props.myStatus) {console.log("msu")}
    if (this.props.myWaza) {console.log("mwa")}
    if (this.props.myTime) {console.log("mti")}
    if (this.props.mySelect) {console.log("mse")}
    if (this.props.oppoStatus) {console.log("osu")}
    if (this.props.oppoWaza) {console.log("owa")}
    if (this.props.oppoTime) {console.log("oti")}
    if (this.props.oppoSelect) {console.log("ose")}
    if (this.props.myItem) {console.log("mi")}
    if (this.props.oppoItem) {console.log("oi")}
    if (this.props.myNature) {console.log("mn")}
    if (this.props.oppoNature) {console.log("on")}
    // if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.myTime && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect && this.props.oppoTime) {
    if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect && this.props.myItem && this.props.oppoItem && this.props.myNature && this.props.oppoNature) {
      console.log("katu")
      const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: 0, rank: 0, or: "my", item: this.props.myItem, nature: this.props.myNature}
      if (this.props.myTime) {
        myState.time = this.props.myTime
      }
      const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: 0, rank: 0, or: "oppo", item: this.props.oppoItem, nature: this.props.oppoNature}
      if (this.props.oppoTime) {
        oppoState.time = this.props.oppoTime
      }
      if (myState.time > oppoState.time) {
        console.log("ta")
        if (this.state.attack) {
          console.log("ti")
          if (this.state.attack.pokemon.name != myState.pokemon.name || this.state.attack.waza != myState.waza || this.state.attack.status != myState.status) {
            console.log("katu1" + myState.pokemon.name + oppoState.pokemon.name)
            this.setState({ attack: myState , defence: oppoState})
          }
        } else {
          console.log("ta1")
          this.setState({ attack: myState , defence: oppoState})
        }
      }
      if (myState.time < oppoState.time) {
        console.log("tu")
        if (this.state.attack) {
          console.log("te")
          if (this.state.attack.pokemon.name != oppoState.pokemon.name || this.state.attack.waza != oppoState.waza || this.state.attack.status != oppoState.status) {
            console.log("katu2" + oppoState.pokemon.name + myState.pokemon.name)
            this.setState({ attack: oppoState , defence: myState})
          }
        } else {
          console.log("tu2")
          this.setState({ attack: oppoState , defence: myState})
        }
      }
    }
    if (this.props.mySelect) {
    // if (this.props.myStatus && this.props.mySelect && this.props.myTime) {
      console.log("ma")
      // const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, time: this.props.myTime, rank: 0}
      const myState: DamageInfo = {pokemon: this.props.mySelect, time: 0, rank: 0, or: "my", item: "なし", nature: this.props.mySelect.ability1}
      if (!this.state.attack) {
        console.log("mu")
        this.setState({ attack: myState })
      }
      // if (this.state.attack && !this.state.defence && this.state.attack != myState) {
      if (this.state.attack && !this.state.defence && this.state.attack.or !== "my") {
        console.log("mo")
        this.setState({ defence: myState })
      }
    }
    if (this.props.oppoSelect) {
    // if (this.props.oppoStatus && this.props.oppoSelect && this.props.oppoTime) {
      console.log("mi")
      // const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, time: this.props.oppoTime, rank: 0}
      const oppoState: DamageInfo = {pokemon: this.props.oppoSelect, time: 0, rank: 0, or: "oppo", item: "なし", nature: this.props.oppoSelect.ability1}
      if (!this.state.attack) {
        console.log("me")
        this.setState({ attack: oppoState })
      }
      // if (this.state.attack && !this.state.defence && this.state.attack != oppoState) {
        if (this.state.attack && !this.state.defence && this.state.attack.or !== "oppo") {
          console.log("ya")
          this.setState({ defence: oppoState })
      }
    }
  }
  checkNature = (side: string) => {
    if (side === "attack") {
      if (this.state.attack) {
        const now: DamageInfo = this.state.attack
        if (attackNatures.find((element) => {return(element.name === now.nature)})
          || defenceNatures.find(element => {return element.name === now.nature})
          || damageNature.find(element => {return element.name === now.nature})
          || powerNature.find(element => {return element.name === now.nature})) {
          console.log("a")
          return true
        }
        console.log("b")
        return false
      }
    }
    if (side === "defence") {
      if (this.state.defence) {
        const now: DamageInfo = this.state.defence
        if (attackNatures.find((element) => {return(element.name === now.nature)})
          || defenceNatures.find(element => {return element.name === now.nature})
          || damageNature.find(element => {return element.name === now.nature})
          || powerNature.find(element => {return element.name === now.nature})) {
          return true
        }
        return false
      }
    }
    return true
  }
  handleAttackRank = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.state.attack) {
      const attack: DamageInfo = this.state.attack
      if (+event.target.value > 6) {
        attack.rank = 6
      } else if (+event.target.value < -6) {
        attack.rank = -6
      } else {
        attack.rank = +event.target.value
      }
      this.setState({ attack: attack })
    }
  }
  handleDefenceRank = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.state.defence) {
      const defence: DamageInfo = this.state.defence
      if (+event.target.value > 6) {
        defence.rank = 6
      } else if (+event.target.value < -6) {
        defence.rank = -6
      } else {
        defence.rank = +event.target.value
      }
      this.setState({ defence: defence })
    }
  }
  handleChangeAIOption = () => {
    let checked: CheckOptions = this.state.checkOption
    checked.attackItem = !checked.attackItem
    this.setState({checkOption: checked})
  }
  handleChangeANOption = () => {
    let checked: CheckOptions = this.state.checkOption
    checked.attackNature = !checked.attackNature
    this.setState({checkOption: checked})
  }
  handleChangeWOption = () => {
    let checked: CheckOptions = this.state.checkOption
    checked.attackWaza = !checked.attackWaza
    this.setState({checkOption: checked})
  }
  handleChangeDIOption = () => {
    let checked: CheckOptions = this.state.checkOption
    checked.defenceItem = !checked.defenceItem
    this.setState({checkOption: checked})
  }
  handleChangeDNOption = () => {
    let checked: CheckOptions = this.state.checkOption
    checked.defenceNature = !checked.defenceNature
    this.setState({checkOption: checked})
  }
  damage = () => {
    console.log("damage1")
    if (this.state.attack && this.state.defence && this.state.attack.status && this.state.defence.status && this.state.attack.waza && this.state.attack.waza.type !== "ダミー") {
      const damages: number[][] = DamageCalculate(this.state.attack.status, this.state.defence.status,
        this.state.attack.waza, this.state.attack.pokemon, this.state.defence.pokemon,
        this.state.attack.rank, this.state.defence.rank, "ここにフィールド(フィールドは略)", this.state.attack.item,
        this.state.defence.item, this.state.attack.nature, this.state.defence.nature,
        this.state.checkOption, "ここにどろあそびとか", "ここに天候")
      const useDamages: number[] = []
      useDamages.push(damages[0][0] / this.state.defence.status.statusH) // minD
      useDamages.push(damages[0][15] / this.state.defence.status.statusH) //maxD
      useDamages.push(damages[1][0] / this.state.defence.status.statusH) //minCD
      useDamages.push(damages[1][15] / this.state.defence.status.statusH) //maxCD
      let i: number = -1
      let ransu: number = 0 // 0なら確定n(n>1)発
      let k: number = -1 // n(n>1)発
      for (let j = 0;j < 16; j++) {
        if (i !== -1) {
          break
        }
        if (damages[0][j] > this.state.defence.status.statusH) {
          i = j
          i = Math.round((16 - i) / 16 * 100 * 100)/100
        }
      }
      if (i === -1) {
        if (damages[0][15] > 0) {
          k = Math.ceil(this.state.defence.status.statusH / damages[0][15])
        } else {
          k = -1
        }
        if (k !== -1 && damages[0][0] * k < this.state.defence.status.statusH) {
          ransu = 1
        }
      }
      useDamages.push(i, k, ransu)
      return useDamages
    }
    return []
  }
  renderAttack = () => {
    if (this.state.attack) {
      return (
        <div style={{padding: 15, marginLeft: 40}}>
          攻
          <PokemonIcon number={this.state.attack.pokemon.number} />
          <TextField
            label="Rank"
            value={this.state.attack.rank}
            onChange={this.handleAttackRank()}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            style={{width: 50, marginTop: 0, marginBottom: 0 }}
          />
          {/* MaxDamage: {DamageCalculate(this.state.attack.status, this.state.defence.status, this.state.attack.waza, this.state.attack.pokemon, this.state.defence.pokemon)} */}
        </div>
      )
    }
    return (
      <div style={{padding: 15, marginLeft: 40}}>
        攻
        <PokemonIcon number={"000"} />
        <TextField
          label="Rank"
          value={0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          style={{width: 50, marginTop: 0, marginBottom: 0 }}
        />
      </div>
    )
  }
  renderDefence = () => {
    if (this.state.defence) {
      return (
        <div style={{padding: 15, marginLeft: 90}}>
          防
          <PokemonIcon number={this.state.defence.pokemon.number} />
          {/* 選択中の技:{this.state.defence.waza.name} */}
          <TextField
            label="Rank"
            value={this.state.defence.rank}
            onChange={this.handleDefenceRank()}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            style={{width: 50, marginTop: 0, marginBottom: 0 }}
          />
        </div>
      )
    }
    return (
      <div style={{padding: 15, marginLeft: 90}}>
        防
        <PokemonIcon number={"000"} />
        <TextField
          label="Rank"
          value={0}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          style={{width: 50, marginTop: 0, marginBottom: 0 }}
        />
      </div>
    )
  }
  renderAttackOptions = () => {
    if (this.state.attack) {
      return (
      <FormControl component="fieldset" style={{ marginLeft: 20 }}>
        <FormLabel component="legend">Attack Side Options</FormLabel>
        <Grid item>
          <Grid container>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.state.checkOption.attackItem} onChange={this.handleChangeAIOption} value="attackItem" disabled={this.state.attack.item === "なし"} />}
                label="アイテム"
                style={{width: 100}}
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkOption.attackNature} onChange={this.handleChangeANOption} value="attackNature" disabled={!this.checkNature("attack")} />}
                label="特性"
                style={{width: 100}}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </FormControl>
      )
    }
  }
  renderDefenceOptions = () => {
    if (this.state.defence) {
      return (
      <FormControl component="fieldset" style={{ marginLeft: 20 }}>
        <FormLabel component="legend">Defence Side Options</FormLabel>
        {/* <Grid item> */}
          <Grid container>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.state.checkOption.defenceItem} onChange={this.handleChangeDIOption} value="defenceItem" disabled={this.state.defence.item === "なし"} />}
                label="アイテム"
                style={{width: 100}}
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.checkOption.defenceNature} onChange={this.handleChangeDNOption} value="defenceNature" disabled={!this.checkNature("defence")} />}
                label="特性"
                style={{width: 100}}
              />
            </FormGroup>
          </Grid>
        {/* </Grid> */}
      </FormControl>
      )
    }
  }
  renderDamage = () => {
    if (this.state.attack && this.state.defence && this.state.attack.status && this.state.defence.status&& this.state.attack.waza && this.state.attack.waza.type !== "ダミー") {
      if (this.state.attack.waza.type !== "ダミー") {
        return (
          <Grid item>
            <Typography>
              ダメージ: {Math.round(this.damage()[0] * this.state.defence.status.statusH)} ~ {Math.round(this.damage()[1] * this.state.defence.status.statusH)}
            </Typography>
            <Typography>
              急所ダメージ: {this.damage()[2] * this.state.defence.status.statusH} ~ {this.damage()[3] * this.state.defence.status.statusH}
            </Typography>
            <Typography>
              {this.damage()[4] === -1 ? this.damage()[5] : this.damage()[4] + "%"}
            </Typography>
          </Grid>
        )
      }
    }
  }
  
  render() {
    return (
      <Grid container className="root" spacing={2}>
        <Grid container>
          {this.renderAttack()}
          {this.renderDefence()}
        </Grid>
        <HPbar confirmHP={this.damage()[1] ? this.damage()[1] : 0} lostHP={this.damage()[0] ? this.damage()[0] : 0}  style={{marginLeft: 60}} time={this.state.attack ? this.state.attack.time : 0} />
        {this.renderDamage()}
        {this.renderAttackOptions()}
        {this.renderDefenceOptions()}
        <div>{this.state.checkOption.attackItem }</div>
      </Grid>
    );
  }
}
