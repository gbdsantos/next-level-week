import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme"

export const styles = StyleSheet.create({
  logo: {
    marginBottom: 28,
    marginTop: 24,
    height: 48,
    width: 48,
  },
  title: {
    color: colors.gray[600],
    fontFamily: fontFamily.bold,
    fontSize: 24,
  },
  subtitle: {
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
    fontSize: 16,
    marginTop: 12,
  }
})
