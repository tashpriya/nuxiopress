module.exports = {
    helpers: {
        raw: function(options) {
            return options.fn(this)
        }
    },
    skipInterpolation: "**/*.vue",
    prompts: {
        name: {
            'type': 'string',
            'required': true,
            'message': 'Project name',
            'default': 'nuxiopress'
        },
        description: {
            'type': 'string',
            'required': false,
            'message': 'Project description',
            'default': 'A Nuxt PWA starter template with Encrypted Cookies, Express.js, Axios, Vue Router, Passport.js.'
        },
        author: {
            'type': 'string',
            'message': 'Author',
            'default': '(RightBrainTechBD <www.jbc.bd@gmail.com>)'
        },
    },
    completeMessage: '{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}'
};
