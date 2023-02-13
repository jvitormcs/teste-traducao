import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, NativeModules, Platform} from 'react-native';

import './src/utils/i18n'

import { useTranslation } from 'react-i18next'

export default function App() {

const {t, i18n} = useTranslation()

  useEffect(() => {

    onchangeLanguageDevice()

  }, [])

  const onchangeLanguageDevice = () => {

    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

  console.log('lingua dispositivo', deviceLanguage);


  if(deviceLanguage === 'en_GB' || deviceLanguage === 'en_US' || deviceLanguage === 'pt_PT' || deviceLanguage === 'pt_BR' ){
    
    i18n.changeLanguage(deviceLanguage).then(() => {
      console.log('alterado com sucesso')
    }).catch(err => console.e(`erro: ${err}`))

  } else{

    i18n.changeLanguage('en_GB').then(() => {
      console.log('alterado com sucesso')
    }).catch(err => console.e(`erro: ${err}`))

  }

 

  }


  const onPressChangeLanguage = value => {

    console.log(value)
    i18n.changeLanguage(value).then(() => {
      console.log('alterado com sucesso')
    }).catch(err => console.e(`erro: ${err}`))
  }

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle={'light-content'} backgroundColor="#141A31" />

      <View style={styles.languages}>

        <TouchableOpacity 
          onPress={() => {

            onPressChangeLanguage('en_GB')

          } }
          style={[
            styles.langButton, {
            borderColor: '#037CFC',
            }
          ]}
        >
          <Text style={styles.langText}>Inglês</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {

            onPressChangeLanguage('pt_BR')

          } }
          style={[
            styles.langButton, {
              borderColor: '#037CFC',
            }
          ]}
        >
          <Text style={styles.langText}>Português Brasil</Text>
        </TouchableOpacity>

      </View>

      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        {t('bemVindo')}
      </Text>

      <Text style={styles.title}>
        {t('AoAppFilme')}
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {t('Acessar')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>
         {t('CriarConta')}
        </Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141A31',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingStart:24,
    paddingEnd:24,
  },
  languages:{
    flexDirection: 'row',
    alignSelf: 'center',

    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 18 : StatusBar.currentHeight + 58,
  },  
  langButton:{
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
    marginLeft: 4,
  },
  langText:{
    marginRight: 4,
    marginLeft: 4,
    color: '#FFF',
  },  
  logo:{
    maxWidth: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 44,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
  },
  button:{
    alignSelf: 'center',
    backgroundColor: '#037CFC',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 28,
  },
  buttonText:{
    color: '#FFF'
  },
  linkButton:{
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },  
  linkText:{
    textAlign: 'center',
    color: '#FFF',
  },
});
