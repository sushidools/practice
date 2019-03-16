const User = require('mongoose').model('User');
const { Http } = require('@status/codes');

module.exports = {
  login(request, response) {
    const { email, password } = request.body;

    User.findOne({ email })
      .then(user => {
        return User.validatePassword(password, user.password).then(valid => {
          if (!valid) {
            throw new Error();
          }

          // login
          completeLogin(request, response, user);
        });
      })
      .catch(error => {
        response
          .status(Http.Unauthorized)
          .json('email/password combo not found');
      });
  },
  register(request, response) {
    User.create(request.body)
      .then(user => {
        // login
        completeLogin(request, response, user);
      })
      .catch(error => {
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );
        response.status(Http.UnprocessableEntity).json(errors);
      });
  },
  logout(request, response) {
    console.log('logging out');

    request.session.destroy();
    response.clearCookie('userID');
    response.clearCookie('expiration');
    response.json(Http.Ok);
  },
};

function completeLogin(request, response, user) {
  console.log('completing login');

  request.session.user = user.toObject();
  console.log(request.session.user);
  request.session.userID = user._id;
  delete request.session.user.password;

  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 864000 * 1000);

  response.json(user);
}