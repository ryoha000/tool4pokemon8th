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
import { Avatar } from '@material-ui/core';
import { thisExpression } from '@babel/types';

interface Props{
  myStatus?: Status
  myWaza?: waza
  myTime?: number
  oppoStatus?: Status
  oppoWaza?: waza
  oppoTime?: number
  mySelect?: PokemonData
  oppoSelect?: PokemonData
}

interface DamageInfo {
  waza: waza
  time: number
  pokemon: PokemonData
  status: Status
}

interface State{
  attack?: DamageInfo
  defence?: DamageInfo
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
    }
  }
  componentDidMount() {
    console.log("ha")
    if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.myTime && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect && this.props.oppoTime) {
      console.log("katu")
      const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: this.props.myTime}
      const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: this.props.oppoTime}
        if (this.props.myTime > this.props.oppoTime) {
          console.log("katu1")
          this.setState({ attack: myState , defence: oppoState})
        }
        if (this.props.myTime < this.props.oppoTime) {
          console.log("katu2")
          this.setState({ attack: oppoState, defence: myState })
        }
    // } else if (this.props.myStatus && this.props.myWaza && this.props.myTime && this.props.mySelect) {
    //   const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: this.props.myTime}
    //   setTimeout(() => {
    //     this.setState({ attack: myState })
    //     console.log("a")
    //   }, 100);
    // } else if (this.props.oppoStatus && this.props.oppoWaza && this.props.oppoSelect && this.props.oppoTime) {
    //   const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: this.props.oppoTime}
    //   setTimeout(() => {
    //     this.setState({ attack: oppoState })
    //     console.log("b")
    //   }, 100);
    }
  }
  componentDidUpdate() {
    console.log("hi")
    if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.myTime && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect && this.props.oppoTime) {
      console.log("katu")
      const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: this.props.myTime}
      const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: this.props.oppoTime}
      if (myState.time > oppoState.time) {
        console.log("ta")
        if (this.state.attack) {
          console.log("ti")
          if (this.state.attack.pokemon.name != myState.pokemon.name || this.state.attack.waza != myState.waza || this.state.attack.time != myState.time || this.state.attack.status != myState.status) {
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
          if (this.state.attack.pokemon.name != oppoState.pokemon.name || this.state.attack.waza != oppoState.waza || this.state.attack.time != oppoState.time || this.state.attack.status != oppoState.status) {
            console.log("katu2" + oppoState.pokemon.name + myState.pokemon.name)
            this.setState({ attack: oppoState , defence: myState})
          }
        } else {
          console.log("tu2")
          this.setState({ attack: oppoState , defence: myState})
        }
      }
    }
  }
  renderAttack = () => {
    if (this.state.attack) {
      return (
        <div>
          <PokemonIcon number={this.state.attack.pokemon.number} />
          選択中の技:{this.state.attack.waza.name}
        </div>
      )
    }
    return (
      <PokemonIcon number={"000"} />
    )
  }
  renderDefence = () => {
    if (this.state.defence) {
      return (
        <div>
          <PokemonIcon number={this.state.defence.pokemon.number} />
          選択中の技:{this.state.defence.waza.name}
        </div>
      )
    }
    return (
      <PokemonIcon number={"000"} />
    )
  }
  
  render() {
    return (
      <Grid container className="root" spacing={2}>
        <Grid container>
          {this.renderAttack()}
          {this.renderDefence()}
        </Grid>
        <HPbar/>
      </Grid>
    );
  }
}
