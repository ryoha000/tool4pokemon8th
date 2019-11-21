import React from 'react';
import './App.css';
import ParentTabs from './components/ParentTabs'
import { PokemonData, waza, MyPokemon, MyParty, MyLog } from './components/shared'
import { Grid, Paper, Card, CardHeader, Button, Icon, TextField, Typography, Fab, CardContent, CardActions } from '@material-ui/core';
import axios from 'axios'
import NavigationIcon from '@material-ui/icons/Navigation';

interface Props{
}
  
interface State {
  pokemons: PokemonData[];
  wazas: waza[];
  username: string;
  password: string;
  confirmPass: string;
  login: boolean;
  signup: boolean;
  pokeInit: boolean;
  partyInit: boolean;
  logInit:boolean;
  loading: boolean;
  myPokemons: MyPokemon[]
  myParties: MyParty[]
  myLogs: MyLog[]
}

export default class App extends React.Component<Props,State>{
  constructor(props: any) {
    super(props);
    this.state = {
      pokemons: [],
      wazas: [],
      login: true,
      signup: false,
      username: '',
      password: '',
      confirmPass: '',
      pokeInit: false,
      partyInit: false,
      logInit: false,
      loading: false,
      myLogs: [],
      myParties: [],
      myPokemons: []
    };
  }
  // componentDidMount = () => {
  //   this.setState({username: 'username', password: 'password', pokeInit: true, partyInit: true, logInit: true})
  // }
  handleUserName = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const userName: string = event.target.value
    this.setState({username: userName})
  }
  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      this.setState({loading: true})
      axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/user?login', {name: this.state.username, pass: this.state.password})
        .then(() => {
          axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon', {name: this.state.username, pass: this.state.password})
            .then((res) => this.setState({pokeInit: true, myPokemons: res.data.pokemons}))
          axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/party', {name: this.state.username, pass: this.state.password})
            .then((res) => this.setState({partyInit: true, myParties: res.data.parties}))
          axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/log', {name: this.state.username, pass: this.state.password})
            .then((res) => this.setState({logInit: true, myLogs: res.data.logs}))
        })
        .catch((e: any) => {
          if (e.data) {
            alert(e.response.data.message)
          }
          this.setState({loading: false, username: '', password: '', confirmPass: ''})
      })
    }
  }
  handlePassWord = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const passWord: string = event.target.value
    this.setState({password: passWord})
  }
  handleConfirmPass = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!this.state.password) {
      return
    }
    const passWord: string = event.target.value
    this.setState({confirmPass: passWord})
  }
  clickGoSignup = () => () => {
    this.setState({login: false, signup: true, password: '', username: '', confirmPass: ''})
  }
  clickGoLogin = () => () => {
    this.setState({login: true, signup: false, password: '', username: '', confirmPass: ''})
  }
  clickLogin = () => () => {
    this.setState({loading: true})
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/user?login', {name: this.state.username, pass: this.state.password})
      .then(() => {
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon', {name: this.state.username, pass: this.state.password})
          .then((res) => this.setState({pokeInit: true, myPokemons: res.data.pokemons}))
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/party', {name: this.state.username, pass: this.state.password})
          .then((res) => this.setState({partyInit: true, myParties: res.data.parties}))
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/log', {name: this.state.username, pass: this.state.password})
          .then((res) => this.setState({logInit: true, myLogs: res.data.logs}))
      })
      .catch((e: any) => {
        if (e.data) {
          alert(e.response.data.message)
        }
        this.setState({loading: false, username: '', password: '', confirmPass: ''})
      })
  }
  checkSignup = () => {
    if (this.state.loading) {
      return false
    }
    if (this.state.password === this.state.confirmPass) {
      if (this.state.username !== '' && this.state.password !== '') {
        return true
      }
    }
    return false
  }
  clickSignup = () => () => {
    this.setState({loading: true})
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/user?signup', {name: this.state.username, pass: this.state.password})
      .then(() => {
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon', {name: this.state.username, pass: this.state.password})
          .then((res) => this.setState({pokeInit: true, myPokemons: res.data.pokemons}))
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/party', {name: this.state.username, pass: this.state.password})
          .then((res) => this.setState({partyInit: true, myParties: res.data.parties}))
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/log', {name: this.state.username, pass: this.state.password})
          .then((res) => this.setState({logInit: true, myLogs: res.data.logs}))
      })
      .catch((e: any) => {
        if (e.data) {
          alert(e.response.data.message)
        }
        this.setState({loading: false, username: '', password: '', confirmPass: ''})
      })
  }
  handleAllData = (datas: any) => {
    console.log('reload')
    if (datas.length> 0) {
      if (typeof datas[0].effort_h === 'number') {
        console.log('pokemons')
        this.setState({myPokemons: datas})
      }
      if (typeof datas[0].pokemon_1_id === 'number') {
        console.log('parties')
        this.setState({myParties: datas})
      }
      if (typeof datas[0].pokemon_num_1 === 'string') {
        console.log('logs')
        this.setState({myLogs: datas})
      }
    }
  }
  renderLogin() {
    return (
      <Paper style={{ height: 430,width: 300 }}>
        <Card style={{ height: 430, width: 300 }}>
          <CardHeader
            title='Login'
            style={{height: 26}}
          />
          <CardContent>
            <TextField
              label="Name"
              value={this.state.username}
              onChange={this.handleUserName()}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassWord()}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => this.onKeyDown(e)}
              autoComplete="current-password"
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              onClick={this.clickLogin()}
              disabled={!this.state.username || !this.state.password || this.state.loading}
            >
              <NavigationIcon/>
              Login
            </Fab>
          </CardActions>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.clickGoSignup()}
            >
              未登録の方はこちら
            </Button>
          </CardActions>
        </Card>
      </Paper>
    )
  }
  renderSignup() {
    return (
      <Paper style={{ height: 430,width: 300 }}>
        <Card style={{ height: 430, width: 300 }}>
          <CardHeader
            title='Signup'
            style={{height: 26}}
          />
          <CardContent>
            <TextField
              label="Name"
              value={this.state.username}
              onChange={this.handleUserName()}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassWord()}
              autoComplete="current-password"
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={this.state.confirmPass}
              onChange={this.handleConfirmPass()}
              autoComplete="current-password"
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              onClick={this.clickSignup()}
              disabled={!this.checkSignup()}
            >
              <NavigationIcon/>
              Signup
            </Fab>
          </CardActions>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.clickGoLogin()}
            >
              登録済の方はこちら
            </Button>
          </CardActions>
        </Card>
      </Paper>
    )
  }
  render() {
    if (!this.state.pokeInit || !this.state.partyInit || !this.state.logInit) {
      if (this.state.login) {
        return (
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  {this.renderLogin()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      }
      if (this.state.signup) {
        return (
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                {this.renderSignup()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      }
    } else {
      return (
        <div className="App">
          <ParentTabs
            pokemons={this.state.pokemons}
            wazas={this.state.wazas}
            username={this.state.username}
            password={this.state.password}
            myPokemons={this.state.myPokemons}
            myParties={this.state.myParties}
            myLogs={this.state.myLogs}
            handleAllData={this.handleAllData}
          />
        </div>
      )
    }
  } 
}
