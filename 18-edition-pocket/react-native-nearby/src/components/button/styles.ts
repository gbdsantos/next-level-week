import { StyleSheet } from 'react-native'
import { colors, fontFamily } from "@/styles/theme"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green.base,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 14,
    height: 56,
    maxHeight: 56,
  },
  title: {
    color: colors.gray[100],
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  }
});