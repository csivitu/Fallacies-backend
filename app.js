/* eslint-disable linebreak-style */
require('dotenv').config();
require('./models/dbInit');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const signup = require('./routes/signupRoute');
const login = require('./routes/loginRoute');
const logout = require('./routes/logout');
const verify = require('./routes/verification');
const submissions = require('./routes/submissionsRoute');
const admin = require('./routes/adminRouter');
const leaderboard = require('./routes/leaderboardRoute');
const home = require('./routes/homepage');
// const timer = require('./routes/timerRoute');
// const Question = require('./models/Questions');
// const leaderboard = require('./routes/leaderboardRoute');
const app = express();
const port = process.env.PORT || 8080;

/**
* Admin Panel uses some stuff which clashes with bodyParser.
* So we setup the admin panel before we setup body parser.
*/
app.use('/admin', admin);

// app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use('/static', express.static(`${__dirname}/static`));
app.use(session({ secret: process.env.SESSION_SECRET || 'sessionSecretKey', saveUninitialized: true, resave: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for (let i = 1; i < 11; i += 1) {
//   const ques = new Question({
//     Id: i,
//     Answer: `answer${i}`,
//     NextAccount: `account${i}`,
//   });
//   ques.save();

//   if (i === 10) {
//     console.log('Saved all questions');
//   }
// }
// app.use('/leaderboard', leaderboard);
// app.use('/signup', signup);
// app.use('/login', login);
// app.use('/verify', verify);
// app.use('/logout', logout);
// app.use('/submissions', submissions);
// app.use('/leaderboard', leaderboard);
// app.use('/homepage', home);
// app.use('/timer', timer);
app.get('/', (req, res) => {
  res.render('endevent');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});