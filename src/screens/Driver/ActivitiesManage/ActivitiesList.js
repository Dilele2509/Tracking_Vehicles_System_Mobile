import React, { useState, useCallback, useRef, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from '../../../API/axios';
import { BASEURL } from '@env';

const PostManageScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState('');

  const fetchData = useCallback(() => {
    axios.get(`/user/get-info`)
      .then((response) => {
        console.log('user data: ', response.data);
        const userData = response.data;
        setUserInfo(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  /* const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'Cho thuê BWM Z4 odon 14k km giá 4tr5/ngày. Chính chủ cho thuê, làm việc trực tiếp trên hợp đồng với chủ...',
      image: require('../../../../assets/Images/bmw_z4.png'),
    },
    {
      id: 2,
      content: 'Cho thuê Porsche 911 mới, giá 6tr/ngày. Chính chủ cho thuê, làm việc trực tiếp trên hợp đồng với chủ...',
      image: require('../../../../assets/Images/porsche.jpg'),
    },
    {
      id: 3,
      content: 'Cần cho thuê xe Peugeot 408 mới, giá 2tr6/ngày. Chính chủ cho thuê, làm việc trực tiếp trên hợp đồng với chủ...',
      image: require('../../../../assets/Images/peugeot_408.png'),
    },
  ]); */

  const [posts, setPosts] = useState([])
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '50%'], []);
  const [isEditing, setIsEditing] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [expandedPosts, setExpandedPosts] = useState({});

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSave = () => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === isEditing ? { ...post, content: editingContent } : post
      )
    );
    setIsEditing(null);
    setEditingContent('');
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditingContent('');
  };

  const toggleExpandPost = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const renderPostItem = ({ item: post }) => (
    <View style={styles.postContainer}>
      <View style={styles.postUserInfo}>
        <View style={styles.postUser}>
          <Image
            source={{ uri: `${BASEURL}${userInfo.avatar}` }}
            style={styles.userAvatar}
          />
          <Text style={styles.postUserName}>{userInfo.fullname}</Text>
        </View>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Ionicons name="ellipsis-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.postImageContainer}>
        <Image source={post.image} style={styles.postImage} />
      </View>

      <View style={styles.postDetails}>
        {isEditing === post.id ? (
          <TextInput
            style={styles.textInput}
            value={editingContent}
            onChangeText={setEditingContent}
            multiline
          />
        ) : (
          <View>
            <Text style={styles.postText}>
              {expandedPosts[post.id] ? post.content : `${post.content.substring(0, 80)}...`}
            </Text>
            <TouchableOpacity onPress={() => toggleExpandPost(post.id)}>
              <Text style={styles.readMore}>
                {expandedPosts[post.id] ? 'Show Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isEditing === post.id && (
        <View style={styles.editButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.saveText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <>
      <BottomSheetModalProvider>
        <GestureHandlerRootView style={stylesModal.container}>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.createPostContainer}>
                <Image
                  source={{ uri: `${BASEURL}${userInfo.avatar}` }}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.createPostButton} onPress={() => navigation.navigate('Create Post')}>
                  <Ionicons name="add-outline" size={24} color="black" />
                  <Text style={styles.createPostText}>Create New Post</Text>
                </TouchableOpacity>
              </View>

              {posts.length === 0 ? (
                <View style={[GlobalStyles.padScreen20, GlobalStyles.centerScreen]}>
                  <MaterialIcons name='post-add' size={68} color={"#F1F1F1"}/>
                  <Text style={styles.noPostText}>No posts yet. Be the first to create one.</Text>
                </View>
              ) : (
                posts.map((post) => (
                  <View key={post.id} style={styles.postContainer}>
                    <View style={styles.postUserInfo}>
                      <View style={styles.postUser}>
                        <Image
                          source={{ uri: `${BASEURL}${userInfo.avatar}` }}
                          style={styles.userAvatar}
                        />
                        <Text style={styles.postUserName}>{userInfo.fullname}</Text>
                      </View>
                      <TouchableOpacity onPress={handlePresentModalPress}>
                        <Ionicons name="ellipsis-horizontal" size={20} color="black" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.postImageContainer}>
                      <Image source={{ uri: post.image }} style={styles.postImage} />
                    </View>

                    <View style={styles.postDetails}>
                      {isEditing === post.id ? (
                        <TextInput
                          style={styles.textInput}
                          value={editingContent}
                          onChangeText={setEditingContent}
                          multiline
                        />
                      ) : (
                        <View>
                          <Text style={styles.postText}>
                            {expandedPosts[post.id] ? post.content : `${post.content.substring(0, 80)}...`}
                          </Text>
                          <TouchableOpacity onPress={() => toggleExpandPost(post.id)}>
                            <Text style={styles.readMore}>
                              {expandedPosts[post.id] ? 'Show Less' : 'Read More'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>

                    {isEditing === post.id && (
                      <View style={styles.editButtons}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                          <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.saveButton, styles.cancelButton]}
                          onPress={handleCancel}
                        >
                          <Text style={styles.saveText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))
              )}
            </ScrollView>
          </View>
          <BottomSheetModal
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
          >
            <BottomSheetView>
              <View style={stylesOptions.inputContainer}>
                <TouchableOpacity style={stylesOptions.optionsBtn}>
                  <Ionicons name="create-outline" size={24} color={primaryColor.darkPrimary} />
                  <Text style={stylesOptions.optionsBtnText}>Edit Post Content</Text>
                </TouchableOpacity>

                <TouchableOpacity style={stylesOptions.optionsBtn}>
                  <Ionicons name="eye-off-outline" size={24} color={primaryColor.darkPrimary} />
                  <Text style={stylesOptions.optionsBtnText}>Hide Post</Text>
                </TouchableOpacity>

                <TouchableOpacity style={stylesOptions.optionsBtn}>
                  <Ionicons name="trash-outline" size={24} color={primaryColor.darkPrimary} />
                  <Text style={stylesOptions.optionsBtnText}>Delete Post</Text>
                </TouchableOpacity>

                <TouchableOpacity style={stylesOptions.cancelBtn} onPress={handleCloseModal}>
                  <Text style={stylesOptions.postButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </GestureHandlerRootView>
      </BottomSheetModalProvider >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    padding: 16,
  },
  createPostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: primaryColor.yellowPrimary,
    padding: 10,
    borderRadius: 8,
    width: '85%',
  },
  createPostText: {
    marginLeft: 8,
    fontSize: 16,
  },
  postContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  postUserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImageContainer: {
    marginTop: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  postDetails: {
    marginTop: 12,
  },
  postText: {
    fontSize: 14,
    lineHeight: 20,
  },
  readMore: {
    textAlign: 'right',
    color: primaryColor.yellowPrimary,
    marginTop: 4,
    fontWeight: '600',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: primaryColor.yellowPrimary,
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: primaryColor.darkPrimary,
  },
  saveText: {
    color: '#FFF',
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: primaryColor.darkPrimary,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    minHeight: 40,
  },
  noPostText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 16,
    color: primaryColor.darkPrimary,
  }
});

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});

const stylesOptions = StyleSheet.create({
  container: {
    /* 
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',*/ // Make background partially transparent
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    // alignSelf: 'stretch', // Adjust to fit content width
  },
  optionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionsBtnText: {
    marginLeft: 12,
    fontSize: 16,
    color: primaryColor.darkPrimary,
  },
  cancelBtn: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: primaryColor.redPrimary,
    borderRadius: 10,
  },
  postButtonText: {
    fontSize: 16,
    color: primaryColor.whitePrimary,
  },
});

export default PostManageScreen;
