import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TineEditor from "../components/TineEditor";
import { UPDATE_NOTE_ACTION } from "../actions";
import { Link, useParams } from "react-router-dom";
import { NOTE_FETCH_ACTION } from "../actions/index";

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

export class CreateNote extends Component {
    // currentId = window.location;
    componentDidMount() {
        const current_id = this.props.params.id;
        this.props.NOTE_FETCH_ACTION(current_id);
    }

    tinymceValue = (value) => {
        this.props.change("description", value);
        this.setState({ formdetail: value });
    };
    state = {
        formdetail: "",
    };

    renderField = (props) => {
        return (
            <div>
                <input
                    key={props.id}
                    name={props.name}
                    type={props.type}
                    autoComplete={props.autoComplete}
                    {...props.input}
                    placeholder={props.placeholder}
                    className={props.className}
                />
            </div>
        );
    };
    handleform = (event) => {
        this.props.UPDATE_NOTE_ACTION(event, this.props.note.id);
    };
    render() {
        return (
            <div className="mx-4 my-4">
                <form onSubmit={this.props.handleSubmit(this.handleform)}>
                    <p className="font-bold">Note Title</p>
                    <Field
                        component={this.renderField}
                        placeholder="Note Title"
                        name="title"
                        required={true}
                        className="w-full border-600 border-2 border-solid my-2 outline-0  p-2 rounded-md focus:outline-1 outline-green-300"
                    ></Field>
                    <Field
                        name="description"
                        component={this.renderField}
                        className="hidden"
                    ></Field>
                    <TineEditor
                        tinymceValue={this.tinymceValue}
                        initial={this.props.note.description}
                    />
                    <button className="button bg-green-500 hover:bg-green-600 duration-300 px-3 py-2 rounded-md text-white mt-3 ">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

const formWrapper = reduxForm({
    form: "createnoteform",
})(withParams(CreateNote));

const mapStateToProps = (state, ownProps) => {
    return {
        note: state.NOTE_FETCH_REDUCER,
        initialValues: {
            title: state.NOTE_FETCH_REDUCER["title"],
        },
        enableReinitialize: true,
        title: state.NOTE_FETCH_REDUCER["title"],
    };
};

export default connect(mapStateToProps, {
    UPDATE_NOTE_ACTION,
    NOTE_FETCH_ACTION,
})(formWrapper);
