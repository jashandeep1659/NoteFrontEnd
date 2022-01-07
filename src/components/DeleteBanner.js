import React from "react";
import { connect } from "react-redux";
import {
    DELETE_BANNER_ACTION,
    DELETE_NOTE_ACTION,
    NOTES_FETCH_ACTION,
} from "../actions";
import { useNavigate } from "react-router-dom";

const DeleteBanner = (props) => {
    let navigate = useNavigate();
    return (
        <div id="deleteBanner">
            <div className="main1">
                <div className="banner">
                    <div className="font-bold  text-lg py-4 px-2 text-center">
                        Are you Sure
                    </div>
                    <p className="text-center py-2 px-3">
                        Do you want to delete this note. It can't be recovered
                        in future.
                    </p>
                    <div className="flex pt-3">
                        <button
                            onClick={() => props.DELETE_BANNER_ACTION(false)}
                            className="  w-full bg-green-100 text-blue-600 font-bold rounded-bl-lg py-2 duration-300 hover:bg-green-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                props.DELETE_NOTE_ACTION(props.id);
                                props.DELETE_BANNER_ACTION(false);
                                navigate("/");
                            }}
                            className=" w-full bg-red-600 rounded-br-lg font-bold text-white duration-300 hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        id: state.DELETE_BANNER_REDUCER["id"],
    };
};
export default connect(mapStateToProps, {
    DELETE_BANNER_ACTION,
    DELETE_NOTE_ACTION,
    NOTES_FETCH_ACTION,
})(DeleteBanner);
