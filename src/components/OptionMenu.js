import React from 'react';
import {StyleSheet, Text, FlatList, View, Dimensions} from 'react-native';
import {AddIcon, Center, Fab} from 'native-base';
import {inject, observer} from 'mobx-react';

const OptionMenu = ({commonStore}) => {
  const menu = commonStore.optionList;
  console.log(menu);
  return (
    <View
      style={{
        position: 'absolute',
        display: `${commonStore.optionState ? 'flex' : 'none'}`,
        top: 0,
        width: '105%',
        height: Dimensions.get('window').height,
        zIndex: 100000,
        backgroundColor: 'rgba(14 ,14 ,14 ,0.95)',
      }}>
      {/* <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
          top:'50%',
          backgroundColor:'pink'
        }}> */}
      <FlatList
        data={menu}
        renderItem={(e, i) => (
          <Text
            onPress={() => {commonStore.setHomeMode(e.item.click)
            commonStore.hideOption()}}
            style={[
              {color: '#ffff', marginVertical: 10},
              e.item.isActive
                ? {fontSize: 25, fontWeight: 'bold'}
                : {fontSize: 20, fontWeight: 'normal'},
            ]}
            key={i}>
            {e.item.name}
          </Text>
        )}
        centerContent={true}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          left: Dimensions.get('window').width / 2 - 25,
          backgroundColor: '#ffff',
          padding: 20,
          borderRadius: 50,
        }}>
        <Text onPress={() => commonStore.hideOption()}>
          <Center>
            <AddIcon
              style={{
                transform: [
                  {
                    rotateZ: '45deg',
                  },
                ],
              }}
              centerContent={true}
              size="6"
              color="#000"
            />
          </Center>
        </Text>
      </View>
      {/* </View> */}
    </View>
  );
};

export default inject('commonStore')(observer(OptionMenu));

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: '#0000003b',
    paddingRight: 10,
    paddingVertical: 3,
    zIndex: 100,
  },
  avatar: {
    borderRadius: 5,
  },
  subHeaderStyle: {
    color: '#ffff',
    marginHorizontal: 10,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
});
