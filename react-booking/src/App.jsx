import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MatchCard from './components/MatchCard'
import { supabase } from './supabase'
import './App.css'

function App() {

  // React State
  const [matches, setMatches] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [userName, setUserName] = useState('')
  const [tickets, setTickets] = useState(1)

  // Fetch Matches and Setup Realtime
  useEffect(() => {

    fetchMatches()

    const channel = supabase
      .channel('matches-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'matches'
        },
        () => {
          fetchMatches()
        }
      )
      .subscribe()

    // Cleanup Realtime Subscription
    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  // Fetch Matches from Supabase
  async function fetchMatches() {
    const { data, error } = await supabase
      .from('matches')
      .select('*')

    if (error) {
      console.error('Error fetching matches:', error)
    } else {
      setMatches(data)
    }
  }

  // Book Tickets
  async function bookTickets(e) {
    e.preventDefault()

    if (!userName.trim()) {
      alert('Please enter your name')
      return
    }

    if (
      !Number.isInteger(tickets) ||
      tickets < 1 ||
      tickets > selectedMatch.available_seats
    ) {
      alert('Invalid number of tickets')
      return
    }

    const totalPrice = selectedMatch.price * tickets

    // Insert Booking into Supabase
    const { error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          match_id: selectedMatch.id,
          user_name: userName,
          match_title: `${selectedMatch.team1} vs ${selectedMatch.team2}`,
          tickets: tickets,
          total_price: totalPrice
        }
      ])

    if (bookingError) {
      console.error('Booking Error:', bookingError)
      alert('Booking failed!')
      return
    }

    // Update Available Seats
    const { error: updateError } = await supabase
      .from('matches')
      .update({
        available_seats: selectedMatch.available_seats - tickets
      })
      .eq('id', selectedMatch.id)

    if (updateError) {
      console.error('Seat Update Error:', updateError)
      alert('Booking was saved, but available seats could not be updated. Please check Supabase.')
      return
    }

    alert('Tickets booked successfully!')

    setUserName('')
    setTickets(1)
    setSelectedMatch(null)

    fetchMatches()
  }

  return (
    <>
      <Navbar />
      <Hero />

      <section id="matches">
        <h1>IPL Match Schedule</h1>

        <div className="match-container">
          {matches.map((match) => (
            <div key={match.id}>
              <MatchCard
                matchNumber={`Match ${match.id}`}
                teams={`${match.team1} vs ${match.team2}`}
                date={match.date}
                time="TBA"
                venue={match.venue}
                price={match.price}
                availableSeats={match.available_seats}
              />

              <button
                onClick={() => {
                  setSelectedMatch(match)
                  setTickets(1)
                }}
                disabled={match.available_seats === 0}
              >
                Select Match
              </button>

              {selectedMatch?.id === match.id && (
                <div className="booking-form">
                  <h2>Book Your Tickets</h2>

                  <h3>
                    {selectedMatch.team1} vs {selectedMatch.team2}
                  </h3>

                  <form onSubmit={bookTickets}>
                    <label>Your Name:</label>

                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />

                    <label>Number of Tickets:</label>

                    <input
                      type="number"
                      min="1"
                      max={selectedMatch.available_seats}
                      value={tickets}
                      onChange={(e) => setTickets(Number(e.target.value))}
                      required
                    />

                    <p>
                      <strong>Total Price:</strong> ₹
                      {selectedMatch.price * tickets}
                    </p>

                    <button type="submit">
                      Confirm Booking
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default App