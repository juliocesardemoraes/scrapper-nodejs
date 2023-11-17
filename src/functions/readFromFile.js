const filesystem = require('fs')

//verify if the consult alreay exist
const readFromFile = (filename) => {
    const promiseCallback = (resolve, reject) => {
        filesystem.readFile(filename, 'utf8', (error, contents) => {
            if(error) {
            console.log('there is not cache')
            resolve(null);
            }
            resolve(contents)
        })
    }
    return new Promise(promiseCallback)
}

module.exports = readFromFile