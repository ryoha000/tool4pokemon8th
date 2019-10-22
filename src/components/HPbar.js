import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import './HPbar.css';
// n=2.4
export default class HPbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmHP: 240, // 上の方の乱数
      randomHPRange: 0, // 乱数幅
      lostHP:240, // 下の方の乱数
      confirmHPColor: "greenyellow",
      randomHPColor: "rgb(100, 150, 26)"
    };
  }
  // componentDidMount() {
  //   if (this.props.confirmHP !== this.state.confirmHP) {
  //     this.setState({ confirmHP: Math.floor(this.props.confirmHP * 2.4), randomHPRange: Math.floor(this.props.lostHP * 2.4 - this.props.confirmHP * 2.4), lostHP: Math.floor(this.props.lostHP * 2.4) })
  //     if (this.props.confirmHP > 50) {
  //       this.setState({ confirmHPColor: "greenyellow", randomHPColor: "rgb(100, 150, 26)"})
  //     } else if (this.props.confirmHP > 20) {
  //       this.setState({ confirmHPColor: "yellow", randomHPColor: "gold"})
  //     } else {
  //       this.setState({ confirmHPColor: "red", randomHPColor: "crimson"})
  //     }
  //   }
  // }
  componentDidUpdate() {
    if (this.props.confirmHP !== this.state.confirmHP) {
      this.setState({ confirmHP: Math.floor(this.props.confirmHP * 2.4), randomHPRange: Math.floor(this.props.lostHP * 2.4 - this.props.confirmHP * 2.4), lostHP: Math.floor(this.props.lostHP * 2.4) })
      if (this.props.confirmHP > 50) {
        this.setState({ confirmHPColor: "greenyellow", randomHPColor: "rgb(100, 150, 26)"})
      } else if (this.props.confirmHP > 20) {
        this.setState({ confirmHPColor: "yellow", randomHPColor: "gold"})
      } else {
        this.setState({ confirmHPColor: "red", randomHPColor: "crimson"})
      }
    }
  }
  onResize = (e, direction, ref, delta, position) => {
    const minutes = Math.floor(parseInt(ref.style.width, 10) / 20) * 30;
    const hour = Math.floor(parseInt(position.x, 10) / 40);
    this.setState({ minutes, hour });
  }
  handleClick = () => {
    this.setState({ randomHPRange: 0, lostHP: 0 , confirmHPColor: "greenyellow" })
  }
  render() {
    return (
      <div className="AHPbar" onClick={this.handleClick}>
        <div className="container">
          {Array.from(Array(240).keys()).map(i =>
            <div className="item" key={i}>
            </div>
          )}
          <Rnd
            className="rndlg"
            default={{
              x: 0,
              y: 0,
              width: this.state.confirmHP,
              height: '100%',
            }}
            dragAxis="none"
            enableResizing={{
              top: false, right: true, bottom: false, left: false,
              topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
            }}
            style={{background: this.state.confirmHPColor}}
            bounds="parent"
            resizeGrid={[1, 0]}
            minWidth="1"
            maxWidth="240"
            onResize={this.onResize}
          />
          <Rnd
            className="rnddg"
            default={{
              x: this.state.confirmHP,
              y: 0,
              width: this.state.randomHPRange,
              height: '100%',
            }}
            dragAxis="none"
            enableResizing={{
              top: false, right: false, bottom: false, left: false,
              topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
            }}
            bounds="parent"
            minWidth="1"
            style={{background: this.state.randomHPColor}}
          />
          <Rnd
            className="rndgr"
            default={{
              x: this.state.lostHP,
              y: 0,
              width: 240 - this.state.lostHP,
              height: '100%',
            }}
            dragAxis="none"
            enableResizing={{
              top: false, right: false, bottom: false, left: false,
              topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
            }}
            bounds="parent"
            minWidth="1"
            style={{background: "rgb(58, 58, 58)"}}
          />
        </div>
      </div>
    );
  }
}
