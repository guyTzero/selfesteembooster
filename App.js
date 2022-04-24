import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };
  //await AsyncStorage.setItem('xxxx',  JSON.stringify(obj));

  const [good, setGood] = useState('');
  const [bad, setBad] = useState('');
  const [button, setButton] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    callData();
  }, []);

  useEffect(() => {
    if (good || bad) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [good, bad]);

  callData = async () => {
    let _allData = await AsyncStorageLib.getItem('allData');
    if (!_allData) {
      _allData = [];
    } else {
      _allData = JSON.parse(_allData);
    }
    setAllData(_allData.reverse());
  };

  save = async () => {
    let data = {good: good, bad: bad};
    let _allData = await AsyncStorageLib.getItem('allData');
    if (!_allData) {
      _allData = [];
    } else {
      _allData = JSON.parse(_allData);
    }
    _allData.push(data);
    await AsyncStorageLib.setItem('allData', JSON.stringify(_allData));
    setAllData(_allData.reverse());
    setGood('');
    setBad('');
  };

  return (
    <SafeAreaView style={(backgroundStyle, {height: '100%'})}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: Colors.lighter,
            margin: 10,
          }}>
          <Text style={{fontSize: 30, fontWeight: '800', textAlign: 'center'}}>
            Hello My Self-Esteem
          </Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flex: 1, padding: 7}}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                label="Positive"
                mode="outlined"
                theme={{
                  colors: {primary: '#27b197'},
                }}
                value={good}
                onChangeText={async val => {
                  setGood(val);
                }}
              />
            </View>
            <View style={{flex: 1, padding: 7}}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                label="Negative"
                mode="outlined"
                theme={{
                  colors: {primary: '#ff915b'},
                }}
                value={bad}
                onChangeText={async val => {
                  setBad(val);
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Button
              disabled={button ? false : true}
              mode="contained"
              color="#c0f9c5"
              onPress={() => save()}>
              Keep
            </Button>
          </View>
        </View>
        <View style={{margin: 5}} />
        {allData.map((v, k) => (
          <View key={k}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{flex: 1, padding: 5}}>
                <Text style={{fontSize: 20}}>{v.good}</Text>
              </View>
              <View style={{flex: 1, padding: 5, opacity: 0.1}}>
                <Text>{v.bad}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

// import Longdo from 'longdo-map-react-native';
// import React, {useState, useEffect} from 'react';
// import {SafeAreaView, StyleSheet} from 'react-native';

// let map;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
// });
// const App = () => {
//   Longdo.apiKey = 'b6a8120239caa35db6c551251c6411be';

//   return (
//     <SafeAreaView style={styles.container}>
//       <Longdo.MapView
//         ref={r => (map = r)}
//         layer={Longdo.static('Layers', 'GRAY')}
//         zoom={15}
//         zoomRange={{min: 4, max: 18}}
//         location={{lon: 100.5382, lat: 13.7649}}
//         lastView={false}
//         // language={'en'}
//       />
//     </SafeAreaView>
//   );
// };

// export default App;
