import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { NOTES_FETCH_ACTION, DELETE_BANNER_ACTION } from "../actions";
import NotesApi from "../api/NotesApi";

const NotesPage = (props) => {
    useEffect(() => {
        props.NOTES_FETCH_ACTION();
    }, []);
    let notes = props.notes;
    const renderNote = notes.map((note) => {
        return (
            <div key={note.id} className=" flex flex-col justify-between">
                <Link
                    to={`/note/${note.id}`}
                    className="content hover:bg-gray-300 h-full duration-300 rounded-t-md p-0 border-solid border-2 border-600"
                >
                    <h5 className="py-4 px-3 font-bold">{note.title}</h5>
                </Link>
                <div className="flex ">
                    <Link
                        to={`/editnote/${note.id}`}
                        className="w-full text-center py-3  bg-green-600 text-white round rounded-bl-md hover:bg-green-700 duration-300"
                    >
                        <i className="bx bx-edit-alt  font-bold text-white"></i>{" "}
                        Edit
                    </Link>
                    <div
                        onClick={() =>
                            props.DELETE_BANNER_ACTION(true, note.id)
                        }
                        className="w-full text-center py-3 bg-red-600 text-white rounded-br-md  hover:bg-red-700 duration-300"
                    >
                        <i className="bx bxs-trash  font-bold "></i> Delete
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className=" mx-4 my-5">
            <div className="grid grid-cols-1 md:grid-cols-5 font-sans gap-4">
                <div className="rounded-md p-0 border-solid border-2 border-600"></div>
                {renderNote}
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        notes: Object.values(state.NOTES_FETCH_REDUCER),
        delete: state.DELETE_BANNER_REDUCER,
    };
};

export default connect(mapStateToProps, {
    NOTES_FETCH_ACTION,
    DELETE_BANNER_ACTION,
})(NotesPage);
