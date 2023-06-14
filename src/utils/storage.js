const {
  localStorage: storage,
  JSON: { stringify: serialize, parse: deserialize },
} = window;

export function saveStorage(key, value) {
  return new Promise((resolve) => {
    storage.setItem(key, serialize(value));
  });
}

export function loadStorage(key) {
  return new Promise((resolve) => {
    resolve(deserialize(storage.getItem(key)));
  });
}

export function deleteStorage(key) {
  return new Promise((resolve) => {
    if (!key) storage.clear();
    else storage.removeItem(key);
    resolve();
  });
}
