import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [ciamUrl, setCiamUrl] = useState('');
  const [newCiamUrl, setNewCiamUrl] = useState('');

  useEffect(() => {
    const fetchCiamUrl = async () => {
      const storedCiamUrl = await AsyncStorage.getItem('ciamUrl');
      if (storedCiamUrl) {
        setCiamUrl(storedCiamUrl);
      }
    };

    fetchCiamUrl();
  }, []);

  const validateUrl = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!urlPattern.test(url);
  };

  const handleSave = async () => {
    if (!newCiamUrl || !validateUrl(newCiamUrl)) {
      Alert.alert('Invalid URL', 'Please enter a valid CIAM URL.');
      return;
    }

    await AsyncStorage.setItem('ciamUrl', newCiamUrl);
    setCiamUrl(newCiamUrl);
    Alert.alert('Success', 'CIAM URL has been updated.');
  };

  return (
    <View style={styles.container}>
      <Text>Current CIAM URL:</Text>
      <Text>{ciamUrl || 'No CIAM URL set'}</Text>
      <TextInput
        style={styles.input}
        value={newCiamUrl}
        onChangeText={setNewCiamUrl}
        placeholder="Enter new CIAM URL"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 16, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, width: '100%' },
});

export default SettingsScreen;