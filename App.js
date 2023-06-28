import Navigation from './src/navigation/Navigation';
import { UserProvider } from './src/provider/UsersProvider';
import useDatabase from './src/hooks/useDatabase';
import { ActivityIndicator } from 'react-native';
import { ZoneProvider } from './src/provider/ZonesProvider';
import { SupplyProvider } from './src/provider/SupplyProvider';
import { ObservationProvider } from './src/provider/ObservacionProvider';
import { TratamientosProvider } from './src/provider/TratamientoProvider';

export default function App() {
  const { isDBLoadingComplete } = useDatabase()

  if (isDBLoadingComplete) {
    return (
      <TratamientosProvider>
        <ObservationProvider>
          <SupplyProvider>
            <ZoneProvider>
              <UserProvider>
                <Navigation />
              </UserProvider>
            </ZoneProvider>
          </SupplyProvider>
        </ObservationProvider>
      </TratamientosProvider>


    );
  } else {
    return (
      <ActivityIndicator
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }} />
    )
  }
};
