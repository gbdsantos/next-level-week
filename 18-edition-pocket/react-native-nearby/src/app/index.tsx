import {
  View
} from 'react-native'
import { router } from "expo-router" 

import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'
import { Button } from '@/components/button';

import { IconPlus } from "@tabler/icons-react-native"

export default function Index() {
  function handleNavigation() {
    router.navigate("/home")
  }

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

        <Button onPress={handleNavigation}>
          <Button.Title>Começar</Button.Title>
          <Button.Icon icon={IconPlus} />
        </Button>
    </View>
  );
}