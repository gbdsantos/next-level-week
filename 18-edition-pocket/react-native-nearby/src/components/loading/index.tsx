import { ActivityIndicator } from "react-native"

import { colors } from "@/styles/theme"
import { styles } from "./styles"

export function Loading(){
  return (
    <ActivityIndicator 
      color={colors.green.base}
      style={styles.container}
    />
  );
}