import React, { useState, useCallback, useRef, useMemo, Children } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import axios from '../../../API/axios';
import { BASEURL } from '@env';
import { HeaderTab } from '../../../components';
import OnGoingAct from './OnGoingAct';
import HistoryAct from './HistoryAct';

const ActivitiesScreen = () => {
  const tab1 = 'OnGoing';
  const tab2 = 'History';
  const [currentTab, setCurrentTab] = useState(tab1)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activities</Text>
        <HeaderTab tab1={tab1} tab2={tab2} setCurrentTab={setCurrentTab} />
      </View>
      
      {currentTab === tab1 ? (
        <OnGoingAct />
      ) : (
        <HistoryAct />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: primaryColor.darkPrimary,
  },
});

export default ActivitiesScreen;
