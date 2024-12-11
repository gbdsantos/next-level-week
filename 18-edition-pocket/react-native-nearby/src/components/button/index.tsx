import {
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps
} from 'react-native'

import { colors, fontFamily } from "@/styles/theme"
import { styles } from './styles'

// 
function Button({ children, style }: TouchableOpacityProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]}>
      {children}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={styles.title}>{children}</Text>
}

Button.Title = Title

export { Button }