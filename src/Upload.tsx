import React, { useState, useEffect } from 'react';

function Upload() {

    const [image, setImage] = useState<File|null>(null);
    const [imagePreviewSrc, setImagePreviewSrc] = useState<string | undefined>(undefined);

    useEffect(() => {

        let reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewSrc(reader.result ? reader.result.toString() : undefined);
        };
        if (image) reader.readAsDataURL(image);

    });

    console.log(image);
    console.log(imagePreviewSrc);

    return (
        <div>
            <h1>Upload an image</h1>
            <input type="file" onChange={e => setImage(e.target.files ? e.target.files[0] : null)}/>
            <div>
                <img src={imagePreviewSrc} alt="preview" hidden={imagePreviewSrc ? false : true} />
            </div>
        </div>
    );

}

export default Upload;
