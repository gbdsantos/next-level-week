import { useEffect, useState } from "react"
import { Alert, Text, StyleSheet, View } from "react-native"
import  MapView, { Callout, Marker, } from "react-native-maps"

import * as Location from "expo-location"

import { Categories, type CategoriesProps } from "@/components/categories"
import { Places } from "@/components/places"
import type { PlaceProps } from "@/components/place"

import { colors, fontFamily } from "@/styles/theme"

import { api } from "@/services/api"

type MarketsProps = PlaceProps & {
  latitude: number
  longitude: number
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [markets, setMarkets] = useState<MarketsProps[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")

      setCategories(data)
      setCategory(data[0].id)

    } catch (error) {
      Alert.alert(
        "Categorias",
        "Não foi possível carregar as categorias."
      )
      console.log(error)
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return 
      }

      const { data } = await api.get(`/markets/category/${category}`)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Locais",
        "Não foi possível carregar os locais."
      )
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (granted) {
        const getLocation = await Location.getCurrentPositionAsync()
        setLocation(getLocation)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    getCurrentLocation()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories 
        data={categories} 
        onSelect={setCategory}
        selected={category}
      />

      <MapView 
        initialRegion={{
          latitude: location ? location.coords.latitude : currentLocation.latitude,
          longitude: location ? location.coords.longitude : currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ flex: 1 }}
      >
        <Marker 
          coordinate={{
            latitude: location ? location.coords.latitude : currentLocation.latitude,
            longitude: location ? location.coords.longitude : currentLocation.longitude,
          }}
          identifier="current"
          image={require("@/assets/location.png")}
        />

        {
          markets.map((item) => (
            <Marker 
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              key={item.id}
              identifier={item.id}
              image={require("@/assets/pin.png")}
            >
              <Callout>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.address}>{item.address}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        }
      </MapView>

      <Places data={markets} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: { 
    color: colors.gray[600],
    fontFamily: fontFamily.medium,
    fontSize: 14, 
  },
  address: { 
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
    fontSize: 12, 
  }
})