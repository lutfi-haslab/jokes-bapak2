const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/list_jokes.txt');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

const jokes = [];
let pendingQuestion = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check for Single Line Q&A (contains ? followed by meaningful text)
  const qMarkIndex = line.indexOf('?');
  
  if (pendingQuestion) {
    // We are waiting for an answer
    jokes.push({
      id: jokes.length + 1,
      setup: pendingQuestion,
      punchline: line
    });
    pendingQuestion = null;
  } else if (qMarkIndex !== -1 && qMarkIndex < line.length - 1) {
    // Likely single line Q&A
    // Check if the part after ? is not just whitespace
    const afterQ = line.substring(qMarkIndex + 1).trim();
    if (afterQ.length > 0) {
        jokes.push({
            id: jokes.length + 1,
            setup: line.substring(0, qMarkIndex + 1).trim(),
            punchline: afterQ
        });
    } else {
        // Just a question
        pendingQuestion = line;
    }
  } else {
    // Assume it's a question if we aren't waiting for an answer
    pendingQuestion = line;
  }
}

console.log(JSON.stringify(jokes, null, 2));
