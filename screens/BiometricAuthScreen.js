import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TextInput, Alert, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricAuthScreen = ({ navigation }) => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [password, setPassword] = useState('');
  const defaultPassword = 'defaultPassword';

  useEffect(() => {
    handleBiometricAuth();
  }, []);

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Enter your screen lock to access "ARCON Authenticator"',
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
      Alert.alert('Invalid password', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
            <Image
        source={{ uri: 'https://arconnet.com/wp-content/uploads/2022/03/Arcon-Logo.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      {failedAttempts < 5 ? (
        <Text style={styles.lockedText}>Authenticator locked</Text>
      ) : (
        <View>
          <Text>Enter your password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
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
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 16, paddingTop: 250 },
  logo: { width: 200, height: 100, marginBottom: 0 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, width: '80%' },
  lockedText: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});

export default BiometricAuthScreen;