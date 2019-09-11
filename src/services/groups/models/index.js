const mongoose = require('mongoose');

const { addTypeString } = require('../../../global/helpers');

const { Schema } = mongoose;

const subGroupSchema = new Schema({
	users: [{ type: Schema.Types.ObjectId }],
	title: { type: String, default: '' },
//	note: { type: String, default: '' },
//	feedback: { type: String, default: '' },
});

const userNamesSchema = new Schema({
	user: [{ type: Schema.Types.ObjectId, require: true }],
	name: { type: String, require: true },
});

const groupSchema = new Schema({
	context: { type: String, default: 'lesson', enum: ['api', 'course', 'lesson'] },
	modus: { type: String, default: 'standard', enum: ['standard', 'optIn'] },
	contextInfo: { type: String }, // add by user to display information over this group
	users: [{ type: Schema.Types.ObjectId }],
	groups: [subGroupSchema],
	userNames: [userNamesSchema],
	title: { type: String, default: '' },
//	note: { type: String, default: '' },
//	feedback: { type: String, default: '' },
	autogenerated: { type: Boolean, default: false },
	deletedAt: { type: Date, expires: (60 * 60 * 24 * 30) },
	createdFrom: { type: Schema.Types.ObjectId, default: null },
	updatedBy: { type: Schema.Types.ObjectId, default: null },
}, {
	timestamps: true,
});

groupSchema
	.post('find', addTypeString('group'))
	.post('findOne', addTypeString('group'));

module.exports = {
	GroupModel: mongoose.model('group', groupSchema),
};
