const { CollectionModel } = require('../../global').models;

const lessonRemoved = (app) => {
	app.service('lessons').on('removed', (result, context) => {
		const { method, path } = context;
		const on = 'collections';
		CollectionModel.deleteMany({ lesson: context.id }).lean().exec((err, doc) => {
			app.logger.event({
				on, method, path, result, err, doc,
			});
		});
	});
};

module.exports = (app) => {
	lessonRemoved(app);
};
