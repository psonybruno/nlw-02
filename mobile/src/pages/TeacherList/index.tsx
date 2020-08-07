import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text  } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';
import { Teacher } from '../../components/TeacherItem/index';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {

  const [isfilterVisible, setIsfilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<Number[]>([]);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  function laodFavorites()
  {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) => {
          return teacher.id;
        })
        setFavorites(JSON.parse(favoritedTeachersIds));
      }
    });
  }

  useFocusEffect(() => {
    laodFavorites();
  })

  function handleToogleFiltersVisible()
  {
    setIsfilterVisible(!isfilterVisible);
  }

  async function handleFiltersSubmit()
  {
    laodFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        weekDay,
        time,
      }
    });

    setIsfilterVisible(false);
    if(response.data.status === 200)
      setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys Disponíveis"
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
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  value={weekDay}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}

      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        >
        {teachers.map((teacher:Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        )) }

        {teachers.length === 0 && <Text>Preencha os filtros para exibir os proffys</Text>}
      </ScrollView>

    </View>
  );
}

export default TeacherList;