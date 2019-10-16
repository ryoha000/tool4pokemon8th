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
import  {name2Pokemon, PokemonData, makeDB}  from './shared';
import  {getPokemonByName}  from './shared_js';
import { CircularProgress, Slider, ListItem, ListItemText, List, ListItemAvatar, SnackbarContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

interface Props{
  backParty(): any;
  name: string;
}
  
interface State{
  expanded: boolean;
  isOpenEffort: boolean;
  isOpenWaza: boolean;
  effortForm: string;
  pokemonData: PokemonData;
  loading: boolean;
  effortHP: number;
  effortA: number;
  effortB: number;
  effortC: number;
  effortD: number;
  effortS: number;
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

 
export default class PokemonInBattle extends React.Component<Props,State> {
  constructor(props: any) {
    super(props);
    console.log(this.props.name)
    this.state = {
      expanded: false,
      isOpenEffort: false,
      isOpenWaza: false,
      effortForm: "slider",
      pokemonData: {number:"0",name:"ダミー",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",baseH:45,baseA:49,baseB:49,baseC:65,baseD:65,baseS:45,heavy:"f"},
      loading: false,
      effortHP: 4,
      effortA: 252,
      effortB: 0,
      effortC: 0,
      effortD: 0,
      effortS: 252
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  };
  onAvatarClickHandler = () => {
    this.props.backParty()
  }
  componentDidMount() {
    if (this.state.pokemonData.name != this.props.name) {
      this.setState({ loading: true })
      getPokemonByName(this.props.name)
        .then(result => {
          this.setState({ pokemonData: result, loading: false })
          console.log(result)
        })
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
          <FormLabel component="legend">SelectForm</FormLabel>
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
        <Avatar onClick={this.onAvatarClickHandler} aria-label="recipe" src={"/assets/" + 445 + ".png"} />
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={this.state.pokemonData.name}
      subheader={"NickName: " + "Nike"}
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