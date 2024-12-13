import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native'

import { IconSticker } from '@tabler/icons-react-native'

import { colors } from "@/styles/theme"
import { styles } from './styles'

export type PlaceProps = {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

type Props = TouchableOpacityProps & {
  data: PlaceProps
}

export function Place({ data, ...rest }: Props){
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image  source={{ uri: data.cover }} style={styles.image} />

      <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>

        <View style={styles.footer}>
          <IconSticker color={colors.red.base} size={16} />
          <Text style={styles.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}