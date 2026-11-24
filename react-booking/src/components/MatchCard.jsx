function MatchCard(props) {
  return (
    <div className="match-card">
      <h3>{props.matchNumber}</h3>
      <h2>{props.teams}</h2>
      <p><strong>Date:</strong> {props.date}</p>
      <p><strong>Time:</strong> {props.time}</p>
      <p><strong>Venue:</strong> {props.venue}</p>
    </div>
  )
}

export default MatchCard