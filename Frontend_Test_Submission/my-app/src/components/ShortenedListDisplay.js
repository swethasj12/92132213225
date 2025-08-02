import React from 'react';
import { recordLog } from '../services/loggerEngine';

const ShortenedListDisplay = ({ links, triggerClick }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    recordLog('LINK_COPIED', `Copied ${text}`);
  };

  const isExpired = (expiryTime) => {
    return new Date() > new Date(expiryTime);
  };

  return (
    <table className="link-table">
      <thead>
        <tr>
          <th>Original</th>
          <th>Short Link</th>
          <th>Expiry</th>
          <th>Clicks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {links.map((item, idx) => (
          <tr key={idx} style={{ background: isExpired(item.expiresAt) ? '#f8d7da' : '#d4edda' }}>
            <td>{item.longUrl}</td>
            <td>
              <a
                href="#!"
                onClick={() => {
                  if (!isExpired(item.expiresAt)) {
                    triggerClick(idx);
                    recordLog('LINK_VISITED', item.miniUrl);
                  }
                }}
              >
                {item.miniUrl}
              </a>
            </td>
            <td>{new Date(item.expiresAt).toLocaleString()}</td>
            <td>{item.hits}</td>
            <td>
              <button onClick={() => copyToClipboard(item.miniUrl)}>📋 Copy</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShortenedListDisplay;
