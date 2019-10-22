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
import { Avatar, TextField } from '@material-ui/core';
import { thisExpression } from '@babel/types';
import { DamageCalculate } from './ComputeMethods'

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
  waza?: waza
  time: number
  pokemon: PokemonData
  status?: Status
  rank: number
  or?: string
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
  // componentDidMount() {
  //   console.log("ha")
  //   if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.myTime && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect && this.props.oppoTime) {
  //     console.log("katu")
  //     const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: this.props.myTime, rank: 0}
  //     const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: this.props.oppoTime, rank: 0}
  //       if (this.props.myTime > this.props.oppoTime) {
  //         console.log("katu1")
  //         this.setState({ attack: myState , defence: oppoState})
  //       }
  //       if (this.props.myTime < this.props.oppoTime) {
  //         console.log("katu2")
  //         this.setState({ attack: oppoState, defence: myState })
  //       }
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
  //   }
  // }
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
    // if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.myTime && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect && this.props.oppoTime) {
    if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect) {
      console.log("katu")
      const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: 0, rank: 0, or: "my"}
      if (this.props.myTime) {
        myState.time = this.props.myTime
      }
      const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: 0, rank: 0, or: "oppo"}
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
      const myState: DamageInfo = {pokemon: this.props.mySelect, time: 0, rank: 0, or: "my"}
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
      const oppoState: DamageInfo = {pokemon: this.props.oppoSelect, time: 0, rank: 0, or: "oppo"}
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
  
  render() {
    return (
      <Grid container className="root" spacing={2}>
        <Grid container>
          {this.renderAttack()}
          {this.renderDefence()}
        </Grid>
        <HPbar confirmHP={240} style={{marginLeft: 60}} />
      </Grid>
    );
  }
}
