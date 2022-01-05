import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';

export default function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  })


  const apiKeyUrl = '?api_key=4cb2bf129624fa7e43e37f2e7cb3a1a3&language=pt-BR'
  const apiIdUrl = 'https://api.themoviedb.org/3/movie/'
  const apiSearchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=4cb2bf129624fa7e43e37f2e7cb3a1a3&language=pt-BR&query='




  const search = () => {
    axios(apiSearchUrl + state.s).then(({ data }) => {

      let results = data.results
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }

  const openPopUp = (id) => {
    axios(apiIdUrl + id + apiKeyUrl).then(({ data }) => {
      let result = data;
      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title} >Procure um filme:</Text>
      <TextInput style={styles.searchbox} value={state.s} onChangeText={text => setState(prevState => {
        return { ...prevState, s: text }
      })}
        onSubmitEditing={search}
      />

      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight
            underlayColor='none'
            key={result.id}
            onPress={() => openPopUp(result.id)}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w342/${result.poster_path}` }}
                style={{
                  width: '100%',
                  height: 300,
                  borderRadius: 8,
                }}
                resizeMode='contain'
              />
              <Text style={styles.heading}>{result.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={(typeof state.selected.title != "undefined")}
      >

        <View style={styles.popUp} >
          <Text style={styles.popUpTitle} >{state.selected.title}</Text>
          <Image
                source={{ uri: `https://image.tmdb.org/t/p/w342/${state.selected.poster_path}` }}
                style={{
                  width: '100%',
                  height: 300,
                  borderRadius: 8,
                }}
                resizeMode='contain'
              />

          <Text style={{ marginBottom: 20 }}>Nota:  {state.selected.vote_average}</Text>
          <Text>{state.selected.overview}</Text>
        </View>
        <TouchableHighlight
          onPress={() => setState(prevState => {
            return { ...prevState, selected: {} }
          })}
        >
          <Text style={styles.closeBtn} >Voltar</Text>
        </TouchableHighlight>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565',
  },
  popUp: {
    padding: 20,
  },
  popUpTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    backgroundColor: '#2484c4',
  }
});
