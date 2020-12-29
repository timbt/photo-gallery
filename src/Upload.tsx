import React, { useState } from 'react';
import axios from 'axios';

// Stores an uploaded image and its data URL preview
interface UserImage {
    file?: File,
    previewSrc?: string
}

function Upload(props: { api : string }) {

    const [image, setImage] = useState<UserImage>({});
    const [title, setTitle] = useState("");

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
    const submitImage = async (e : React.FormEvent<HTMLFormElement>) => {

        // Prevent page reload on submission
        e.preventDefault();
    
        try {
            // Get the filetype (needed for signed URL creation)
            const filetype = image.file!.type;

            // Create image record in application database, and get a signed
            // URL for file upload
            const response = await axios.post(`${props.api}/upload`, {
                filetype, title
            });
            const { id, signedURL } = response.data;

            // Upload the image to S3
            await axios.put(signedURL, image.file);

            // Redirect to uploaded image
            console.log(`TODO: Redirect to ID ${id}`);

        } catch (e) {

            alert("Could not upload image")
        }
        
    };

    // Submission form will be rendered only if an image has been provided
    const submissionForm = image.file ? 
        (
            <form onSubmit={e => submitImage(e)}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title your image" />
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
