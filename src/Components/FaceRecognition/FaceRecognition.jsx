import React from 'react';
import './FaceRecognition.css';

export default function FaceRecognition({ imageUrl, boxes }) {

    const faces = boxes.map((face, i) => {
        //console.log(face);
        return (<div key={i} className="bounding-box" style={{top: face.topRow, bottom: face.bottomRow, left: face.leftCol, right: face.rightCol}}></div>);
    })

    return (
        <div className="center ma pa2">
            <div className="absolute">
                <img id="inputimage" src={imageUrl} alt='' width='500px' height='auto'/>
                {faces}
                {/* <div className="bounding-box" style={{top: boxes[0].topRow, bottom: boxes[0].bottomRow, left: boxes[0].leftCol, right: boxes[0].rightCol}}></div> */}
            </div>          
        </div>
    )
}
