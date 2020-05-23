const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const agendaLoader = require('./agenda');
const jobsLoader = require('./jobs');

module.exports = async (app) => {
  console.log('Loading modules...');
  const mongooseConnection = await mongooseLoader();
  console.log('* MongoDB loaded!');
  const agenda = agendaLoader(mongooseConnection);
  console.log('* Agenda loaded!');
  await jobsLoader(agenda);
  console.log('* Jobs loaded!');
  expressLoader(app);
  console.log('* Express loaded!');
};
