export const getRequest = async (url: string) => {
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};

export const shuffleArray = (array: any[]) => {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};
