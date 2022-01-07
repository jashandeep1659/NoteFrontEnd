import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TineEditor from "../components/TineEditor";
import { CREATE_NOTE_ACTION } from "../actions";

export class CreateNote extends Component {
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
                    value={props.value}
                    placeholder={props.placeholder}
                    className={props.className}
                />
            </div>
        );
    };
    handleform = (event) => {
        this.props.CREATE_NOTE_ACTION(event);
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
                    <TineEditor tinymceValue={this.tinymceValue} />
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
})(CreateNote);

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, { CREATE_NOTE_ACTION })(formWrapper);
