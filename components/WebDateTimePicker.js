import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// This component serves as a web-compatible alternative to @react-native-community/datetimepicker
const WebDateTimePicker = ({ value, onChange, mode = 'date', maximumDate, minimumDate }) => {
  // Format date to YYYY-MM-DD for the input value
  const formatDateForInput = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Handle date change from the input
  const handleChange = (e) => {
    // Make sure we have a valid date string
    if (!e.target.value) return;
    
    const newDate = new Date(e.target.value);
    
    // Check if the date is valid
    if (isNaN(newDate.getTime())) return;
    
    // Check if the date is within the allowed range
    if (maximumDate && newDate > maximumDate) return;
    if (minimumDate && newDate < minimumDate) return;
    
    // Call the onChange handler with an event-like object and the new date
    if (onChange) {
      onChange({ type: 'set', nativeEvent: { timestamp: newDate.getTime() } }, newDate);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <input
          style={{
            height: 40,
            backgroundColor: '#FFFFFF',
            width: '100%',
            padding: '0 10px',
            boxSizing: 'border-box',
            border: '1px solid #E0E0E0',
            borderRadius: '10px'
          }}
          type="date"
          value={formatDateForInput(value)}
          onChange={handleChange}
          min={minimumDate ? formatDateForInput(minimumDate) : undefined}
          max={maximumDate ? formatDateForInput(maximumDate) : undefined}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
});

export default WebDateTimePicker;