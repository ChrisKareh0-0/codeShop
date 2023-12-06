import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../Library/colors';
export const Loading = ({
  title,
  Swidth,
  Sheight,
  bgColor,
  size,
  activityColor,
}) => {
  return (
    <View
      style={[
        laodingStyles.loading,
        {
          width: Swidth,
          height: Sheight,
          backgroundColor: bgColor ? bgColor : '',
        },
      ]}>
      <ActivityIndicator
        size={size ? size : 'large'}
        color={activityColor ? activityColor : colors.primary_color}
      />
      {title ? (
        <Text
          style={[
            {color: activityColor ? activityColor : colors.primary_color},
          ]}>
          {title}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};
const laodingStyles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
