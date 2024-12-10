import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  details: {
    flex: 1,
  },
  title: {
    color: colors.gray[600],
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
  description: {
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: fontFamily.regular,
    marginTop: 4,
  }
});