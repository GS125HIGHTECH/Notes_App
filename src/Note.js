import React from 'react';
import PropTypes from 'prop-types'

const Note = props => {
    return(
        <tr>
            <td>{props.title}</td>
            <td>{props.category}</td>
            <td>{props.content}</td>
            <td>{new Intl.DateTimeFormat('pl-PL').format(new Date(props.date))}</td>
        </tr>
    );
}

Note.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
};

Note.defaultProps = {
    title: "Note Title",
    category: "Note Category",
    content: "Note Content",
    date: new Date(1)
}

export default Note;