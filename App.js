import Routes from './src/routes';
import { useColorScheme } from 'react-native';
import { Provider as Provedor, DefaultTheme, DarkTheme } from 'react-native-paper';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <Provedor theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Routes />
    </Provedor>
  );
}
