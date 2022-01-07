import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import NotesApi from "./api/NotesApi";
import CreateNote from "./pages/CreateNote";
import NotePage from "./pages/NotePage";
import EditNote from "./pages/EditNote";
import DeleteBanner from "./components/DeleteBanner";
import { NOTES_FETCH_ACTION } from "./actions";

const App = (props) => {
    let [check, setCheck] = useState(false);
    let [loading, setLoading] = useState(true);
    if (!check) {
        const checkFunction = async () => {
            const response = await NotesApi.get("/").catch((err) =>
                Promise.reject(err)
            );
        };
        setCheck(true);
        setLoading(false);
        checkFunction();
    }

    // const loading = false;
    return (
        <div>
            {loading ? (
                <div>
                    <h1>Loading ....</h1>
                </div>
            ) : (
                <BrowserRouter>
                    {props.deleteBannerStatus.status ? (
                        <DeleteBanner id="" />
                    ) : null}
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                props.userstatus ? <NotesPage /> : <HomePage />
                            }
                            exact
                        />
                        <Route path="/login" element={<LoginPage />} exact />
                        <Route path="/note" element={<NotesPage />} exact />
                        <Route path="/note/:id" element={<NotePage />} exact />
                        <Route
                            path="/editnote/:id"
                            element={<EditNote />}
                            exact
                        />
                        <Route
                            path="/createnote"
                            element={<CreateNote />}
                            exact
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userstatus: state.USER_STATUS_REDUCER,
        deleteBannerStatus: state.DELETE_BANNER_REDUCER,
    };
};
export default connect(mapStateToProps)(App);
