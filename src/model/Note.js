import mongoose from '../config/database';

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

notesSchema.index({ title: 'text', body: 'text' });

export default mongoose.model('Note', notesSchema);
