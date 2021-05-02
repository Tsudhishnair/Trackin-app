import React from 'react';
import { StyleSheet, Text, Image, Button, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import colors from '../../config/colors';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3d3d4e',
  },
  subTitle: {
    color: colors.textColor,
  },
  text: {
    color: colors.textColor,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 180,
    height: 180,
  },
  doneButton: {
    marginHorizontal: 20,
    fontSize: 16,
  },
});

const slides = [
  {
    title: 'Track your expense everywhere',
    subtitle: 'You can easily track your expense from literally everywhere',
    image: <Image source={require('../../assets/onBoardingIcon1.png')} style={styles.iconStyle} />,
    backgroundColor: '#FFEFB5',
  },
  {
    title: 'Get your money under control',
    subtitle: 'Track where you are spending the most.',
    image: <Image source={require('../../assets/onBoardingIcon2.png')} style={styles.iconStyle} />,
    backgroundColor: '#c7e1ff',
  },
  {
    title: 'Get detailed reports',
    subtitle: 'Keep up to date by viewing detailed reports.',
    image: <Image source={require('../../assets/onBoardingIcon3.png')} style={styles.iconStyle} />,
    backgroundColor: '#fffbf2',
  },
];

export default function OnboardingScreen({ setIsFirstTimeUserValue }) {
  const completeOnboarding = () => {
    setIsFirstTimeUserValue(true);
  };

  const bottomBarText = text => {
    return <Text style={styles.text}>{text}</Text>;
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity {...props}>
        <Text style={[styles.text, styles.doneButton]}>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Onboarding
      pages={slides}
      titleStyles={styles.title}
      subTitleStyles={styles.subTitle}
      transitionAnimationDuration={200}
      onDone={completeOnboarding}
      onSkip={completeOnboarding}
      nextLabel={bottomBarText('Next')}
      skipLabel={bottomBarText('Skip')}
      DoneButtonComponent={doneButton}
    />
  );
}
