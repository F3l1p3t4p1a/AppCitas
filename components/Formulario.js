import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

export default function Formulario({citas, setCitas, setMostarForm, guardarCitasStorage}) {

  const [fecha, SetFecha] = useState('');
  const [hora, setHora] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


  // Muestra y oculta el calendario 

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmFecha = date => {
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    let year = date.getFullYear();
    let fecha = `${day}-${month}-${year}`;
    SetFecha(fecha);
    hideDatePicker();
  };


    //muestra y oculta la hora

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };



  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmHora = time => {
    let hr = time.getHours() < 9 ? `0${time.getHours() + 1}` : time.getHours() + 1;
    let min = time.getMinutes() < 9 ? `0${time.getMinutes() + 1}` : time.getMinutes() + 1;
    let hora = `${hr}:${min}`;
    setHora(hora);
    hideTimePicker();
  };


  // Funcion para crear nueva cita

  const crearNuevaCita = () => {
    // validacion 

    if(paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '')
    {
      Alert.alert(
        'Error !',
        'Todos los campos son obligatorios',
        [{
           text: 'OK'
        }]
      )

      return;
    }

    // Crear nueva cita

    const cita = {paciente, propietario,telefono,fecha,hora,sintomas};
    cita.id = shortid.generate();

   // Agregar al state

   const citasNew = [...citas, cita];
   setCitas(citasNew);


   // pasar las nuevas citas a storage

   guardarCitasStorage(JSON.stringify(citasNew));

   //ocultar formulario

   setMostarForm(false);
   
   // Resetear el formulario



  }

  return (
    <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente : </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ text => setPaciente(text)}
                />
            </View>
            <View>
                <Text style={styles.label}>Dueño : </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={text => setPropietario(text)}
                />
            </View>
            <View>
                <Text style={styles.label}>Telefono Contacto : </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ text => setTelefono(text)}
                    keyboardType='phone-pad'
                />
                
            </View>
            <View>
            <Text style={styles.label}>Fecha :</Text>
            <Button title="Mostrar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                />
                <Text>{fecha}</Text>
            </View>
            <View>
                <Text style={styles.label}>Hora :</Text>
            <Button title="Mostrar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmHora}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                />
                <Text>{hora}</Text>
            </View>      
            <View>
                <Text style={styles.label}>Sintomas : </Text>
                <TextInput 
                    multiline
                    style={styles.input}
                    onChangeText={ text => setSintomas(text)}
                />
            </View>

            <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnGuardar}>
                <Text style={styles.textoGuardar}>Guardar</Text>
            </TouchableHighlight>

        </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        
        borderRadius: 5
        
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnGuardar: {
        padding: 10,
        backgroundColor: '#7D024E',
        marginVertical: 10,
        borderRadius: 50
      },
      textoGuardar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
      }

})