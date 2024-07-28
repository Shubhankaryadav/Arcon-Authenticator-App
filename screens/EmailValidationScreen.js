import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const EmailValidationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const correctCode = '1234';

  const handleValidate = async () => {
    if (code === correctCode) {
      const hasBiometric = await LocalAuthentication.hasHardwareAsync();
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasBiometric && isBiometricEnrolled) {
        navigation.navigate('BiometricAuth');
      } else {
        // Handle no biometric support case
        alert('Biometric authentication is not available');
      }
    } else {
      alert('You did not enter the expected verification code. Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter the validation code:</Text>
      <Text>(Enter the code sent to your Email)</Text>
      <TextInput style={styles.input} value={code} onChangeText={setCode} />
      <Button title="Verify" onPress={handleValidate} />
    </View>
  );
};

EmailValidationScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
});

export default EmailValidationScreen;