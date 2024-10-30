import PropTypes from 'prop-types'
import * as Icon from 'react-bootstrap-icons';

const Note = ({ title, category, content, status, onDelete }) => {
    return(
        <tr>
            <td className='align-middle ps-3'>{title}</td>
            <td className='align-middle ps-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    {category}
                    {
                        category === "To Do" ? 
                        <Icon.ListCheck className='m-2' size={48} /> : 
                        <Icon.FileText className='m-2' size={48} />
                    }
                </div>
            </td>
            <td className='align-middle ps-3'>{content}</td>
            <td className='align-middle ps-3'>
                <div className='d-flex align-items-center'>
                    <div className='me-md-3 me-lg-5'>
                        <Icon.List size={30} color='green' className='item' />
                        <i>Detail</i>
                    </div>
                    <div className='me-md-3 me-lg-5'>
                        <Icon.Bell size={30} color='#999900' className='item' />
                        <i>Remind</i>
                    </div>
                    <div className='me-md-3 me-lg-5'>
                        <Icon.Pencil size={28} color='blue' className='item' />
                        <i>Edit</i>
                    </div>
                    <div className='me-md-3 me-lg-5'>
                        <Icon.Trash size={30} color='black' className='item' onClick={onDelete} />
                        <i>Delete</i>
                    </div>

                    {status !== undefined && (
                        <div className='me-md-3 me-lg-5'>
                            {status ? (
                                <Icon.CheckCircle size={30} color='green' className='item' />
                            ) : (
                                <Icon.XCircle size={30} color='red' className='item' />
                            )}
                            <i>{status ? "Done" : "Undone" }</i>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
}

Note.propTypes = {
    title: PropTypes.string,
    category: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.bool,
    onDelete: PropTypes.func
};

export default Note;