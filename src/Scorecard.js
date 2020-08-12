import React from "react";

export default function Scorecard(props) {
  return (
    <div id="turn">
      <span>{props.currentplayer}'s Turn</span>
    </div>
  );
}
