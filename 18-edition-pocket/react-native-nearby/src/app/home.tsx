import { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"

import { Categories, CategoriesProps } from "@/components/categories"

import { api } from "@/services/api"

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")

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

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Categories 
        data={categories} 
        onSelect={setCategory}
        selected={category}
      />
    </View>
  )
}