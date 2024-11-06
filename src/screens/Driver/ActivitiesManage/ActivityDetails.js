import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { primaryColor } from "../../../../assets/styles/GlobalStyles"; 

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); 

  const handlePost = () => {
    if (title && content) {
      console.log('Post:', { title, content, image });
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Enter Title and Content, Please!');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Error', 'Need to allow access image library!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();   

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.titleInput, { backgroundColor: '#F2F2F2' }]}
          placeholder="Post Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.contentInput, { backgroundColor: '#F2F2F2' }]}
          placeholder="Post Content"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="camera-outline" size={46} color='#CCC' />
          <Text style={styles.imageButtonText}>Choose Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: primaryColor.darkPrimary, // Sử dụng màu từ bảng màu của bạn
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  titleInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  contentInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    height: 100,
  },
  imageButton: {
    backgroundColor: '#F1F1F1', 
    height: 200,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCCCCCCC', 
    flexDirection: 'column', 
  },
  imageButtonText: {
    color: '#CCCCCCCC',
    fontWeight: 'bold',
    marginLeft: 8, 
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: primaryColor.darkPrimary, 
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;
