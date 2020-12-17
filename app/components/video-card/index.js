import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../utils/dimensions';

export const VideoCard = ({item, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.btn}>
      <Card containerStyle={styles.card}>
        <Card.Image
          containerStyle={styles.image}
          source={{
            uri: item.image,
          }}
        />

        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.bottomBackdrop} />
      </Card>
    </TouchableOpacity>
  );
};

export const RoundVideoCard = ({item, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.btn}>
      <Card containerStyle={styles.roundCard}>
        <Avatar
          rounded
          containerStyle={styles.roundImage}
          avatarStyle={{borderRadius: 150}}
          source={{
            uri: item.image || item,
          }}
        />

        <View style={styles.frontdrop} />

        <Icon
          name="video"
          size={32}
          color="white"
          style={{
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 12,
            top: '35%',
          }}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: moderateScale(5),
  },
  card: {
    width: moderateScale(120),
    padding: 0,
    borderRadius: 8,
    margin: 0,
  },
  image: {
    height: moderateScale(120),
    borderRadius: 8,
  },
  name: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    bottom: moderateScale(20),
    paddingHorizontal: moderateScale(5),
    zIndex: 11,
  },
  bottomBackdrop: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'black',
    opacity: 0.15,
    zIndex: 10,
    borderRadius: 8,
  },
  frontdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    backgroundColor: 'black',
    opacity: 0.25,
    zIndex: 10,
  },
  roundCard: {
    width: moderateScale(100),
    height: moderateScale(100),
    padding: 0,
    borderRadius: 150,

    margin: 0,
  },
  roundImage: {
    height: '100%',
    width: '100%',
  },
});
