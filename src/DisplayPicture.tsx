import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './config';

interface Picture {
    title: string,
    description: string,
    url: string,
    uploaded: Date
}

function DisplayPicture() {

    const { pictureID } = useParams<{pictureID : string}>();
    const [ loadFailed, setLoadFailed ] = useState(false);
    const [ picture, setPicture ] = useState<Picture|null>(null); 
    

    const loadPicture = async () => {

        try {

            const response = await axios.get(`${API_URL}/${pictureID}`);
            setPicture(response.data);

        } catch (e) {

            setLoadFailed(true);

        }
    
    };

    if (picture === null && loadFailed === false) loadPicture();

    if (loadFailed) {

        return <p>Could not find picture with ID ${pictureID}</p>;

    } else if (picture) {

        return (
            <div>
                <h1>{picture.title}</h1>
                <img src={picture.url} alt={picture.title} />
            </div>
        );

    } else {

        return <p>Loading picture...</p>;

    }

}

export default DisplayPicture;
