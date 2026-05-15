import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const INJECTED_JAVASCRIPT = `
  (function() {
    var style = document.createElement('style');
    style.innerHTML = '#warning, .warning-bar, .warning-banner-bar { display: none !important; }';
    document.head.appendChild(style);
    
    // Attempt to remove the parent table row to avoid empty spaces
    setInterval(function() {
      var warningElem = document.getElementById('warning');
      if (warningElem) {
        warningElem.style.display = 'none';
        var tr = warningElem.closest('tr');
        if (tr) {
          tr.style.display = 'none';
        }
      }
    }, 500);
  })();
  true; // note: this is required, or you'll sometimes get silent failures
`;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WebView 
        source={{ uri: 'https://script.google.com/macros/s/AKfycbyB2o0MiAchyqrrSF-xKi2HFMie--JIk-g3IGYgcZkMuTAaPDRoyaCGio5nKxKy5qX7/exec' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
  },
});
