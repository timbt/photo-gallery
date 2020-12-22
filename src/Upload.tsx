import React, { useState } from 'react';

interface UserImage {

    data?: File,
    previewSrc?: string
}

const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    console.log(e);

};

function Upload() {

    const [image, setImage] = useState<UserImage>({});
    // const [imagePreviewSrc, setImagePreviewSrc] = useState<string | undefined>(undefined);

    const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Update the component's state to reflect the new image
        const newImage = e.target.files ? e.target.files[0] : null;

        // Load the image preview
        let reader = new FileReader();
        reader.onloadend = () => {
            setImage({
                data: newImage ? newImage : undefined,
                previewSrc: reader.result ? reader.result.toString() : undefined});
        };
        if (newImage) reader.readAsDataURL(newImage);

    };

    // Submission form will be rendered only if an image has been provided
    const submissionForm = image ? 
    (
        <form onSubmit={e => onFormSubmit(e)}>
                <input type="text" placeholder="Title your image" />
                <input type="submit" value="Submit" />
            </form>
    ) : null;

    return (
        <div>

            <h1>Upload an image</h1>
            <input type="file" onChange={loadImage}/>

            <div>
                <img src={image.previewSrc} alt="preview" hidden={image.previewSrc ? false : true} />
            </div>

            {submissionForm}

        </div>
    );

}

export default Upload;
