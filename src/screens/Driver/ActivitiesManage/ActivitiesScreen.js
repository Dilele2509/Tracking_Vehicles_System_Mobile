import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderTab } from '../../../components'; // Assuming HeaderTab is properly implemented
import OnGoingAct from './OnGoingAct';
import HistoryAct from './HistoryAct';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { TouchableOpacity } from 'react-native';

const ActivitiesScreen = ({navigation}) => {
  const tab1 = 'OnGoing';
  const tab2 = 'History';

  const [currentTab, setCurrentTab] = useState(tab1);

  // Memoizing tab content for performance optimization
  const renderContent = useMemo(() => {
    switch (currentTab) {
      case tab1:
        return <OnGoingAct navigation={navigation} />;
      case tab2:
        return <HistoryAct navigation={navigation}/>;
      default:
        return null;
    }
  }, [currentTab]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activities</Text>
        <HeaderTab tab1={tab1} tab2={tab2} setCurrentTab={setCurrentTab} />
      </View>

      {renderContent}
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
