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
import { Avatar, TextField, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { DamageCalculate, CheckOptions } from './ComputeMethods'

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
  isOpenField: any
  field: string
  isOpenWeather: any
  weather: string
  isOpenOthers: any
}

const allField: string[] = [
  "なし", "エレキ", "サイコ", "グラス", "ミスト"
]

const allWeather: string[] = [
  "なし", "すなあらし", "あめ", "はれ", "あられ"
]

export default class Calculate extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      isOpenField: null,
      field: "なし",
      isOpenWeather: null,
      weather: "なし",
      isOpenOthers: null,
      checkOption: {attackItem: true, attackNature: true, attackWaza: false, defenceItem: false, defenceNature: true, reflect: false, light: false, aurora: false, many: false, scald: false, water: false, mad: false, cross: false}
    }
  }
  componentDidUpdate() {
    if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect && this.props.myItem && this.props.oppoItem && this.props.myNature && this.props.oppoNature) {
      const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: 0, rank: 0, or: "my", item: this.props.myItem, nature: this.props.myNature}
      if (this.props.myTime) {
        myState.time = this.props.myTime
      }
      const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: 0, rank: 0, or: "oppo", item: this.props.oppoItem, nature: this.props.oppoNature}
      if (this.props.oppoTime) {
        oppoState.time = this.props.oppoTime
      }
      if (myState.time > oppoState.time) {
        if (this.state.attack) {
          if (this.state.attack.pokemon.name != myState.pokemon.name || this.state.attack.waza != myState.waza || this.state.attack.status != myState.status) {
            this.setState({ attack: myState , defence: oppoState})
          }
        } else {
          this.setState({ attack: myState , defence: oppoState})
        }
      }
      if (myState.time < oppoState.time) {
        if (this.state.attack) {
          if (this.state.attack.pokemon.name != oppoState.pokemon.name || this.state.attack.waza != oppoState.waza || this.state.attack.status != oppoState.status) {
            this.setState({ attack: oppoState , defence: myState})
          }
        } else {
          this.setState({ attack: oppoState , defence: myState})
        }
      }
    }
    if (this.props.mySelect) {
      const myState: DamageInfo = {pokemon: this.props.mySelect, time: 0, rank: 0, or: "my", item: "なし", nature: this.props.mySelect.ability1}
      if (!this.state.attack) {
        this.setState({ attack: myState })
      }
      if (this.state.attack && !this.state.defence && this.state.attack.or !== "my") {
        this.setState({ defence: myState })
      }
    }
    if (this.props.oppoSelect) {
      const oppoState: DamageInfo = {pokemon: this.props.oppoSelect, time: 0, rank: 0, or: "oppo", item: "なし", nature: this.props.oppoSelect.ability1}
      if (!this.state.attack) {
        this.setState({ attack: oppoState })
      }
        if (this.state.attack && !this.state.defence && this.state.attack.or !== "oppo") {
          this.setState({ defence: oppoState })
      }
    }
  }
  checkNature = (side: string) => {
    if (side === "attack") {
      if (this.state.attack) {
        const now: DamageInfo = this.state.attack
        if (attackNatures.find((element) => {return(element.name === now.nature)})
          || damageNature.find(element => {return element.name === now.nature})
          || powerNature.find(element => {return element.name === now.nature})
          || "はりきり" === now.nature
          || "てきおうりょく" === now.nature) {
          return true
        }
        return false
      }
    }
    if (side === "defence") {
      if (this.state.defence) {
        const now: DamageInfo = this.state.defence
        if (defenceNatures.find(element => {return element.name === now.nature})
          || damageNature.find(element => {return element.name === now.nature})
          || "たいねつ" === now.nature
          || "あついしぼう" === now.nature
          || "もらいび" === now.nature) {
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
    if (this.state.attack && this.state.defence && this.state.attack.status && this.state.defence.status && this.state.attack.waza && this.state.attack.waza.type !== "ダミー") {
      const damages: number[][] = DamageCalculate(this.state.attack.status, this.state.defence.status,
        this.state.attack.waza, this.state.attack.pokemon, this.state.defence.pokemon,
        this.state.attack.rank, this.state.defence.rank, this.state.field, this.state.attack.item,
        this.state.defence.item, this.state.attack.nature, this.state.defence.nature,
        this.state.checkOption, this.state.weather)
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
  natureFontSize = (num: number) => {
    if (num < 6) {
      return 16
    }
    if (num === 6) {
      return 14
    }
    if (num === 7) {
      return 12
    }
    if (num > 7) {
      return 13
    }
  }
  renderRansu = (n1: number, n2: number, n3: number) => {
    if (n1 === -1) {
      if (n3 === 0) {
        if (n2 === -1) {
          return 'ダメージなし'
        }
        return '確定' + n2 + '発'
      } else {
        return '乱数' + n2 + '発'
      }
    } else {
      if (n1 === 100) {
        return '確定1発'
      } else {
        return '乱数1発(' + n1 + '%)'
      }
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
  openField = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenField: event.currentTarget})
  }
  closeField = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenField: null})
  }
  handleField = (field: string) => {
    this.setState({ field: field })
  }
  fieldColor = (): string => {
    if (this.state.field === "ミスト") {
      return "#87cefa"
    }
    if (this.state.field === "サイコ") {
      return "#ee82ee"
    }
    if (this.state.field === "グラス") {
      return "#90ee90"
    }
    if (this.state.field === "エレキ") {
      return "#ffff00"
    }
    return "#ffffff"
  }
  openWeather = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenWeather: event.currentTarget})
  }
  closeWeather = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenWeather: null})
  }
  handleWeather = (weather: string) => {
    this.setState({ weather: weather })
  }
  openOthers = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenOthers: event.currentTarget})
  }
  closeOthers = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenOthers: null})
  }
  handleMany = () => {
    let now: CheckOptions = this.state.checkOption
    now.many = !now.many
    this.setState({ checkOption: now })
  }
  handleWater = () => {
    let now: CheckOptions = this.state.checkOption
    now.water = !now.water
    this.setState({ checkOption: now })
  }
  handleMad = () => {
    let now: CheckOptions = this.state.checkOption
    now.mad = !now.mad
    this.setState({ checkOption: now })
  }
  handleScald = () => {
    let now: CheckOptions = this.state.checkOption
    now.scald = !now.scald
    this.setState({ checkOption: now })
  }
  handleReflect = () => {
    let now: CheckOptions = this.state.checkOption
    now.reflect = !now.reflect
    this.setState({ checkOption: now })
  }
  handleLight = () => {
    let now: CheckOptions = this.state.checkOption
    now.light = !now.light
    this.setState({ checkOption: now })
  }
  handleAurora = () => {
    let now: CheckOptions = this.state.checkOption
    now.aurora = !now.aurora
    this.setState({ checkOption: now })
  }
  handleCross = () => {
    let now: CheckOptions = this.state.checkOption
    now.cross = !now.cross
    this.setState({ checkOption: now })
  }
  weatherColor = (): string => {
    if (this.state.weather === "はれ") {
      return "#ff6347"
    }
    if (this.state.weather === "すなあらし") {
      return "#f5deb3"
    }
    if (this.state.weather === "あめ") {
      return "#00bfff"
    }
    if (this.state.weather === "あられ") {
      return "#00ffff"
    }
    return "#ffffff"
  }
  renderOptions = () => {
    if (this.state.attack && this.state.defence) {
      return (
        <Grid>
          <FormControl component="fieldset" style={{ marginLeft: 20, marginTop: 5 }}>
            <FormLabel component="legend">Options</FormLabel>
            <FormGroup row>
              <Checkbox checked={this.state.checkOption.attackNature && this.checkNature("attack")} onChange={this.handleChangeANOption} value="attackNature" style={{margin: 0}} disabled={!this.checkNature("attack")} />
              <Typography style={{width: 90, marginTop: this.state.attack.nature.length > 6 ? 11 : 9, marginLeft: 0, fontSize: this.natureFontSize(this.state.attack.nature.length)}}>{this.state.attack.nature.length > 7 ? "とう..." + this.state.attack.nature.slice(-4) : this.state.attack.nature}</Typography>
              <Checkbox checked={this.state.checkOption.defenceNature && this.checkNature("defence")} onChange={this.handleChangeDNOption} value="defenceNature" style={{margin: 0}} disabled={!this.checkNature("defence")} />
              <Typography style={{width: 90, marginTop: this.state.defence.nature.length > 6 ? 11 : 9, marginLeft: 0, fontSize: this.natureFontSize(this.state.defence.nature.length)}}>{this.state.defence.nature.length > 7 ? "とう..." + this.state.defence.nature.slice(-4) : this.state.defence.nature}</Typography>
            </FormGroup>
          </FormControl>
          <Button onClick={this.openField} variant="outlined" style={{height: 35,width: 250, backgroundColor: this.fieldColor()}}>
            {this.state.field === "なし" ? "フィールド: なし" : this.state.field + "フィールド"}▼
          </Button>
          <Menu
            id="long-menu"
            anchorEl={this.state.isOpenField}
            open={Boolean(this.state.isOpenField)}
            onClose={this.closeField}
            PaperProps={{
              style: {
                maxHeight: 216,
                width: 300,
              },
            }}
          >
            {allField.map((field: string) => {
              return (
                <MenuItem selected={field === this.state.field} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleField(field);this.closeField(event);}}>
                  {field === "なし" ? field : field + "フィールド"}
                </MenuItem>
              )
            })}
          </Menu>
          <Button onClick={this.openWeather} variant="outlined" style={{height: 35,width: 250, backgroundColor: this.weatherColor()}}>
            {this.state.weather === "なし" ? "天候: なし" : this.state.weather}▼
          </Button>
          <Menu
            id="long-menu"
            anchorEl={this.state.isOpenWeather}
            open={Boolean(this.state.isOpenWeather)}
            onClose={this.closeWeather}
            PaperProps={{
              style: {
                maxHeight: 216,
                width: 300,
              },
            }}
          >
            {allWeather.map((weather: string) => {
              return (
                <MenuItem selected={weather === this.state.weather} onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleWeather(weather);this.closeWeather(event);}}>
                  {weather}
                </MenuItem>
              )
            })}
          </Menu>
          <Button onClick={this.openOthers} variant="outlined" style={{height: 35,width: 250}}>
            その他▼
          </Button>
          <Menu
            id="long-menu"
            anchorEl={this.state.isOpenOthers}
            open={Boolean(this.state.isOpenOthers)}
            onClose={this.closeOthers}
            PaperProps={{
              style: {
                maxHeight: 216,
                width: 300,
              },
            }}
          >
            <MenuItem>
              <Checkbox checked={this.state.checkOption.reflect} onChange={this.handleReflect} style={{margin: 0}}/>
              <Typography onClick={this.handleReflect} style={{width: 90, marginTop: 9, marginLeft: 0}}>リフレクター</Typography>
            </MenuItem>
            <MenuItem>
              <Checkbox checked={this.state.checkOption.light} onChange={this.handleLight} style={{margin: 0}}/>
              <Typography onClick={this.handleLight} style={{width: 90, marginTop: 9, marginLeft: 0}}>ひかりのかべ</Typography>
            </MenuItem>
            <MenuItem>
              <Checkbox checked={this.state.checkOption.aurora} onChange={this.handleAurora} style={{margin: 0}}/>
              <Typography onClick={this.handleAurora} style={{width: 90, marginTop: 9, marginLeft: 0}}>オーロラベール</Typography>
            </MenuItem>
            <MenuItem>
              <Checkbox checked={this.state.checkOption.scald} onChange={this.handleScald} style={{margin: 0}}/>
              <Typography onClick={this.handleScald} style={{width: 90, marginTop: 9, marginLeft: 0}}>やけど(攻撃側)</Typography>
            </MenuItem>
            <MenuItem>
              <Checkbox checked={this.state.checkOption.many} onChange={this.handleMany} style={{margin: 0}}/>
              <Typography onClick={this.handleMany} style={{width: 90, marginTop: 9, marginLeft: 0}}>ダブルバトル</Typography>
            </MenuItem>
            <MenuItem>
              <Checkbox checked={this.state.checkOption.water} onChange={this.handleWater} style={{margin: 0}}/>
              <Typography onClick={this.handleWater} style={{width: 90, marginTop: 9, marginLeft: 0}}>みずあそび</Typography>
            </MenuItem>
            <MenuItem>
              <Checkbox checked={this.state.checkOption.mad} onChange={this.handleMad} style={{margin: 0}}/>
              <Typography onClick={this.handleMad} style={{width: 90, marginTop: 9, marginLeft: 0}}>どろあそび</Typography>
            </MenuItem>
            <MenuItem>
              <Checkbox checked={this.state.checkOption.cross} onChange={this.handleCross} style={{margin: 0}}/>
              <Typography onClick={this.handleCross} style={{width: 90, marginTop: 9, marginLeft: 0}}>ダブルバトル</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      )
    }
  }
  renderDamage = () => {
    if (this.state.attack && this.state.defence && this.state.attack.status && this.state.defence.status&& this.state.attack.waza && this.state.attack.waza.type !== "ダミー") {
      if (this.state.attack.waza.type !== "ダミー") {
        return (
          <Grid item >
            <Typography align='center'>
              ダメージ: {Math.round(this.damage()[0] * this.state.defence.status.statusH)} ~ {Math.round(this.damage()[1] * this.state.defence.status.statusH)}
            </Typography>
            <Typography align='center'>
              急所ダメージ: {Math.round(this.damage()[2] * this.state.defence.status.statusH)} ~ {Math.round(this.damage()[3] * this.state.defence.status.statusH)}
            </Typography>
            <Typography align='center'>
              {this.renderRansu(this.damage()[4], this.damage()[5], this.damage()[6])}
            </Typography>
          </Grid>
        )
      }
    }
  }
  render() {
    return (
      <Grid>
        <Grid container>
          {this.renderAttack()}
          {this.renderDefence()}
        </Grid>
        <HPbar confirmHP={this.damage()[1] ? this.damage()[1] : 0} lostHP={this.damage()[0] ? this.damage()[0] : 0}  style={{marginLeft: 60}} time={this.state.attack ? this.state.attack.time : 0} />
        {this.renderDamage()}
        <Grid container>
          {this.renderOptions()}
        </Grid>
      </Grid>
    );
  }
}
