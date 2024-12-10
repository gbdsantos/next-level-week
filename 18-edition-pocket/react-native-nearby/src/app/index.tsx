import {
  View
} from 'react-native'

import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'

export default function Index(){
  return (
    <View 
      style={{
        flex: 1,
        gap: 40,
        padding: 40,
      }}
    >
        <Welcome />
        <Steps />
    </View>
  );
}