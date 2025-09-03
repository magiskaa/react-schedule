import React, { useState } from 'react';

export default function App() {
    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([]);

    const handleSubmit = (eventData) => {
        setEvents([...events, eventData]);
        setShowForm(false);
    };

    return (
        <div className="container">
            <h1>Schedule</h1>
            <Button showForm={showForm} setShowForm={setShowForm} />
            {showForm && <EventForm onSubmit={handleSubmit} />}
            <Schedule events={events} />
        </div>
    )
}

function Button({ showForm, setShowForm }) {
    return (
        <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create Event'}
        </button>
    );
}

function Schedule({ events }) {
    const hours = Array.from({ length: 18 }, (_, i) => (i + 5) % 24 + 1);
    return (
        <div className="schedule">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="day">
                    {hours.map(h => {
                        const event = events.find(e => e.day === i + 1 && e.time === h);
                        return (
                            <div key={h} className="hour-slot">
                                <div className="hour-label">{h}</div>
                                {event && <div className="event">{event.title}</div>}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

function EventForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [day, setDay] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, time: Number(startTime), day: Number(day) });
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br></br>
            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} required>
                <option value="">Select start time</option>
                {Array.from({ length: 18 }, (_, i) => (i + 5) % 24 + 1).map(h => (
                    <option key={h} value={h}>{h}:00</option>
                ))}
            </select>
            <br></br>
            <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
                {Array.from({ length: 5 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>Day {d}</option>
                ))}
            </select>
            <br></br>
            <button type="submit">Add Event</button>
        </form>
    );
}
