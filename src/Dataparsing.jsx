import React, { useState, useEffect } from 'react';

function GameDataParser() {
  const [topics, setTopics] = useState([]); // Headers like "Locations"
  const [details, setDetails] = useState([]); // { content: "NPC", number: 146 }

  useEffect(() => {
    fetch('/data.txt')
      .then(res => res.text())
      .then(rawText => {
        const lines = rawText.split('\n').map(l => l.trim()).filter(l => l !== "");
        
        const tempTopics = [];
        const tempDetails = [];

        for (let i = 0; i < lines.length; i++) {
          const currentLine = lines[i];
          const nextLine = lines[i + 1];

          // Check if the NEXT line is a number
          // isNaN checks if the string is NOT a number
          const isNextLineNumber = nextLine && !isNaN(nextLine);

          if (isNextLineNumber) {
            // This is a Content + Number pair
            tempDetails.push({
              content: currentLine,
              number: parseInt(nextLine, 10)
            });
            i++; // Skip the next line because we just consumed it as a number
          } else {
            // This is a Topic / Header
            tempTopics.push(currentLine);
          }
        }

        setTopics(tempTopics);
        setDetails(tempDetails);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Topics (Headers)</h2>
      <ul>{topics.map((t, i) => <li key={i}>{t}</li>)}</ul>

      <h2>Combined Content & Numbers</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, i) => (
            <tr key={i}>
              <td>{item.content}</td>
              <td>{item.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
