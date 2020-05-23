const Agenda = require('agenda');

module.exports = (mongo) => {
  return new Agenda({ mongo });
};
