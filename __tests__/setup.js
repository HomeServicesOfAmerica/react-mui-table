// Configure any necessary mocks.

// Ok . .  so not necessary, but it makes the test output prettier.
console.error = () => {};

// Mock matchMedia for testing purposes

// Returns true if the two strings match or the query ends with the size
// Used for testing breakpoints that match multiple
function checkIfMatches(query, size) {
  if (typeof query !== 'string' || typeof size !== 'string') {
    throw new Error('checkIfMatches will only accept strings.');
  }
  return size.length > 0 && query.endsWith(size);
}

const matchMediaState = {
  size: '',
  callbacks: [],
};

window.updateSize = (newSize) => {
  matchMediaState.size = newSize;
  for (const cb of matchMediaState.callbacks) {
    cb(newSize);
  }
};

window.matchMedia = (query) => {
  const api = {
    addListener: function addListener(callback) {
      api.listeners = [...api.listeners, callback];
      matchMediaState.callbacks.push((newSize) => {
        api.matches = checkIfMatches(query, newSize);
        if (api.matches) callback({ matches: api.matches });
      });
    },
    removeListener: function removeListener(callback) {
      const index = api.listeners.indexOf(callback);
      api.listeners = [...api.listeners.slice(0, index), ...api.listeners.slice(index + 1)];
    },
    query,
    listeners: [],
    matches: checkIfMatches(query, matchMediaState.size),
  };

  return api;
};
