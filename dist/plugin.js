exports.version = 0.9
exports.description = "Starfield effect background"
exports.apiRequired = 8.1
exports.repo = "SanokKule/starfield-background"
exports.frontend_js = 'main.js'
exports.config = {
	star_speed: {
		frontend: true,
		type: 'number',
		min: 0.001,
		max: 2.0,
		placeholder: 'default: 0.025'
	},
	max_stars: {
		frontend: true,
		type: 'number',
		min: 0,
		max: 5000,
		placeholder: 'default: 500'
	},
	max_framerate: {
		frontend: true,
		type: 'number',
		min: 0,
		max: 360,
		placeholder: 'default: 60'
	}
}
exports.configDialog = {
    sx: { maxWidth: '26em' }
}
