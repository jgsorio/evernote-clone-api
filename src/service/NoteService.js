import Note from '../model/Note';

class NoteService {
    async all(req, res) {
        const { search } = req.query;
        const filter = { author: req.userId };
        if (search) {
            Object.assign(filter, { $text: { $search: search }});
        }
        const notes = await Note.find(filter);
        res.json(notes);
    }

    async create(req, res) {
        const { title, body } = req.body;
        const note = await Note.create({ title, body, author: req.userId });
        return res.json(note);
    }

    async update(req, res) {
        const id = req.params.id;
        const userId = req.userId;
        const { title, body } = req.body;
        const note = await Note.findOne({ _id: id });
        if (!note) {
            return res.status(404).json({'error': 'Note not found' });
        }

        if (!isOwner(note.author, userId)) {
            return res.status(400).json({'error': 'Do you not have permission to update this note' });
        }

        const noteUpdated = await Note.findOneAndUpdate({_id: id}, { title, body }, { new: true });
        return res.json(noteUpdated);
    }


    async delete(req, res) {
        const id = req.params.id;
        const userId = req.userId;
        const note = await Note.findOne({ _id: id });

        if (!note) {
            return res.status(404).json({'error': 'Note not found' });
        }
        if (!isOwner(note.author, userId)) {
            return res.status(400).json({'error': 'Do you not have permission to delete this note' });
        }

        await Note.deleteOne({_id: note._id });
        return res.json({'error': 'Note deleted successfully'});
    }

    async show(req, res) {
        const id = req.params.id;
        const userId = req.userId;
        const note = await Note.findOne({ _id: id });

        if (!note) {
            return res.status(404).json({'error': 'Note not found' });
        }

        if (!isOwner(note.author, userId)) {
            return res.status(400).json({'error': 'Do you not have permission to show this note' });
        }

        return res.json(note)
    }
}

function isOwner(authorId, userId) {
    return JSON.stringify(authorId) === JSON.stringify(userId);
}

export default new NoteService();