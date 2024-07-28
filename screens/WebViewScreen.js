import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <WebView source={{ uri: url }} style={styles.container} />
  );
};

WebViewScreen.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default WebViewScreen;
