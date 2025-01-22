import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme"

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  title: {
   color: colors.gray[400], 
   fontFamily: fontFamily.medium,
   fontSize: 14,
   marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.green.soft,
    borderRadius: 8,
    gap: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  code: {
    color: colors.gray[600],
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    textTransform: "uppercase",
  },
})