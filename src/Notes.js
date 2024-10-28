import Note from './Note';
import AddNote from './AddNote';
import NoteClass from './class/NoteClass';
import { Table, Button } from 'react-bootstrap';
import { Component } from 'react';


class Notes extends Component {
    constructor() {
        super();
        this.state = {
            noteList: [
                new NoteClass(1, "Go to school", "To Do", "First day at school", true, '', ''),
                new NoteClass(2, "Go to cinema", "Hobby", "New movie with friends", undefined, '', ''),
                new NoteClass(3, "Meet friends", "To Do", "Meeting in the park", false, '', ''),
            ],
            showAddNoteModal: false,
            nextId: 4
        }
    }

    addNote = (s) => {
        this.setState(state => {
            const date = s.date === undefined ? "" : s.date;
            const time = s.time === undefined ? "" : s.time;
            const status = s.category === "To Do" ? false : undefined;

            const newNote = new NoteClass(
                state.nextId,
                s.title,
                s.category,
                s.content,
                status,
                date,
                time
            );

            return { 
                noteList: state.noteList.concat(newNote),
                nextId: state.nextId + 1,
                showAddNoteModal: false
            };
        })
    }

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

