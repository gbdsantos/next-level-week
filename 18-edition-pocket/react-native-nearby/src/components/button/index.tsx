import {
  ActivityIndicator,
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps
} from 'react-native'

import { colors, fontFamily } from "@/styles/theme"
import { styles } from './styles'

import { IconProps as TablerIconProps } from "@tabler/icons-react-native"

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

function Button({ children, isLoading = false, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      disabled={isLoading}
      style={[styles.container, style]}
      {...rest}
    >
      { isLoading ? <ActivityIndicator color={colors.gray[100]} size="small" /> : children }
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={styles.title}>{children}</Text>
}

type IconProps = {
  icon: React.ComponentType<TablerIconProps>
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon color={colors.gray[100]} size={24} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }