import Note from './Note';
import AddNote from './AddNote';
import { Table, Button } from 'react-bootstrap';
import { Component } from 'react';
import { getAllNotes, addNote, removeNote } from './api/NotesApi';


class Notes extends Component {
    constructor() {
        super();
        this.state = {
            noteList: [],
            showAddNoteModal: false,
        }
    }

    async componentDidMount() {
        try {
            const notes = await getAllNotes();
            this.setState({ noteList: notes });
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    addNote = async (s) => {
        const date = s.date || "";
        const time = s.time || "";
        const status = s.category === "To Do" ? false : undefined;
        
        const newNote = {
            title: s.title,
            category: s.category,
            content: s.content,
            status,
            date,
            time
        };

        try {
            const response = await addNote(newNote);
            if (response.status === 201) {
                const savedNote = response.data;
                this.setState(state => ({
                    noteList: [...state.noteList, savedNote],
                    nextId: state.nextId + 1,
                    showAddNoteModal: false
                }));
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }

    handleDelete = async (id) => {
        try {
            const response = await removeNote(id);
            if (response.status === 204) {
                this.setState(state => ({
                    noteList: state.noteList.filter(note => note.id !== id)
                }));
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    toggleAddNoteModal = () => {
        this.setState({ showAddNoteModal: !this.state.showAddNoteModal });
    }

    filter(content, length) {
        return content.length > length ? content.substring(0, length) + "..." : content;
    }

    render() {
        return(
            <div className='container'>
                <div className='row'>
                    <h1 className='text-center mt-5 mb-3'>List of Notes</h1>
                    <div className="text-end mt-3 mb-2">
                        <Button variant="primary" onClick={this.toggleAddNoteModal}>
                            Add Note
                        </Button>
                    </div>
                    <Table className='table-striped table-bordered table-responsive'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Content</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.noteList.map( (note) => {
                                return(
                                    <Note
                                    key = {note.id}
                                    title = {this.filter(note.title, 15)}
                                    category = {note.category}
                                    content = {this.filter(note.content, 24)}
                                    status = {note.status}
                                    onDelete={() => this.handleDelete(note.id)}
                                    />
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                <AddNote
                    show={this.state.showAddNoteModal}
                    onHide={this.toggleAddNoteModal}
                    addNote={this.addNote}
                />
            </div>
        );
    };
};

export default Notes;

