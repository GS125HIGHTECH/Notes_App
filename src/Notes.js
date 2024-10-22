import Note from './Note';
import { Table, Button } from 'react-bootstrap';
import { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';


class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteList: [
                {
                    title: "Go to school",
                    category: "To Do",
                    content: "First day at school",
                    date: '',
                    time: '',
                    status: true
                },
                {
                    title: "Go to cinema",
                    category: "Hobby",
                    content: "New movie with friends",
                    date: '',
                    time: '',
                    status: undefined
                },
                {
                    title: "Meet friends",
                    category: "To Do",
                    content: "Meeting in the park",
                    date: '',
                    time: '',
                    status: false
                }
            ],
            title: '',
            content: '',
            category: '',
            date: '', 
            time: '' 
        }
    }

    onChange(e) {
        var name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    }

    onClick() {
        confirmAlert({
            customUI: ({onClose}) => {
                return(
                    <div>
                        <h1>Add content</h1>
                        <p><textarea cols={50} rows={10} id='content' defaultValue={this.state.content} onChange={(e) => this.onChange(e)}></textarea></p>
                        <div className='d-flex justify-content-end'><Button variant='danger' onClick={onClose}>Close window</Button></div>
                    </div>
                )
            }
        }) 
    }

    addNote() {
        this.setState(state => {
            var date = state.date === undefined ? "" : state.date;
            var time = state.time === undefined ? "" : state.time;

            const newNote = {
                title: state.title,
                category: state.category,
                content: state.content,
                date: date,
                time: time,
                status: state.category === "To Do" ? false : undefined
            };

            return { 
                noteList: state.noteList.concat(newNote),
                title: '',     
                category: '',
                content: '',
                date: '',
                time: ''
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
                <Table className='table-striped table-bordered table-responsive mt-5'>
                    <tbody>
                        <tr>
                            <td colSpan={5} className='text-center'><i><b>Add note</b></i></td>
                        </tr>
                        <tr>
                            <td className='align-middle'><input type='text' placeholder='Title' id='title' value={this.state.title} onChange={(e) => this.onChange(e)} /></td>
                            <td className='align-middle'>
                                <select id='category' className='form-select' value={this.state.category} onChange={(e) => this.onChange(e)}>
                                    <option value=''>Choose category</option>
                                    <option value='Education'>Education</option>
                                    <option value='Hobby'>Hobby</option>
                                    <option value='To Do'>To Do</option>
                                    <option value='Work'>Work</option>
                                    <option value='Gym'>Gym</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </td>
                            <td className='align-middle'>
                                {
                                    this.state.content && this.state.content !== "" ? (
                                        <Button variant='primary' onClick={() => this.onClick()}>Edit Content</Button>
                                     ) : (
                                        <Button variant='success' onClick={() => this.onClick()}>Add Content</Button>
                                     )
                                }
                            </td>
                            <td className='align-middle'>
                                <input type='date' id='date' value={this.state.date} onChange={(e) => this.onChange(e)} />
                                <input type='time' id='time' className='ms-2' value={this.state.time} onChange={(e) => this.onChange(e)} />
                            </td>
                            <td className='align-middle'><Button variant='primary' onClick={() => this.addNote()}>Add</Button></td>
                        </tr>
                    </tbody>
                </Table>
                </div>
            </div>
        );
    };
};

export default Notes;

