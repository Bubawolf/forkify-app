import { TimeoutToSeconds } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // Loading Recipe
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TimeoutToSeconds)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadDAta) {
  try {
    // Loading Recipe
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(uploadDAta),
    });

    const res = await Promise.race([fetchPro, timeout(TimeoutToSeconds)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
