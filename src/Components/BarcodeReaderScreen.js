import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ReadMore from 'react-native-read-more-text';

const BarcodeReaderScreen = () => {
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    decodeBarcode();
  }, []);

  const decodeBarcode = async () => {
    try {
      const barcodeUri = 'https://www.vecteezy.com/free-vector/barcode';
      const response = await fetch(barcodeUri);
      const barcodeBlob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const barcodeText = reader.result;
        setBarcodeData(barcodeText);
      };
      reader.readAsText(barcodeBlob);
      response;
    } catch (error) {
      console.error('Error decoding barcode:', error);
    }
  };

  const renderTruncatedFooter = handlePress => (
    <Text style={styles.readMore} onPress={handlePress}>
      Read more
    </Text>
  );

  const renderRevealedFooter = handlePress => (
    <Text style={styles.readMore} onPress={handlePress}>
      Show less
    </Text>
  );

  return (
    <View style={styles.container}>
      <Image
        // source={require('')}
        style={styles.barcodeImage}
      />
      {barcodeData && (
        <View style={styles.barcodeDataContainer}>
          <Text style={styles.barcodeDataText}>Barcode Data:</Text>
          <ReadMore
            numberOfLines={3}
            renderTruncatedFooter={renderTruncatedFooter}
            renderRevealedFooter={renderRevealedFooter}>
            <Text>{barcodeData}</Text>
          </ReadMore>
        </View>
      )}
      <View style={styles.qrCodeContainer}>
        {barcodeData && (
          <QRCode
            value={barcodeData}
            size={200}
            color="black"
            backgroundColor="white"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  barcodeDataContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  barcodeDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  readMore: {
    color: 'blue',
    marginTop: 5,
  },
  qrCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarcodeReaderScreen;
