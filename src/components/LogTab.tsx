import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Item } from './ItemData'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Analytics from './Analytics'
import axios from 'axios'
import { PokemonData, waza, MyParty, MyPokemon, MyLog, datas } from './shared';
import LogDetailDialog from './LogDetailDialog'
import InputAutoParty from './InputAutoParty'

interface Props{
  username: string
  password: string
  handleAllData: (datas: MyPokemon[] | MyLog[] | MyParty[]) => void
  myPokemons: MyPokemon[];
  myParties: MyParty[];
  myLogs: MyLog[];
}

interface State{
  loading: boolean
  isOpenDetail: boolean
  selectedLog?: MyLog
  selectedId?: number
}

export default class LogTab extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      loading: false,
      isOpenDetail: false
    };
  }
  componentDidMount = () => {
  }
  reload = () => {
    this.setState({loading: true})
    let party: boolean = false
    let log: boolean = false
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/party', {name: this.props.username, pass: this.props.password})
      .then((res) => {
        this.props.handleAllData(res.data.parties)
        party = true
      })
      .catch((e) => {
        if (e.response.data.message) {
          alert(e.response.data.message)
        } else {
          alert(e)
        }
        party = true
      })
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/log', {name: this.props.username, pass: this.props.password})
      .then((res) => {
        this.props.handleAllData(res.data.logs)
        log = true
      })
      .catch((e) => {
        if (e.response.data.message) {
          alert(e.response.data.message)
        } else {
          alert(e)
        }
        log = true
      })
    if (party && log) {
      this.setState({loading: false})
    }
  }
  handleCloseDetail = () => {
    this.setState({isOpenDetail: false})
  }
  handleSelectLog = (log: MyLog) => {
    this.setState({isOpenDetail: true, selectedLog: log})
  }
  spoilLogByParty = (partyID: number) => {
    this.setState({isOpenDetail: false, selectedId: partyID})
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Paper style={{ height: 430,width: 600 }}>
                <InputAutoParty 
                  myParties={this.props.myParties}
                  selectLog={this.handleSelectLog}
                  username={this.props.username}
                  password={this.props.password}
                  handleAllData={this.props.handleAllData}
                  myPokemons={this.props.myPokemons}
                  myLogs={this.props.myLogs}
                  partyId={this.state.selectedId}
                />
                {this.state.selectedLog ? 
                  <LogDetailDialog
                    username={this.props.username}
                    password={this.props.password}
                    handleAllData={this.props.handleAllData}
                    isOpen={this.state.isOpenDetail}
                    log={this.state.selectedLog}
                    onClose={this.handleCloseDetail}
                    myParties={this.props.myParties}
                    spoilParty={this.spoilLogByParty}
                  /> : null}
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 430,width: 300 }}>
                <Analytics myLogs={this.props.myLogs} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}