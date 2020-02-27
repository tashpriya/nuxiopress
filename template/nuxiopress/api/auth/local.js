const expressAxios = require('./express-axios');

const Local = {
  async authenticate(user, callback) {
    let userData = {
      first_name: user.name.givenName,
      last_name: user.name.familyName,
      email: user.emails[0].value,
      avatar: user.photos[0].value,
      provider: user.provider.toLowerCase(),
      provider_id: user.id
    };
    const { data } = await expressAxios.post(
      process.env.SOCIAL_AUTH_URL,
      userData
    );
    let ssnId = data.accessToken;

    callback(ssnId);
  }
};

module.exports = Local;
