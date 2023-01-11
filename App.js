import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';


export default function App() {
  const [mostrarForm, setMostarForm] = useState(false);
  const [citas, setCitas] = useState([]);

  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
        return citasActuales.filter( cita => cita.id !== id);
    })
  }

  // Mostrar u ocultar formulario

  const mostrarFormulario = () => {

    setMostarForm(!mostrarForm);
  }

// funcion cerrar teclado 

const cerrarTeclado = () => {

  Keyboard.dismiss();

}

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
    <View style={styles.container}>
      <Text style={styles.titulo}>Citas Medicas</Text>
      <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrar}>
                <Text style={styles.textoMostrar}>{mostrarForm ? 'Cerrar Formulario' : 'Mostrar Formulario'}</Text>
            </TouchableHighlight>
     <View style={styles.contenido}>
      {mostrarForm ? (
        <>
          <Text style={styles.titulo}>Crear nuevas citas</Text>
          <Formulario citas={citas} setCitas={setCitas} setMostarForm={setMostarForm}/>
        </>
        
      ): (
        <>
         <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, Agrega una'}</Text>
          <FlatList 
            style={styles.listado}
            data={citas}
            renderItem={ ({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} /> }
            keyExtractor={cita => cita.id}
      />
        
        </>

      )
      
      }
     
     
     </View>
    </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AA076B',
  },
  titulo: {
    color: '#FFF',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1, 
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1
  },
  btnMostrar: {
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 10,
    borderRadius: 50
  },
  textoMostrar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
