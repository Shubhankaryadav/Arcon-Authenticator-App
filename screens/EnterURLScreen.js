import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

const EnterURLScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState('');

  const handleGo = () => {
    navigation.navigate('WebView', { url });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Enter URL" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text>Enter URL:</Text>
            <TextInput style={styles.input} value={url} onChangeText={setUrl} />
            <Button title="Go" onPress={handleGo} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

EnterURLScreen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: { borderWidth: 1, padding: 8, width: '100%', marginVertical: 8 },
});

export default EnterURLScreen;
