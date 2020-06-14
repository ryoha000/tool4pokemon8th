import React from 'react';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { PokemonData, waza, Status } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import HPbar from './HPbar'
import { powerNature, powerItem, powerWaza, attackItems, attackNatures, defenceItems, defenceNatures, damageNature, damageItem } from './CalculateData'
import { Avatar, TextField, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Typography, Button, Menu, MenuItem, IconButton } from '@material-ui/core';
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
  atkDmax: boolean
  defDmax: boolean
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
      atkDmax: false,
      defDmax: false,
      isOpenField: null,
      field: "なし",
      isOpenWeather: null,
      weather: "なし",
      isOpenOthers: null,
      checkOption: {
        attackItem: true,
        attackNature: true,
        attackWaza: false,
        defenceItem: false,
        defenceNature: true,
        reflect: false,
        light: false,
        aurora: false,
        many: false,
        scald: false,
        water: false,
        mad: false,
        cross: false,
        dmax: false
      }
    }
  }
  componentDidUpdate() {
    if (this.props.myStatus && this.props.oppoStatus && this.props.myWaza && this.props.mySelect && this.props.oppoWaza && this.props.oppoSelect) {
      const myState: DamageInfo = {status: this.props.myStatus, pokemon: this.props.mySelect, waza: this.props.myWaza, time: 0, rank: 0, or: "my", item: this.props.myItem ? this.props.myItem : 'なし', nature: this.props.myNature ? this.props.myNature : this.props.mySelect.ability1}
      if (this.props.myTime) {
        myState.time = this.props.myTime
      }
      const oppoState: DamageInfo = {status: this.props.oppoStatus, pokemon: this.props.oppoSelect, waza: this.props.oppoWaza, time: 0, rank: 0, or: "oppo", item: this.props.oppoItem ? this.props.oppoItem : 'なし', nature: this.props.oppoNature ? this.props.oppoNature : this.props.oppoSelect.ability1}
      if (this.props.oppoTime) {
        oppoState.time = this.props.oppoTime
      }
      if (myState.time > oppoState.time) {
        if (this.state.attack) {
          myState.rank = this.state.attack.rank
          if (this.state.defence) {
            oppoState.rank = this.state.defence.rank
          }
          if (this.state.attack.pokemon.name !== myState.pokemon.name || this.state.attack.waza !== myState.waza || this.state.attack.status !== myState.status || this.state.attack.item !== myState.item || this.state.attack.nature !== myState.nature || this.state.attack.rank !== myState.rank) {
            this.setState({ attack: myState , defence: oppoState})
          }
        } else {
          if (this.state.defence) {
            oppoState.rank = this.state.defence.rank
          }
          this.setState({ attack: myState , defence: oppoState})
        }
        if (this.state.defence) {
          oppoState.rank = this.state.defence.rank
          if (this.state.attack) {
            myState.rank = this.state.attack.rank
          }
          if (this.state.defence.pokemon.name !== oppoState.pokemon.name ||
            this.state.defence.waza !== oppoState.waza ||
            this.state.defence.status !== oppoState.status ||
            this.state.defence.item !== oppoState.item ||
            this.state.defence.nature !== oppoState.nature ||
            this.state.defence.rank !== oppoState.rank) {
            this.setState({ attack: myState , defence: oppoState})
          }
        }
      }
      if (myState.time < oppoState.time) {
        if (this.state.attack) {
          oppoState.rank = this.state.attack.rank
          if (this.state.defence) {
            myState.rank = this.state.defence.rank
          }
          if (this.state.attack.pokemon.name !== oppoState.pokemon.name || this.state.attack.waza !== oppoState.waza || this.state.attack.status !== oppoState.status || this.state.attack.item !== oppoState.item || this.state.attack.nature !== oppoState.nature || this.state.attack.rank !== oppoState.rank) {
            this.setState({ attack: oppoState , defence: myState})
          }
        } else {
          if (this.state.defence) {
            myState.rank = this.state.defence.rank
          }
          this.setState({ attack: oppoState , defence: myState})
        }
        if (this.state.defence) {
          myState.rank = this.state.defence.rank
          if (this.state.attack) {
            oppoState.rank = this.state.attack.rank
          }
          if (this.state.defence.pokemon.name !== myState.pokemon.name ||
            this.state.defence.waza !== myState.waza ||
            this.state.defence.status !== myState.status ||
            this.state.defence.item !== myState.item ||
            this.state.defence.nature !== myState.nature ||
            this.state.defence.rank !== myState.rank) {
            this.setState({ attack: oppoState , defence: myState})
          }
        }
      }
    }
    if (this.props.mySelect) {
      const myState: DamageInfo = {pokemon: this.props.mySelect, time: 0, rank: 0, or: "my", item: "なし", nature: this.props.mySelect.ability1}
      if (this.props.myWaza) {
        myState.waza = this.props.myWaza
      }
      if (!this.state.attack) {
        this.setState({ attack: myState })
      }
      if (this.state.attack && !this.state.defence && this.state.attack.or !== "my") {
        this.setState({ defence: myState })
      }
    }
    if (this.props.oppoSelect) {
      const oppoState: DamageInfo = {pokemon: this.props.oppoSelect, time: 0, rank: 0, or: "oppo", item: "なし", nature: this.props.oppoSelect.ability1}
      if (this.props.oppoWaza) {
        oppoState.waza = this.props.oppoWaza
      }
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
        if (now.nature === 'すいほう'
          || defenceNatures.find(element => {return element.name === now.nature})
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
  checkWaza = () => {
    if (this.state.attack) {
      const now: DamageInfo = this.state.attack
      if (!now.waza) {
        return true
      }
      if (now.waza !== undefined) {
        if (powerWaza.find((element) => {return(now.waza ? element.name === now.waza.name : element.name === 'aaaaaaaaa')})) {
          return true
        }
      }
      return false
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
      let HP: number = this.state.defence.status.statusH
      if (this.state.defDmax) {
        HP = HP * 2
      }
      useDamages.push(damages[0][0] / HP) // minD
      useDamages.push(damages[0][15] / HP) //maxD
      useDamages.push(damages[1][0] / HP) //minCD
      useDamages.push(damages[1][15] / HP) //maxCD
      let i: number = -1
      let ransu: number = 0 // 0なら確定n(n>1)発
      let k: number = -1 // n(n>1)発
      for (let j = 0;j < 16; j++) {
        if (i !== -1) {
          break
        }
        if (damages[0][j] > HP) {
          i = j
          i = Math.round((16 - i) / 16 * 100 * 100)/100
        }
      }
      if (i === -1) {
        if (damages[0][15] > 0) {
          k = Math.ceil(HP / damages[0][15])
        } else {
          k = -1
        }
        if (k !== -1 && damages[0][0] * k < HP) {
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
  handleAtkDmax = () => {
    let checkOption: CheckOptions = this.state.checkOption
    checkOption.dmax = !this.state.atkDmax
    this.setState({atkDmax: !this.state.atkDmax, checkOption: checkOption})
  }
  handleDefDmax = () => {
    this.setState({defDmax: !this.state.defDmax})
  }
  renderAttack = () => {
    if (this.state.attack) {
      return (
        <div style={{padding: 15, marginLeft: 40}}>
          攻
          <PokemonIcon onClick={this.handleAtkDmax} number={this.state.attack.pokemon.number} Dmax={this.state.atkDmax}/>
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
        <PokemonIcon number={"000"} onClick={this.handleAtkDmax} Dmax={this.state.atkDmax}/>
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
          <PokemonIcon number={this.state.defence.pokemon.number} onClick={this.handleDefDmax} Dmax={this.state.defDmax}/>
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
        <PokemonIcon number={"000"} onClick={this.handleDefDmax} Dmax={this.state.defDmax} />
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
          <FormControl component="fieldset" style={{ marginLeft: 17, marginTop: 3, marginBottom: 0 }}>
            <FormGroup row>
              <Checkbox checked={this.state.checkOption.attackNature && this.checkNature("attack")} onChange={this.handleChangeANOption} value="attackNature" style={{margin: 0}} disabled={!this.checkNature("attack")} />
              <Typography style={{width: 90, marginTop: this.state.attack.nature.length > 6 ? 11 : 9, marginLeft: 0, fontSize: this.natureFontSize(this.state.attack.nature.length)}}>{this.state.attack.nature.length > 7 ? this.state.attack.nature.slice(0, 2) + "..." + this.state.attack.nature.slice(-4) : this.state.attack.nature}</Typography>
              <Checkbox checked={this.state.checkOption.defenceNature && this.checkNature("defence")} onChange={this.handleChangeDNOption} value="defenceNature" style={{margin: 0}} disabled={!this.checkNature("defence")} />
              <Typography style={{width: 90, marginTop: this.state.defence.nature.length > 6 ? 11 : 9, marginLeft: 0, fontSize: this.natureFontSize(this.state.defence.nature.length)}}>{this.state.defence.nature.length > 7 ? this.state.attack.nature.slice(0, 2) + "..." + this.state.defence.nature.slice(-4) : this.state.defence.nature}</Typography>
            </FormGroup>
            <FormGroup row>
              <Checkbox
                checked={this.state.checkOption.attackWaza && this.checkWaza()}
                onChange={this.handleChangeWOption} value="attackWaza" style={{margin: 0}}
                disabled={!this.checkWaza()}
              />
              <Typography
                style={{marginTop: 11, marginLeft: 0}}
              >
                技の威力変化効果
              </Typography>
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
          </Menu>
        </Grid>
      )
    }
  }
  renderDamage = () => {
    if (this.state.attack && this.state.defence && this.state.attack.status && this.state.defence.status&& this.state.attack.waza && this.state.attack.waza.type !== "ダミー") {
      if (this.state.attack.waza.name !== "ダミー") {
        let HP: number = this.state.defence.status.statusH
        if (this.state.defDmax) {
          HP = HP * 2
        }
        return (
          <Grid item >
            <Typography align='center'>
              ダメージ: {Math.round(this.damage()[0] * HP)} ~ {Math.round(this.damage()[1] * HP)}
            </Typography>
            <Typography align='center'>
              急所ダメージ: {Math.round(this.damage()[2] * HP)} ~ {Math.round(this.damage()[3] * HP)}
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
