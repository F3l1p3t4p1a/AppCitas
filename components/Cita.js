import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

export default function Cita({item, eliminarPaciente}) {

  const dialogoEliminar = id => {
    console.log("Eliminando....", id);
    eliminarPaciente(id);
  }
  return (
    <View style={styles.contenedor}>
      <View>
        <Text style={styles.label}>paciente :</Text>
        <Text style={styles.texto}>{item.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario :</Text>
        <Text style={styles.texto}>{item.propietario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas :</Text>
        <Text style={styles.texto}>{item.sintomas}</Text>
      </View>
      <View>
        <TouchableHighlight onPress={() => dialogoEliminar(item.id)} style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10
    
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
  },
  texto: {
    fontSize: 18
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
    borderRadius: 50
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})