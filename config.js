module.exports = {
	site: {
		root: './site',
		port: 8080,
	},

	blog: {
		root: './blog'
	},

	database: {
		uri: 'https://localhost:27017',
		port: 8000,
		credentials: {
			mongoose_auth: {
				user: 'ewic',
				pass: 'testpassword'
			}
		}
	}
}