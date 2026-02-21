let storyHistory = [];

export function addToMemory(role, content) {
  storyHistory.push({ role, content });
}

export function getMemory() {
  return storyHistory.slice(-10); // last 10 messages
}

export function clearMemory() {
  storyHistory = [];
}
