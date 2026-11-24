import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MatchCard from './components/MatchCard'
import './App.css'

function App() {

  // React State
  const [selectedMatch, setSelectedMatch] = useState('')

  // Match Data
  const matches = [
    {
      matchNumber: 'Match 1',
      teams: 'RCB vs CSK',
      date: '01-04-2026',
      time: '7:30 PM',
      venue: 'Bengaluru'
    },
    {
      matchNumber: 'Match 2',
      teams: 'MI vs KKR',
      date: '02-04-2026',
      time: '7:30 PM',
      venue: 'Mumbai'
    },
    {
      matchNumber: 'Match 3',
      teams: 'CSK vs MI',
      date: '03-04-2026',
      time: '7:30 PM',
      venue: 'Chennai'
    }
  ]

  return (
    <>
      <Navbar />
      <Hero />

      <section id="matches">
        <h1>IPL Match Schedule</h1>

        <div className="match-container">
          {matches.map((match, index) => (
            <div key={index}>
              <MatchCard
                matchNumber={match.matchNumber}
                teams={match.teams}
                date={match.date}
                time={match.time}
                venue={match.venue}
              />

              <button onClick={() => setSelectedMatch(match.teams)}>
                Select Match
              </button>
            </div>
          ))}
        </div>

        {selectedMatch && (
          <h3 className="selected-match">
            Selected Match: {selectedMatch}
          </h3>
        )}
      </section>
    </>
  )
}

export default App