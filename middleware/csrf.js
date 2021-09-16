const csrf = require('csurf');

module.exports = (app) => {
  app.use(
    csrf({
      cookie: {
        httpOnly: true,
        secure: false,
        key: 'XSRF-TOKEN',
        path: '/',
        maxAge: 1000 * 60 * 60,
      },
    }),
  );
};
