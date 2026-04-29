import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [facing, setFacing] = useState('back');

  // 1. Ref de la cámara
  const ref = useRef(null);

  // 2. Estado para guardar la imagen
  const [uri, setUri] = useState(null);

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos tu permiso para acceder a la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // 4 y 5. Función para tomar foto
  async function tomarFoto() {
    if (ref.current) {
      const photo = await ref.current.takePictureAsync();

      // 6. Guardar URI
      if (photo?.uri) {
        setUri(photo.uri);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={ref}>
        <View style={styles.buttonContainer}>
          
          {/* Botón para voltear cámara */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Voltear cámara</Text>
          </TouchableOpacity>

          {/* 3. Botón para tomar foto */}
          <Pressable style={styles.captureButton} onPress={tomarFoto}>
            <Text style={styles.text}>Tomar foto</Text>
          </Pressable>

        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#00000080',
    padding: 10,
    borderRadius: 10,
  },
  captureButton: {
    backgroundColor: '#ffffff80',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    padding: 10,
    alignItems: 'center',
  },
});
