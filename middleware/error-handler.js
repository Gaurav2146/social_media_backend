module.exports = (app) => {
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    if (res && res.locals) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    }
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
