import React from 'react';
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
import { CircularProgress, Slider } from '@material-ui/core';

interface Props{
  backParty(): any;
  name: string;
}
  
interface State{
  expanded: boolean;
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
    // console.log('====================================');
    // console.log(name2Pokemon(this.props.name))
    // console.log('====================================');
  };
  onAvatarClickHandler = () => {
    this.props.backParty()
  }
  // UNSAFE_componentWillMount() {
  //   this.setState({ loading: true })
  //   let result: PokemonData = this.getPokemonData()
  //   setTimeout(() => this.setState({ pokemonData: result, loading: false }), 500)
  // }
  componentDidMount() {
    if (this.state.pokemonData.name != this.props.name) {
      this.setState({ loading: true })
      getPokemonByName(this.props.name)
        .then(res => {
          let result = res
          this.setState({ pokemonData: result, loading: false })
          console.log(result)
        })
    }
  }
  getPokemonData (name: string): PokemonData {
    const db = makeDB()
    let result: PokemonData = this.state.pokemonData
    db.findOne({ name: name}, async function(err :any, doc :PokemonData){
      console.log(doc,err)
      if (doc) {
        return 
      }
      result = doc
      return result
      // if (err) { return err }
    })
    setTimeout(() => console.log("wait"), 500)
    console.log(result,"aaa")
    return result
    // setTimeout(() => this.setState({ pokemonData: result, loading: false }), 500)
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
      />
      <CardContent>
        <Slider
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={4}
          value={this.state.effortHP}
          min={0}
          max={252}
        />
        </CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{this.state.pokemonData.ability1} </Typography>
          {/* <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
          minutes.
          </Typography>
          <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
          heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
          browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
          and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
          pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
          saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
          Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
          without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
          medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
          again without stirring, until mussels have opened and rice is just tender, 5 to 7
          minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
    );
  }
}