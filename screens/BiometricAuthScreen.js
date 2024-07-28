import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricAuthScreen = ({ navigation }) => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [password, setPassword] = useState('');
  const defaultPassword = 'defaultPassword';

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Enter your screen lock to access "Acron Authentication App"',
    });

    if (result.success) {
      navigation.navigate('Home');
    } else {
      setFailedAttempts(failedAttempts + 1);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === defaultPassword) {
      navigation.navigate('Home');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <View style={styles.container}>
      {failedAttempts < 5 ? (
        <Button title="Authenticate with Biometrics" onPress={handleBiometricAuth} />
      ) : (
        <View>
          <Text>Enter your password:</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
          <Button title="Submit" onPress={handlePasswordSubmit} />
        </View>
      )}
    </View>
  );
};

BiometricAuthScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
});

export default BiometricAuthScreen;