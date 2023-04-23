module.exports = {
  HOST: "173.82.16.160",
  USER: "developer",
  PASSWORD: "Passport@1",
  DB: "helpout",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
