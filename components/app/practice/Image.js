import React from 'react';

const Image = React.memo((props) => {
    const handleImageClick = ()=>{
        props.onImageClicked && props.onImageClicked(props.imageEntity);
    }

    if(props.imageSource){
        return <img src={props.imageSource} 
                    className="img-thumbnail rounded mr-2 mb-2"
                    onClick={handleImageClick}/>
    }
    else{
        return <></>
    }
});

export default Image;