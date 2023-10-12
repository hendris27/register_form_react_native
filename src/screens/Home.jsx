import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';

const Home = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    //data provinsi dari API
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => {
        if (!response) {
          throw new Error('Failed to fetch provinces');
        }
        return response.json();
      })
      .then(data => {
        setProvinces(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleProvinceChange = itemValue => {
    setSelectedProvince(itemValue);
    if (itemValue !== '') {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/cities/province/${itemValue}.json`,
      )
        .then(response => {
          if (!response) {
            throw new Error('Failed to fetch cities');
          }
          return response.json();
        })
        .then(data => {
          setCities(data);
        })
        .catch(error => {
          console.error('Error fetching city data:', error);
          setCities([]);
        });
    } else {
      setCities([]);
    }
  };

  const handleCityChange = itemValue => {
    console.log('Item Value:', itemValue);
    setSelectedCity(itemValue);
    if (itemValue !== '') {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/cities/regency/${itemValue}.json`,
      )
        .then(response => {
          if (!response) {
            throw new Error('Failed to fetch cities');
          }
          return response.json();
        })
        .then(data => {
          console.log('City Data:', data);
          setCities(data);
        })
        .catch(error => {
          console.error('Error fetching city data:', error);
          setCities([]);
        });
    } else {
      setCities([]);
    }
  };

  const handleDistrictChange = itemValue => {
    setSelectedDistrict(itemValue);
    if (itemValue !== '') {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${itemValue}.json`,
      )
        .then(response => {
          if (!response) {
            throw new Error('Failed to fetch districts');
          }
          return response.json();
        })
        .then(data => {
          setDistricts(data);
        })
        .catch(error => {
          console.error('Error fetching district data:', error);
          setDistricts([]);
        });
    } else {
      setDistricts([]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrappTitle}>
        <View>
          <Icon name="addusergroup" color="white" size={40} />
        </View>

        <View style={styles.wrappText}>
          <Text style={styles.title}>React Native</Text>

          <Text style={styles.title}>User Registration Form</Text>
        </View>
      </View>

      <View style={styles.wrapperField}>
        <View>
          <TextInput style={styles.inputfield} placeholder="Nama Lengkap" />
        </View>
        <View style={styles.containerSelect}>
          <Picker
            selectedValue={selectedProvince}
            onValueChange={itemValue => handleProvinceChange(itemValue)}>
            <Picker.Item label="Provinsi" value="" />
            {provinces.map(province => (
              <Picker.Item
                key={province.id}
                label={province.name}
                value={province.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.containerSelect}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={itemValue => handleCityChange(itemValue)}>
            <Picker.Item label="Kota" value="" />
            {cities.map(city => (
              <Picker.Item key={city.id} label={city.name} value={city.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.containerSelect}>
          <Picker
            style={styles.selectfield}
            selectedValue={selectedDistrict}
            onValueChange={itemValue => handleDistrictChange(itemValue)}>
            <Picker.Item label="Kecamatan" value="" />
            {districts.map(district => (
              <Picker.Item
                key={district.id}
                label={district.name}
                value={district.id}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.btnfield}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1C1E21',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  wrappTitle: {
    flexDirection: 'rows',
    gap: 10,
  },
  wrappText: {
    flexDirection: 'rows',
    gap: -30,
  },
  title: {
    fontSize: 24,
    width: 260,
    height: 58,
    color: 'white',
  },
  inputfield: {
    height: 55,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 20,
  },
  selectfield: {
    height: 55,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'green',
    alignItems: 'center',
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  containerSelect: {
    height: 55,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  btnfield: {
    marginTop: 60,
    backgroundColor: '#0D6EFD',
    height: 55,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 30,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
  },
  wrapperField: {
    flexDirection: 'col',
    gap: 10,
  },
});

export default Home;
