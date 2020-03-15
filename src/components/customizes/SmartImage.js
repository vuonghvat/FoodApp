import React from 'react'

import FastImage from 'react-native-fast-image'
import ImageAsset from "../../assets/images/ImageAsset"

class SmartImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLoading: true
        }
    }

    imageLoadProgress = (e) => {
       // this.setState({ imageLoading: false })
        this.props.onProgress && this.props.onProgress(e)
    }
    imageLoadError = () => {
       // this.setState({ imageLoading: false })
        this.props.onError && this.props.onError()
    }

    imageLoad = (e) => {
       // this.setState({ imageLoading: true })
        this.props.onLoad && this.props.onLoad(e)
    }

    render() {
     
        let { style, source } = this.props
       // console.log("source", source);
        
        const { imageLoading } = this.state;


        source = imageLoading? source.uri? source: this.props.placeholder || ImageAsset.PlaceHolderImage: this.props.placeholder ||  ImageAsset.PlaceHolderImage;
     
        

        return (
            <FastImage
                resizeMode="cover"
                {...this.props}
                style={style}
                source={source}
                //  fallback={!this.state.imageLoading}
                onError={this.imageLoadError}
                onProgress={this.imageLoadProgress}
                 onLoad={this.imageLoad}
            />
        )
    }
}


export default SmartImage