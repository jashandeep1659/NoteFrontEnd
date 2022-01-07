import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function App(props) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const inital = props.initial;
    const onChange = (content) => {
        props.tinymceValue(content);
    };
    return (
        <>
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                apiKey="fcjry4838ttam7lqaklcsko2s66s6tr5p7c3nx4w8a52xspu"
                initialValue={inital}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={onChange}
            />
        </>
    );
}
