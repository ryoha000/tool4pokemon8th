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
import Avatar from '@material-ui/core/Avatar';
import PokemonInBattle from './PokemonInBattle'
// import { makeDB, insertPokemonData } from './shared'

interface Props{
}

interface State{
  open1: boolean;
  open2: boolean;
  // selectedY: Pokemon;
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

export default class VersusTabs extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open1: false,
      open2: false,
      // selectedY: 
    };
  }
  handleClick1 = () => {
    this.setState({ open1: !this.state.open1 })
  };

  handleClick2 = () => {
    this.setState({ open2: !this.state.open2 })
  };
  renderPartyList = () => {
    return <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Your Party
                  </ListSubheader>
                }
                style={{flexGrow: 1}}
              >
                <ListItem button onClick={this.handleClick1}>
                <ListItemAvatar>
                    <Avatar src="/assets/445.png"/>
                  </ListItemAvatar>
                  <ListItemText primary="Garchomp" />
                </ListItem>
                <ListItem button onClick={this.handleClick2}>
                <ListItemAvatar>
                    <Avatar src="/assets/373.png"/>
                  </ListItemAvatar>
                  <ListItemText primary="Garchomp" />
                  {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className="nested">
                      <ListItemAvatar>
                        <Avatar src="/assets/373.png"/>
                      </ListItemAvatar>
                      <ListItemText primary="Salamence" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </List>
  }
  render() {
    return (
      <Grid container className="root" spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                {this.state.open1 ? <PokemonInBattle backParty={this.handleClick1} name="ガブリアス"/> : this.renderPartyList()}
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                {/* {this.state.open1 ? <PokemonInBattle backParty={this.handleClick1} name="ガブリアス"/> : this.renderPartyList()} */}
                {this.renderPartyList()}
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                {/* {this.state.open1 ? <PokemonInBattle backParty={this.handleClick1} name="ガブリアス"/> : this.renderPartyList()} */}
                {this.renderPartyList()}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
