import {Avatar, View, Image} from 'native-base';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../Assets/svg/Logo';

const HeaderStrip = ({style = {}, type, navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      onPress={() => init()}>
      {type === 'home' ? (
        <>
          <Image
            size={60}
            style={{left: 0}}
            source={{
              uri: 'https://pngimg.com/uploads/netflix/netflix_PNG10.png',
            }}
            alt={'netflix'}
          />
          <Feather
            name="search"
            size={25}
            color={'#FFFF'}
            style={{marginLeft: 'auto', marginRight: 12}}
          />
          <Avatar
            style={[styles.avatar]}
            bg="lightBlue"
            size={7}
            // size={styles.avatar.size}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
            }}>
            AK
          </Avatar>
        </>
      ) : type === 'categories' ? (
        <>
          <Ionicons
            name="ios-arrow-back"
            size={25}
            color={'#FFFF'}
            style={{marginLeft: 20}}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#ffffff',
              marginLeft: 20,
            }}>
            Categories
          </Text>
          <Feather
            name="search"
            size={25}
            color={'#FFFF'}
            style={{marginLeft: 'auto', marginRight: 15}}
          />
          <Avatar
            style={[styles.avatar]}
            bg="lightBlue"
            size={7}
            // size={styles.avatar.size}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
            }}>
            AK
          </Avatar>
        </>
      ) : type === 'AppIntro' ? (
        <>
          <Image
            size={60}
            style={{left: 0}}
            source={{
              uri: 'https://pngimg.com/uploads/netflix/netflix_PNG10.png',
            }}
            alt={'netflix'}
          />
          <Text  style={{marginLeft: 'auto', marginRight: 12,color:'#ffffff'}}>PRIVACY</Text>
          <Text style={{color:'#ffffff', marginRight: 12}}>SIGN IN</Text>
          <Feather
            name="more-vertical"
            size={18}
            color={"grey"}
            style={{marginRight:12}}
          />
        </>
      ) : type === 'SignIn' ? (
          <>
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color={'#FFFF'}
              onPress={() => navigation.goBack()}
              style={{marginLeft:15}}
            />
            <Logo style={{width:100,height:100,marginLeft:15,marginRight:"auto"}}/>
          </>
      ) : (
        <>
          <Ionicons
            name="ios-arrow-back"
            size={25}
            color={'#FFFF'}
            onPress={() => navigation.goBack()}
          />
          <Feather
            name="search"
            size={25}
            color={'#FFFF'}
            style={{marginLeft: 'auto', marginRight: 12}}
          />
          <Avatar
            style={[styles.avatar]}
            bg="lightBlue"
            size={7}
            // size={styles.avatar.size}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
            }}>
            AK
          </Avatar>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
  },
});

export default HeaderStrip;
