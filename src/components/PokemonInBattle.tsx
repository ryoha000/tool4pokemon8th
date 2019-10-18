import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import  {name2Pokemon, PokemonData, makeDB, waza}  from './shared';
import  {getPokemonByName, getWazas}  from './shared_js';
import { computeStatus, natures } from './ComputeMethods'
import { CircularProgress, Slider, ListItem, ListItemText, List, ListItemAvatar, SnackbarContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Fab, Button, Grid, Menu, MenuItem } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { element } from 'prop-types';
interface Props{
  backParty(): any;
  name: string;
  pokemons: PokemonData[];
  wazas: waza[];
}
  
export interface PokemonInBattleState{
  expanded: boolean;
  isOpenEffort: boolean;
  isOpenWaza: boolean;
  isOpenNature?: any;
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
  statusH: number;
  statusA: number;
  statusB: number;
  statusC: number;
  statusD: number;
  statusS: number;
  IndividualH: number;
  IndividualA: number;
  IndividualB: number;
  IndividualC: number;
  IndividualD: number;
  IndividualS: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

 
export default class PokemonInBattle extends React.Component<Props,PokemonInBattleState> {
  constructor(props: any) {
    super(props);
    console.log(this.props.name)
    this.state = {
      expanded: false,
      isOpenEffort: false,
      isOpenWaza: false,
      isOpenNature: null,
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
      statusH: 0,
      statusA: 0,
      statusB: 0,
      statusC: 0,
      statusD: 0,
      statusS: 0,
      IndividualH: 31,
      IndividualA: 31,
      IndividualB: 31,
      IndividualC: 31,
      IndividualD: 31,
      IndividualS: 31,
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  };
  onAvatarClickHandler = () => {
    this.props.backParty()
  }
  handleChangeCommittedSlider = () => {
    const pokemon: PokemonInBattleState = computeStatus(this.state)
    this.setState({
      statusH: Math.floor(pokemon.statusH),
      statusA: Math.floor(pokemon.statusA),
      statusB: Math.floor(pokemon.statusB),
      statusC: Math.floor(pokemon.statusC),
      statusD: Math.floor(pokemon.statusD),
      statusS: Math.floor(pokemon.statusS),
    })
  }
  componentDidMount() {
    if (this.state.pokemonData.name != this.props.name) {
      this.setState({ loading: true })
      const pokemon: any = this.props.pokemons.find((element) => {
        return element.name === this.props.name
      })
      if (!pokemon) { alert("指定されたポケモン名が不正です。再起動してみてください") }
      setTimeout(() => {
        const pokemon: PokemonInBattleState = computeStatus(this.state)
        this.setState({
          statusH: Math.floor(pokemon.statusH),
          statusA: Math.floor(pokemon.statusA),
          statusB: Math.floor(pokemon.statusB),
          statusC: Math.floor(pokemon.statusC),
          statusD: Math.floor(pokemon.statusD),
          statusS: Math.floor(pokemon.statusS),
        })
      },200)
      this.setState({ loading: false, pokemonData: pokemon })
    }
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
            <FormLabel component="legend">{this.state.statusH + "-" +  this.state.statusA + "-" +  this.state.statusB + "-" +  this.state.statusC + "-" +  this.state.statusD + "-" +  this.state.statusS}</FormLabel>
            <Grid item>
              <Grid container>
                <Button onClick={this.openNature} variant="outlined" color="secondary" style={{height: 35,width: 125}}>
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
                    control={<Radio color="primary" />}
                    label="Slider"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="input"
                    control={<Radio color="primary" />}
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
        <List component="div" disablePadding>
        <ListItem className="nested">
          <Typography style={{whiteSpace: 'break-spaces', width: 70}}>H:{this.state.effortHP}    </Typography>
          <Slider
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
            aria-labelledby="effortD"
            value={this.state.effortD}
            valueLabelDisplay="auto"
            step={4}
            onChange={this.handleEffortD()}
            onChangeCommitted={this.handleChangeCommittedSlider}
            min={0}
            max={252}
            style={{width: 200}}
          />
        </ListItem>
        <ListItem className="nested">
          <Typography style={{whiteSpace: 'break-spaces', width: 70}}>S:{this.state.effortS}    </Typography>
          <Slider
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
      this.setState({
        statusH: Math.floor(pokemon.statusH),
        statusA: Math.floor(pokemon.statusA),
        statusB: Math.floor(pokemon.statusB),
        statusC: Math.floor(pokemon.statusC),
        statusD: Math.floor(pokemon.statusD),
        statusS: Math.floor(pokemon.statusS),
      })
    }, 300)
  }
  openNature = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenNature: event.currentTarget})
  }
  closeNature = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenNature: null})
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
  render() {
    if (this.state.loading) {
      return (
        <Card style={{ height: 430, width: 300 }}>
          <div>
            <CircularProgress/>
          </div>
        </Card>
      )
    }
    return (
    <Card style={{ height: 430, width: 300 }}>
      <CardHeader
      avatar={
        <Avatar onClick={this.onAvatarClickHandler} aria-label="recipe" src={"/assets/" + this.state.pokemonData.number + ".png"} />
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
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
        <List component="div" disablePadding>
          <ListItem button className="nested">
            <ListItemAvatar>
              <Avatar src="/assets/373.png"/>
            </ListItemAvatar>
            <ListItemText primary="Salamence" />
          </ListItem>
        </List>
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