import React, { useEffect } from "react";
import { ClipboardCheckIcon, LockClosedIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { USER_LOGIN_ACTION, NOTES_FETCH_ACTION } from "../actions";

class Example extends React.Component {
    renderField = (props) => {
        return (
            <div>
                <input
                    key={props.id}
                    name={props.name}
                    type={props.type}
                    autoComplete={props.autoComplete}
                    required
                    {...props.input}
                    value={props.value}
                    placeholder={props.placeholder}
                    className={props.className}
                />
            </div>
        );
    };
    onFormSubmit = (event) => {
        this.props.USER_LOGIN_ACTION(event);
        console.log(event);
        // window.location = "/";
    };
    render() {
        return (
            <div>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Or{" "}
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    start your 14-day free trials
                                </a>
                            </p>
                        </div>
                        <form
                            className="mt-8 space-y-6"
                            id="my-form"
                            onSubmit={this.props.handleSubmit(
                                this.onFormSubmit
                            )}
                        >
                            <div className="rounded-md shadow-sm -space-y-px ">
                                <div>
                                    <Field
                                        label="Email address"
                                        key="45"
                                        name="username"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        component={this.renderField}
                                    />
                                </div>
                                <div>
                                    <Field
                                        key="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        component={this.renderField}
                                    />
                                </div>
                            </div>
                            <p className="error-text text-red-400 text-sm font-bold  mt-1 block pt-0">
                                {this.props.errorss
                                    ? `${this.props.errorss}`
                                    : null}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon
                                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const formWrapper = reduxForm({
    form: "nameoftheform",
    // validate,
})(Example);

const mapStateToProps = (state) => {
    return {
        errorss: state.LOGIN_PAGE_REDUCER_ERROR.detail,
    };
};

export default connect(mapStateToProps, {
    USER_LOGIN_ACTION,
})(formWrapper);
