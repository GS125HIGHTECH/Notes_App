import { Table, Button } from 'react-bootstrap';
import { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            content: '',
            date: '',
            time: ''
        }
    }

    handleAddNote = () => {
        const requiredFields = [
            { field: 'title', message: 'Please add Title' },
            { field: 'category', message: 'Please select a Category' }
        ];
    
        for (let { field, message } of requiredFields) {
            if (!this.state[field]) {
                alert(message);
                return;
            }
        }

        this.props.addNote(this.state);

        this.setState({
            title: '',
            category: '',
            content: '',
            date: '',
            time: ''
        });
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

    render() {
        return(
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
                                <td className='align-middle'><Button variant='primary' onClick={this.handleAddNote}>Add</Button></td>
                            </tr>
                        </tbody>
                    </Table>
        )
    }
}

export default AddNote;