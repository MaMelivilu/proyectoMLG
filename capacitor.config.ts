import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prueba.app',
  appName: 'AppPrueba',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
