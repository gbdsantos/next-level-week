import { useRef } from 'react'
import {
  Text,
  View,
  useWindowDimensions
} from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'

import { Place, type PlaceProps } from '../place'

import { styles } from './styles'

type Props = {
  data: PlaceProps[]
}

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions()
  const bottomRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128
  }

  return (
    <BottomSheet 
      backgroundStyle={styles.container}
      enableOverDrag={false}
      handleIndicatorStyle={styles.indicator}
      snapPoints={[snapPoints.min, snapPoints.max]} 
      ref={bottomRef} 
    >
      <BottomSheetFlatList 
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Explore locais perto de você</Text>
        )}
      />
    </BottomSheet>
  );
}