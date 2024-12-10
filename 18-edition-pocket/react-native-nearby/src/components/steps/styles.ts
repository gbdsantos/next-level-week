import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  title: {
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
    fontSize: 16,
  }
});