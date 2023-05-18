const info = (...params: string[] | unknown[]) => {
  console.log("Info:", ...params);
};

const error = (...params: string[] | unknown[]) => {
  console.log("Error:", ...params);
};

export default { info, error };
