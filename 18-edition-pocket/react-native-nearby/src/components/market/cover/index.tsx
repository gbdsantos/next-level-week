import { ImageBackground, View } from "react-native"
import { router } from "expo-router"

import { Button } from "@/components/button"

import { IconArrowLeft } from "@tabler/icons-react-native"
import { styles } from "./styles"

type Props = {
  uri: string
}

export function Cover({ uri }: Props) {
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => router.back()} style={{ height: 40, width: 40 }}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  )
}