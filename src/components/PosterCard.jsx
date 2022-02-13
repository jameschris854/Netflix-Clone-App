import { View } from 'native-base'
import React from 'react'
import {LinearGradient, Rect, Defs, Svg, Stop} from 'react-native-svg';
import PosterOptions from '../components/PosterOptions';
import {Image} from 'native-base';
import { Dimensions } from 'react-native';

const PosterCard = ({poster}) => {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <View>
            <View style={{width: '100%', height: screenHeight - 300}}>
              <Image
                key={poster.id}
                // source={{uri: `https://image.tmdb.org/t/p/w500/9xaAT3V3I9xxqnNiEjCivNFfdlh.jpg`}}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${poster.poster_path}`,
                }}
                backgroundColor={'red'}
                height={'100%'}
                width={'100%'}
                resizeMode="stretch"
                alt="cover pic"
              />
              <View
                style={{
                  position: 'absolute',
                  height: 180,
                  width: screenWidth + 10,
                  bottom: -1,
                  left: 0,
                }}>
                <Svg height="180" width={screenWidth + 10}>
                  <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <Stop
                        offset="0"
                        stopColor="rgb(0,0,0,0.9)"
                        stopOpacity="0"
                      />
                      <Stop
                        offset="0.99"
                        stopColor="rgb(0,0,0,0.9)"
                        stopOpacity="0.9"
                      />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    width={screenWidth + 5}
                    height={180}
                    fill="url(#grad)"
                  />
                </Svg>
              </View>
            </View>
            <PosterOptions details={poster} />
        </View>
    )
}



export default PosterCard