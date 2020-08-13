import React from "react";
import BoxDiv from "./BoxDiv";
import $ from "jquery";
import Scorecard from "./Scorecard";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class Box extends React.Component {
  constructor() {
    super();
    this.state = {
      checkState: new Array(9).fill(null),
      isNext: null,
      currentPlayer: "O",
      isGameFinished: false,
    };
    this.changeBoxState = this.changeBoxState.bind(this);
    this.checkAllfilled = this.checkAllfilled.bind(this);
    this.checkPlayerWon = this.checkPlayerWon.bind(this);
    this.clearBox = this.clearBox.bind(this);
  }

  changeBoxState(event) {
    let boxstate = this.state.checkState;
    let curPlayer = this.state.currentPlayer;
    if (this.checkAllfilled() < 0) {
      return;
    }
    if (this.state.isGameFinished) {
      document.getElementById("winner").innerHTML =
        "Game Over! Reset Board to Start new Game";
      $("#exampleModal").modal("show");
      return;
    }
    if (boxstate[event.target.getAttribute("data-key")] == null) {
      boxstate[
        event.target.getAttribute("data-key")
      ] = this.state.currentPlayer;
    } else {
      return;
    }
    this.setState({
      checkState: boxstate,
    });
    let nextPlayer = curPlayer === "O" ? "X" : "O";
    this.setState({
      currentPlayer: nextPlayer,
    });
  }

  checkAllfilled() {
    return this.state.checkState.findIndex((el) => el === null);
  }

  clearBox() {
    $("div#box").removeClass("winner");
    this.setState({
      checkState: new Array(9).fill(null),
      isGameFinished: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPlayer !== prevState.currentPlayer) {
      let winner = this.checkPlayerWon(
        prevState.checkState,
        prevState.currentPlayer
      );
      if (winner) {
        document.getElementById(
          "winner"
        ).innerHTML = `${prevState.currentPlayer} has Won!`;
        $("#exampleModal").modal("show");
        this.setState({
          isGameFinished: true,
        });
      } else {
        if (this.checkAllfilled() < 0) {
          document.getElementById("winner").innerHTML =
            "Game Over! It's a DRAW";
          $("#exampleModal").modal("show");
        }
      }
    }
  }

  checkPlayerWon(boxes, player) {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i <= 7; i++) {
      let winCondn = winningConditions[i];
      let [a, b, c] = winCondn;
      if (boxes[a] === player && boxes[b] === player && boxes[c] === player) {
        document.querySelectorAll("#box")[a].classList.add("winner");
        document.querySelectorAll("#box")[b].classList.add("winner");
        document.querySelectorAll("#box")[c].classList.add("winner");
        return true;
      } else {
        continue;
      }
    }
    return false;
  }

  render() {
    const checkComponent = this.state.checkState.map((state, index) => (
      <BoxDiv
        key={index}
        data={index}
        checkstate={state}
        changeBoxState={this.changeBoxState}
      />
    ));

    return (
      <div>
        <Scorecard currentplayer={this.state.currentPlayer} />
        <div id="container">{checkComponent}</div>
        <button
          onClick={this.clearBox}
          id="clearBtn"
          type="button"
          className="btn btn-info">
          Reset Board
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <span id="winner"> </span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Box;
