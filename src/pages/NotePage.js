import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NOTE_FETCH_ACTION, DELETE_BANNER_ACTION } from "../actions/index";
import { Link, useParams } from "react-router-dom";

const NotePage = (props) => {
    const currentId = useParams();
    useEffect(() => {
        props.NOTE_FETCH_ACTION(currentId.id);
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <Link
                    className="mx-4 mt-5 duration-500 bg-green-600 px-3 py-1 hover:bg-green-800 rounded-md text-white inline-flex items-center"
                    to={`/editnote/${props.note.id}`}
                >
                    <i className="bx bx-edit mx-1 inline-block"></i> Edit
                </Link>
                <div
                    className="mx-4 mt-5 duration-500 bg-red-600 px-3 py-1 hover:bg-red-800 rounded-md text-white inline-flex items-center"
                    onClick={() =>
                        props.DELETE_BANNER_ACTION(true, props.note.id)
                    }
                >
                    <i className="bx bx-trash mx-1 vertical-align-center"></i>{" "}
                    Delete
                </div>
            </div>
            <div className="mx-4 mt-4">
                <p className="font-bold text-lg border-2 rounded-md drop-shadow p-3  border-solid border">
                    {props.note.title}
                </p>
                <div className=" border-2 rounded-md drop-shadow p-3 mt-4 border-solid border ">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: props.note.description,
                        }}
                    ></p>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        note: state.NOTE_FETCH_REDUCER,
    };
};
export default connect(mapStateToProps, {
    NOTE_FETCH_ACTION,
    DELETE_BANNER_ACTION,
})(NotePage);
