import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme"

export const styles = StyleSheet.create({
  container: {
    padding: 32,
    paddingBottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: colors.gray[100]
  },
  name: {
    color: colors.gray[600],
    fontSize: 20,
    fontFamily: fontFamily.bold,
  },
  description: {
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 32,
  },
  group: {
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
    width: "100%",
  },
  title: {
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
    fontSize: 14,
    marginBottom: 12,
  },
  rule: {},
})