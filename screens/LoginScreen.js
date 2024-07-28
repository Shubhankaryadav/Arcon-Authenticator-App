import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [ciamUrl, setCiamUrl] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = async () => {
    await AsyncStorage.setItem('ciamUrl', ciamUrl);
    await AsyncStorage.setItem('email', email);
    navigation.navigate('EmailValidation');
  };

  return (
    <View style={styles.container}>
      <Text>Enter your CIAM URL:</Text>
      <TextInput style={styles.input} value={ciamUrl} onChangeText={setCiamUrl} />
      <Text>Enter your Email ID:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
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