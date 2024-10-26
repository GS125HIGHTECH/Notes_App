import Note from './Note';
import AddNote from './AddNote';
import NoteClass from './class/NoteClass';
import { Table } from 'react-bootstrap';
import { Component } from 'react';


class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteList: [
                new NoteClass(1, "Go to school", "To Do", "First day at school", true, '', ''),
                new NoteClass(2, "Go to cinema", "Hobby", "New movie with friends", undefined, '', ''),
                new NoteClass(3, "Meet friends", "To Do", "Meeting in the park", false, '', ''),
            ],
        }
    }

    addNote = (s) => {
        this.setState(state => {
            const id = state.noteList.length + 1;
            const date = s.date === undefined ? "" : s.date;
            const time = s.time === undefined ? "" : s.time;
            const status = s.category === "To Do" ? false : undefined;

            const newNote = new NoteClass(
                id,
                s.title,
                s.category,
                s.content,
                status,
                date,
                time
            );

            return { 
                noteList: state.noteList.concat(newNote),
            };
        })
    }

    filter(content, length) {
        return content.length > length ? content.substring(0, length) + "..." : content;
    }

    render() {
        return(
            <div className='container'>
                <div className='row'>
                <h1 className='text-center mt-5 mb-3'>List of Notes</h1>
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
                        {this.state.noteList.map( (note, key) => {
                            return(
                                <Note
                                key = {key}
                                title = {this.filter(note.title, 15)}
                                category = {note.category}
                                content = {this.filter(note.content, 24)}
                                status = {note.status}
                                />
                            );
                        })}
                    </tbody>
                </Table>
                <AddNote addNote = {this.addNote} />
                </div>
            </div>
        );
    };
};

export default Notes;

