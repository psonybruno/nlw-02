import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

const Favorites: React.FC = () => {

  const [isfilterVisible, setIsfilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  function handleToogleFiltersVisible()
  {
    setIsfilterVisible(!isfilterVisible);
  }

  function laodFavorites()
  {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response);
        setFavorites(JSON.parse(favoritedTeachers));
      }
    });
  }

  useFocusEffect(() => {
    laodFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader
        title="Meus Proffys Favoritos"
        headerRight={(
          <BorderlessButton onPress={handleToogleFiltersVisible}>
              <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
        >
        {isfilterVisible && (
          <View style={styles.searchForm}>

            <Text style={styles.label}>Materia</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                />
              </View>
            </View>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.favoriteList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        >
        {favorites.map((teacher: Teacher)=> {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited
              />
          )
        })}
      </ScrollView>

    </View>
  );
}

export default Favorites;