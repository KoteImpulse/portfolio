const path = require('path');
const { i18n } = require('./next-i18next.config');


module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['localhost'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	i18n,

};
