import { Modal, Button, Form } from 'react-bootstrap';
import { Component } from 'react';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            content: '',
            date: '',
            time: '',
            errors: {}
        }
    }

    handleAddNote = () => {
        const { title, category } = this.state;
        const errors = {};

        if (!title) errors.title = "Please add Title";
        if (!category) errors.category = "Please select a Category";

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        this.props.addNote(this.state);

        this.setState({
            title: '',
            category: '',
            content: '',
            date: '',
            time: '',
            errors: {}
        });
    }

    onChange = (e) => {
        const { id, value } = e.target;
        this.setState((prevState) => ({
            [id]: value,
            errors: { ...prevState.errors, [id]: undefined }
        }));
    };

    render() {
        const { errors } = this.state;

        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                id="title"
                                value={this.state.title}
                                onChange={this.onChange}
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                id="category"
                                value={this.state.category}
                                onChange={this.onChange}
                                isInvalid={!!errors.category}
                            >
                                <option value="">Choose category</option>
                                <option value="Education">Education</option>
                                <option value="Hobby">Hobby</option>
                                <option value="To Do">To Do</option>
                                <option value="Work">Work</option>
                                <option value="Gym">Gym</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                id="content"
                                value={this.state.content}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                id="date"
                                value={this.state.date}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                id="time"
                                value={this.state.time}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleAddNote}>
                        Add Note
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddNote;