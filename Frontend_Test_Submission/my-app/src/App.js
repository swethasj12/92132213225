import React, { useState } from 'react';
import LinkInputPanel from './components/LinkInputPanel';
import ShortenedListDisplay from './components/ShortenedListDisplay';
import { fetchLogs } from './services/loggerEngine';
import './appStyles.css';

function App() {
  const [linkStore, setLinkStore] = useState([]);
  const [filter, setFilter] = useState('');

  const addNewLink = (data) => {
    setLinkStore([...linkStore, data]);
  };

  const countClick = (index) => {
    const copy = [...linkStore];
    copy[index].hits += 1;
    setLinkStore(copy);
  };

  const filteredLinks = linkStore.filter((link) =>
    link.longUrl.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="main-container">
      <h2> Aff URL Shortener</h2>
      <LinkInputPanel saveNewLink={addNewLink} />
      <input
        type="text"
        placeholder="Search original URLs..."
        onChange={(e) => setFilter(e.target.value)}
        className="search-box"
      />
      <ShortenedListDisplay links={filteredLinks} triggerClick={countClick} />
      <hr />
      <h3> Log History</h3>
      <pre className="log-box">{JSON.stringify(fetchLogs(), null, 2)}</pre>
    </div>
  );
}

export default App;

