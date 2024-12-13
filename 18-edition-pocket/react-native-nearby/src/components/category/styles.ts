import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    paddingHorizontal: 12,
  },
  name: {
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  containerSelected: {
    backgroundColor: colors.green.base,
    borderColor: colors.green.base,
    borderWidth: 1,
  },
  nameSelected: {
    color: colors.gray[100],
  }
});