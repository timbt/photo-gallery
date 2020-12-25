import React, { useState } from 'react';
import axios from 'axios';

interface UserImage {
    file?: File,
    previewSrc?: string
}

function Upload(props: { api : string }) {

    const [image, setImage] = useState<UserImage>({});

    /* Handles storing an uploaded image in the component's state and creating
     * a visible preview for the image */
    const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Update the component's state to reflect the new image
        const newImage = e.target.files ? e.target.files[0] : null;

        // Load the image preview
        let reader = new FileReader();
        reader.onloadend = () => {
            setImage({
                file: newImage ? newImage : undefined,
                previewSrc: reader.result ? reader.result.toString() : undefined});
        };
        if (newImage) reader.readAsDataURL(newImage);

    };

    /** Handles submitting an image to the server */
    const submitImage = (e : React.FormEvent<HTMLFormElement>) => {

        // Prevent page reload on submission
        e.preventDefault();

        // Get a signed URL from the API for sending the image to S3
        axios.get(`${props.api}/sign-s3?file-name=${image.file?.name}&file-type=${image.file?.type}`)
            .then(response => {
                // Submit the image to S3 for storage after getting the signed URL
                return axios.put(response.data.signedRequest, image.file);

            }).catch( err => alert("Could not upload image: " + err));
            
    };

    // Submission form will be rendered only if an image has been provided
    const submissionForm = image.file ? 
        (
            <form onSubmit={e => submitImage(e)}>
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
