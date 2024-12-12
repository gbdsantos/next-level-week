import {
  FlatList
} from 'react-native'

import { styles } from './styles'
import { Category } from '../category';

export type CategoriesProps = {
  id: string
  name: string
}[]

type Props = {
  data: CategoriesProps
  selected: string
  onSelect: (id: string) => void
}

export function Categories({ data, onSelect, selected }: Props){
  return (
    <FlatList 
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => 
        <Category 
          name={item.name} 
          iconId={item.id} 
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      }
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  );
}