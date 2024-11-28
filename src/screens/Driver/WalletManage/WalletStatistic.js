import { AntDesign } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../../API/axios';
import { MoneyFormat } from '../../../components';

export default function WalletStatistic() {
    const [chosen, setChosen] = useState('date');
    const [pickerValue, setPickerValue] = useState(new Date()); // Initialize with the current date
    const [statisticData, setStatisticData] = useState({});

    useEffect(() => {
        setPickerValue(new Date()); // Ensure it's a valid Date object on component mount
    }, []);

    const fetchData = useCallback(() => {
        if (!pickerValue || !(pickerValue instanceof Date)) {
            console.error("Invalid picker value.");
            return;
        }
        const month = new Date(pickerValue).toLocaleString('default', { month: 'numeric' });
        const year = new Date(pickerValue).toLocaleString('default', { year: 'numeric' });
        const dateValue = pickerValue.toISOString().split('T')[0]; 

        switch (chosen) {
            case 'date':
                axios.post('/income/date-driver', { date: dateValue })
                    .then((response) => {
                        setStatisticData(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching balance data:', error);
                    });
                break;
            case 'month':
                axios.post('/income/month-driver', { year: year, month: month })
                    .then((response) => {
                        setStatisticData(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching balance data:', error);
                    });
                break;
            case 'year':
                axios.post('/income/year-driver', { year: year })
                    .then((response) => {
                        setStatisticData(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching balance data:', error);
                    });
                break;
            default:
                break;
        }
    }, [pickerValue]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const isRightButtonDisabled = () => {
        const today = new Date();
        if (chosen === 'date') {
            const selectedDate = new Date(pickerValue);
            return selectedDate.getDate() === today.getDate() &&
                selectedDate.getMonth() === today.getMonth() &&
                selectedDate.getFullYear() === today.getFullYear();
        } else if (chosen === 'month') {
            const selectedMonth = new Date(pickerValue);
            return selectedMonth.getMonth() >= today.getMonth() &&
                selectedMonth.getFullYear() >= today.getFullYear();
        } else if (chosen === 'year') {
            const selectedYear = new Date(pickerValue);
            return selectedYear.getFullYear() >= today.getFullYear();
        }
        return false;
    };

    const generateDate = (date) => {
        let newDate = new Date();
        if (!(date instanceof Date)) {
            date = new Date(date); // Ensure `date` is a valid Date object
        }

        switch (chosen) {
            case 'date':
                return newDate.getDate() === date.getDate() &&
                    newDate.getMonth() === date.getMonth() &&
                    newDate.getFullYear() === date.getFullYear()
                    ? 'Today'
                    : date.toDateString();
            case 'month':
                return newDate.getMonth() === date.getMonth() &&
                    newDate.getFullYear() === date.getFullYear()
                    ? 'This Month'
                    : date.toLocaleString('default', { month: 'long', year: 'numeric' });
            case 'year':
                return newDate.getFullYear() === date.getFullYear()
                    ? 'This Year'
                    : date.getFullYear().toString();
            default:
                return date.toDateString();
        }
    };

    const handleDateChange = (direction) => {
        let newValue = new Date(pickerValue);
        if (chosen === 'date') {
            newValue.setDate(newValue.getDate() + (direction === 'next' ? 1 : -1));
        } else if (chosen === 'month') {
            newValue.setMonth(newValue.getMonth() + (direction === 'next' ? 1 : -1));
        } else if (chosen === 'year') {
            newValue.setFullYear(newValue.getFullYear() + (direction === 'next' ? 1 : -1));
        }
        setPickerValue(newValue);
    };

    const handleChoice = (choice) => {
        setChosen(choice);

        let newDate;
        switch (choice) {
            case 'date':
                newDate = new Date();
                setPickerValue(newDate);
                break;
            case 'month':
                newDate = new Date();
                newDate.setMonth(newDate.getMonth());
                setPickerValue(newDate);
                break;
            case 'year':
                newDate = new Date();
                newDate.setFullYear(newDate.getFullYear());
                setPickerValue(newDate);
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.contentArea}>
            <View style={styles.sortOptions}>
                <Text style={styles.sortText}>Statistic by:</Text>
                {/* Các nút lựa chọn cho Date, Month, Year */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, chosen === 'date' && styles.selectedButton]}
                        onPress={() => handleChoice('date')}
                    >
                        <Text style={styles.buttonText}>Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, chosen === 'month' && styles.selectedButton]}
                        onPress={() => handleChoice('month')}
                    >
                        <Text style={styles.buttonText}>Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, chosen === 'year' && styles.selectedButton]}
                        onPress={() => handleChoice('year')}
                    >
                        <Text style={styles.buttonText}>Year</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.statisticArea}>
                <Text style={styles.statisticTitle}>Statistics by <Text style={{ textTransform: 'uppercase', color: primaryColor.darkRed }}>{chosen}</Text></Text>
                <View style={styles.dateTimePicker}>
                    <TouchableOpacity onPress={() => handleDateChange('previous')}>
                        <AntDesign name="left" size={24} color={primaryColor.darkPrimary} />
                    </TouchableOpacity>
                    <View style={styles.showingDateTime}>
                        <Text>{generateDate(pickerValue)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleDateChange('next')}
                        disabled={isRightButtonDisabled()}
                    >
                        <AntDesign
                            name="right"
                            size={24}
                            color={isRightButtonDisabled() ? '#ccc' : primaryColor.darkPrimary}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.statisticItems}>
                    <View style={styles.statisticItem}>
                        <Text style={styles.statisticLabel}>Trips:</Text>
                        <Text style={styles.statisticValue}>{statisticData.trips ?? 'No Data'}</Text>
                    </View>
                    <View style={styles.statisticItem}>
                        <Text style={styles.statisticLabel}>Income:</Text>
                        <Text style={styles.statisticValue}>
                            {statisticData.average_income ? <MoneyFormat value={statisticData.average_income} isShowing={true} /> : 'No Data'}
                        </Text>
                    </View>
                    <View style={styles.statisticItem}>
                        <Text style={styles.statisticLabel}>Violates:</Text>
                        <Text style={styles.statisticValue}>{statisticData.violates ?? 'No Data'}</Text>
                    </View>
                    <View style={styles.statisticItem}>
                        <Text style={styles.statisticLabel}>Rated:</Text>
                        <Text style={styles.statisticValue}>{statisticData.average_rate ? `${statisticData.average_rate}/5` : 'No Data'}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentArea: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    sortOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sortText: {
        fontSize: 16,
        fontWeight: '500',
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        margin: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: primaryColor.darkPrimary,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedValue: {
        marginTop: 20,
        fontSize: 16,
    },
    statisticArea: {
        padding: 15,
        backgroundColor: primaryColor.lightPrimary,
        borderRadius: 10,
    },
    statisticTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    dateTimePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    showingDateTime: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    statisticItems: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
    },
    statisticItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    statisticLabel: {
        fontSize: 16,
        color: '#333',
    },
    statisticValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: primaryColor.darkPrimary,
    },
});
