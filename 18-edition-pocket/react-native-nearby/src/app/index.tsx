import {
  View
} from 'react-native'

import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'
import { Button } from '@/components/button';

import { IconPlus } from "@tabler/icons-react-native"

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

        <Button>
          <Button.Title>Começar</Button.Title>
          <Button.Icon icon={IconPlus} />
        </Button>
    </View>
  );
}