import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [ciamUrl, setCiamUrl] = useState('');
  const [email, setEmail] = useState('');

  const validateUrl = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!urlPattern.test(url);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleNext = async () => {
    if (!ciamUrl || !validateUrl(ciamUrl)) {
      Alert.alert('Invalid URL', 'Please enter a valid CIAM URL.');
      return;
    }

    if (!email || !validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid Email ID.');
      return;
    }

    await AsyncStorage.setItem('ciamUrl', ciamUrl);
    await AsyncStorage.setItem('email', email);
    navigation.navigate('EmailValidation');
  };

  return (
    <View style={styles.container}>
      <Text>Enter your CIAM URL:</Text>
      <TextInput
        style={styles.input}
        value={ciamUrl}
        onChangeText={setCiamUrl}
        placeholder="https://example.com"
      />
      <Text>Enter your Email ID:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="example@example.com"
        keyboardType="email-address"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
});

export default LoginScreen;