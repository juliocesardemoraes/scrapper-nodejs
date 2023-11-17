const filesystem = require("fs");

//FUNCTION TO CREATE FILE HTML
const writeToFile = (data, path) => {
  const promiseCallback = (resolve, reject) => {
    filesystem.writeFile(path, data, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(true);
    });
  };
  return new Promise(promiseCallback);
};

module.exports = writeToFile;
