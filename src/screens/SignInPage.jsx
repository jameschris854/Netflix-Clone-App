import React, { useState } from 'react';
import {StatusBar, Text, View , TouchableHighlight} from 'react-native';
import HeaderStrip from '../components/HeaderStrip';
import InputPrimary from '../components/InputPrimary';
import {inject, observer} from 'mobx-react';

const SignInPage = ({navigation,authStore}) => {
  const [email,setEmail] = useState(false)
  const [password,setPassword] = useState(false)

  const handleLogin = () => {
    return authStore.setUserVerification(true)
  } 

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
          <TouchableHighlight
          onPress={handleLogin}
          underlayColor={"rgba(255,255,255,0.2)"}
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
          </TouchableHighlight>
        </View>
        <Text style={{color:'lightgrey',marginTop:30,fontSize:16}}>Need help?</Text>
        <Text style={{color:'lightgrey',marginTop:40,fontSize:16}}>New to Netflix? Sign up now.</Text>
        <Text style={{marginTop:40,textAlign:'center',width:'90%',fontSize:12}}>Sign in is protected by google reCAPTCHA to ensure you're not a bot.<Text style={{fontWeight:'900'}}>Learn more.</Text></Text>
      </View>
    </View>
  );
};

export default inject('authStore')(observer(SignInPage));
