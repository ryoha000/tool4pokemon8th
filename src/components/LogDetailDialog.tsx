import React from 'react';
import axios from 'axios'
import { MyParty, MyLog, MyPokemon } from './shared'
import { Dialog, DialogTitle, DialogContent, Grid, Typography, Button, Divider, IconButton } from '@material-ui/core';
import PokemonIcon from './PokemonIcon';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  spoilParty: (id: number) => void;
  // pokemon or party
  log: MyLog
  myParties: MyParty[]
  username: string
  password: string
  handleAllData: (datas: MyPokemon[] | MyParty[] | MyLog[]) => void
}

interface State {
  color: string
  loading: boolean
}

export default class FromRegisteredDialog extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      color: '',
      loading: false
    };
  }
  componentDidUpdate = () => {
    if (this.props.log.result) {
      if (this.state.color !== '#f0e68c') {
        this.setState({color: '#f0e68c'})
      }
    } else {
      if (this.state.color !== '#add8e6') {
        this.setState({color: '#add8e6'})
      }
    }
  }
  handleClose = () => {
    this.props.onClose()
  }
  handleDelete = () => {
    if (!this.props.log.id) {
      alert('バグが発生しました報告していただけると嬉しいです')
      return
    }
    this.setState({loading: true})
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/staging_log', {name: this.props.username, pass: this.props.password, log_id: this.props.log.id})
      .then((res) => {
        this.setState({loading: false})
        this.props.onClose()
      })
      .catch((e) => {
        if (e.response.data.message) {
          alert(e.response.data.message)
        } else {
          alert(e)
        }
        this.setState({loading: false})
        this.props.onClose()
      })
  }
  renderMyIcon = () => {
    const id: number | undefined = this.props.log.party_id
    const myparty: MyParty | undefined = this.props.myParties.find((element: MyParty) => {
      return (id === element.id)
    })
    if (!myparty) {
      alert('ツール内のリロードボタンを押してみてください')
      return
    }
    return (
      <Grid item container>
        <PokemonIcon number={myparty.pokemon_1 ? myparty.pokemon_1.number : ''} />
        <PokemonIcon number={myparty.pokemon_2 ? myparty.pokemon_2.number : ''} />
        <PokemonIcon number={myparty.pokemon_3 ? myparty.pokemon_3.number : ''} />
        <PokemonIcon number={myparty.pokemon_4 ? myparty.pokemon_4.number : ''} />
        <PokemonIcon number={myparty.pokemon_5 ? myparty.pokemon_5.number : ''} />
        <PokemonIcon number={myparty.pokemon_6 ? myparty.pokemon_6.number : ''} />
      </Grid>
    )
  }
  renderOpponentIcon = () => {
    const log: MyLog = this.props.log
    return (
      <Grid item container>
        <PokemonIcon number={log.pokemon_num_1 ? log.pokemon_num_1 : ''} />
        <PokemonIcon number={log.pokemon_num_2 ? log.pokemon_num_2 : ''} />
        <PokemonIcon number={log.pokemon_num_3 ? log.pokemon_num_3 : ''} />
        <PokemonIcon number={log.pokemon_num_4 ? log.pokemon_num_4 : ''} />
        <PokemonIcon number={log.pokemon_num_5 ? log.pokemon_num_5 : ''} />
        <PokemonIcon number={log.pokemon_num_6 ? log.pokemon_num_6 : ''} />
      </Grid>
    )
  }
  render() {
    return (
      <Dialog maxWidth='xs' fullWidth onClose={this.handleClose} open={this.props.isOpen}>
        <DialogTitle>
          Log Detail
        </DialogTitle>
        <Divider />
        <Typography>My Party</Typography>
        <DialogContent>
          {this.renderMyIcon()}
        </DialogContent>
        <Typography>Opponent Party</Typography>
        <DialogContent>
          {this.renderOpponentIcon()}
        </DialogContent>
        <Typography>Result: {this.props.log.result ? 'WIN' : 'LOSE'}</Typography>
        <Typography>Memo</Typography>
        <Typography>{this.props.log.memo}</Typography>
        <Grid container>
          <Button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {this.props.spoilParty(this.props.log.party_id ? this.props.log.party_id : 0)}} variant="contained" style={{height: 35,width: 250, marginTop: 5}}>
            このパーティのログを見る
          </Button>
          <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {this.handleDelete()}} disabled={this.state.loading}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Dialog>
    )
  }
}