import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    gap: 12,
    padding: 24,
    paddingBottom: 100,
  },
  indicator: {
    backgroundColor: colors.gray[300],
    height: 4,
    width: 80,
  },
  title: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: fontFamily.regular,
    marginBottom: 16,
  }
})