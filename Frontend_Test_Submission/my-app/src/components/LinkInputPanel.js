import React, { useState } from 'react';
import { createMiniUrlToken } from '../utils/tokenCreator';
import { recordLog } from '../services/loggerEngine';

const LinkInputPanel = ({ saveNewLink }) => {
  const [longUrl, setLongUrl] = useState('');
  const [expiry, setExpiry] = useState(24); // hours

  const handleForm = (e) => {
    e.preventDefault();
    const code = createMiniUrlToken();
    const miniUrl = `https://u.shr/${code}`;
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + parseInt(expiry));

    saveNewLink({
      longUrl,
      miniUrl,
      hits: 0,
      expiresAt: expiryDate.toISOString()
    });

    recordLog('LINK_CREATED', `Long: ${longUrl} → Short: ${miniUrl}`);
    setLongUrl('');
    setExpiry(24);
  };

  return (
    <form onSubmit={handleForm} className="link-input-panel">
      <input
        type="url"
        placeholder="Paste your full URL here"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <input
        type="number"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        min="1"
        max="168"
        title="Expiry in hours"
      />
      <button type="submit">Generate Short Link</button>
    </form>
  );
};

export default LinkInputPanel;
