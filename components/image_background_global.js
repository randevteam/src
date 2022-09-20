import React from 'react';

import { ImageBackground, View } from 'react-native';

import { background } from '../helper/image';

class ImageBackgroundGlobal extends React.Component{
    render(){
        return(
            <ImageBackground
                style={{ flex: 1,  }}
                source={background}
            >
                <View style={{ flex: 1, backgroundColor: '#161616D7' }}>
                    { this.props.children }
                </View>
            </ImageBackground>
        );
    }
}

export default ImageBackgroundGlobal;