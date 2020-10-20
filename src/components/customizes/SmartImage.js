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
      
        this.props.onProgress && this.props.onProgress(e)
    }
    imageLoadError = () => {
    
        this.props.onError && this.props.onError()
    }

    imageLoad = (e) => {
      
        this.props.onLoad && this.props.onLoad(e)
    }

    render() {
     
        let { style, source } = this.props
        source =  source? source:  ImageAsset.PlaceHolderImage;

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