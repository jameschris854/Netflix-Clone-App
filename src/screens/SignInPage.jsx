import {Button} from 'native-base';
import React, { useState } from 'react';
import {StatusBar, Text, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HeaderStrip from '../components/HeaderStrip';
import InputPrimary from '../components/InputPrimary';

const SignInPage = ({navigation}) => {
  const [email,setEmail] = useState(false)
  const [password,setPassword] = useState(false)

  return (
    <View style={{backgroundColor: '#000000', height: '100%', width: '100%'}}>
      <HeaderStrip
        type={'SignIn'}
        style={{marginTop: StatusBar.currentHeight}}
        navigation={navigation}
      />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <InputPrimary
          containerStyle={{marginTop: 20}}
          width={'90%'}
          labelText={'Email or phone number'}
          value={email}
          onTextChange={(e) => setEmail(e)}
          autoFocus={true}
        />
        <InputPrimary
          containerStyle={{marginTop: 15}}
          width={'90%'}
          labelText={'Password'}
          value={password}
          onTextChange={(e) => setPassword(e)}
          type='password'
        />
        <View style={{ width: '89%'}}>
          <TouchableOpacity
          activeOpacity={0.5}
            style={{
              borderColor: '#ffffff',
              borderWidth: 1,
              paddingVertical: 15,
              marginTop: 40,
              width:'100%',
              justifyContent:'center',
              alignItems:'center',
              borderRadius:10
            }}>
            <Text style={{color: '#ffffff',fontSize:20}}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color:'lightgrey',marginTop:30,fontSize:16}}>Need help?</Text>
        <Text style={{color:'lightgrey',marginTop:40,fontSize:16}}>New to Netflix? Sign up now.</Text>
        <Text style={{marginTop:40,textAlign:'center',width:'90%',fontSize:12}}>Sign in is protected by google reCAPTCHA to ensure you're not a bot.<Text style={{fontWeight:'900'}}>Learn more.</Text></Text>
      </View>
    </View>
  );
};

export default SignInPage;
