import {Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {gallery} from '../Library/icons';
import {TouchableOpacity} from 'react-native';

function chooseImage() {
  launchImageLibrary(
    {
      mediaType: 'mixed',
      includeBase64: false,
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.5,
    },
    resp => {
      if (resp.didCancel) {
        showMessage({
          message: 'Cancelled Image Selection',
          backgroundColor: '#008dfe',
          type: 'info',
          duration: 2000,
          hideOnPress: true,
        });
      } else {
        showMessage({
          message: 'Image Selected',
          backgroundColor: '#32a852',
          type: 'info',
          duration: 2000,
          hideOnPress: true,
        });
      }
    },
  );
}

const UploadImageModal = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        chooseImage();
      }}>
      <Image source={gallery}></Image>
    </TouchableOpacity>
  );
};

export default UploadImageModal;
