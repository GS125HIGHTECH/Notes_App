import React from 'react';
import Note from './Note';
import { Table } from 'react-bootstrap';

const noteList = [
    {
        title: "Go to school",
        category: "Education",
        content: "First day at school",
        date: new Date("2024-10-21")
    },
    {
        title: "Go to cinema",
        category: "Hobby",
        content: "New movie with friends",
        date: new Date("2024-11-12")
    }
]

function Notes() {
    const header = <h1 className='text-center mt-5 mb-3'>List of Notes</h1>
    return(
        <div>
            {header}
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Content</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    <Note />
                    {noteList.map( (note, key) => {
                        return(
                            <Note
                            key = {key}
                            title = {note.title}
                            category = {note.category}
                            content = {note.content}
                            date = {note.date}
                            />
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Notes;

