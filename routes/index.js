
const routes = require("express").Router();

const lesson1Controller = require("../controllers/lesson_1");

routes.get('/', lesson1Controller.traceyRoute);
routes.get('/jordan', lesson1Controller.jordanRoute);
routes.get('/jared', lesson1Controller.jaredRoute);
routes.get('/taylor', lesson1Controller.taylorRoute);

module.exports = routes;