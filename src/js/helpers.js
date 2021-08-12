import { TIMEOUT_SEC } from './config.js';

// Will return a new Promise that will reject after a certain number of seconds. So in order to use this function we will have a race between the timeout promise and the fetch promise trying to get the data from recipe API. Hwatever occurs first will win the race.
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Promise.race receives an array of Promises.
    const data = await res.json();

    // The API returns a nice error message where we can use it's .message property.
    // The .ok property is stored in the res itself.
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // return the data so model.js can keep using it.
  } catch (err) {
    throw err; // with this re-throwing of the err from this catch, the promise that's being returned from getJSON will reject and can be handled in model.js
  }
};

/*
// Exported for use in model script
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Promise.race receives an array of Promises.
    const data = await res.json();

    // The API returns a nice error message where we can use it's .message property.
    // The .ok property is stored in the res itself.
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // return the data so model.js can keep using it.
  } catch (err) {
    throw err; // with this re-throwing of the err from this catch, the promise that's being returned from getJSON will reject and can be handled in model.js
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Promise.race receives an array of Promises.
    const data = await res.json();

    // The API returns a nice error message where we can use it's .message property.
    // The .ok property is stored in the res itself.
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // return the data so model.js can keep using it.
  } catch (err) {
    throw err; // with this re-throwing of the err from this catch, the promise that's being returned from getJSON will reject and can be handled in model.js
  }
};
*/
