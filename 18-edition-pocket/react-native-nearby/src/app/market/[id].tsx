import { useEffect, useRef, useState } from "react"
import { Alert, Modal, StatusBar, ScrollView, View } from "react-native"
import { useCameraPermissions, CameraView } from "expo-camera"
import { Redirect, router, useLocalSearchParams } from "expo-router"

import { Button } from "@/components/button"
import { Cover } from "@/components/market/cover"
import { Loading } from "@/components/loading"
import { Details, PropsDetails } from "@/components/market/details"

import { api } from "@/services/api"
import { Coupon } from "@/components/market/coupon"

type DataProps = PropsDetails & {
   cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>()
  const [coupon, setCoupon] = useState<string | null>(null)

  const [isCouponFetching, setIsCouponFetching] = useState(false)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [permission, requestPermission] = useCameraPermissions()
  const params = useLocalSearchParams<{ id: string }>()
  
  const qrLock = useRef(false)
  console.log(params.id)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Error",
        "Não foi possível carregar os dados.",
        [ 
          { 
            text: "Ok", 
            onPress: () => router.back(),
          }
        ]
      )
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert(
          "Câmera",
          "Você precisa habilitar o uso da câmera."
        )
      }

      qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Câmera",
        "Não foi possível utilizar a câmera."
      )
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsCouponFetching(true)

      const { data } = await api.patch(`/coupons/${id}`)

      Alert.alert(
        "Cupom",
        data.coupon
      )

      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Erro",
        "Não foi possível utilizar o cupom."
      )
    }
    finally {
      setIsCouponFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim" , onPress: () => getCoupon(id) },
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon ])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
        <StatusBar  barStyle="light-content" hidden={isVisibleCameraModal} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Cover uri={data.cover} />
          <Details data={data} />
          { coupon && <Coupon code={coupon} /> }
        </ScrollView>

        <View style={{ padding: 32 }}>
          <Button onPress={handleOpenCamera}>
            <Button.Title>Ler QR Code</Button.Title>
          </Button>
        </View>

        <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
            <CameraView 
              facing="back"
              onBarcodeScanned={({ data }) => {
                if (data && !qrLock.current) {
                  qrLock.current = true
                  setTimeout(() => handleUseCoupon(data), 500)
                }
              }}
              style={{ flex: 1}} 
            />

            <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
              <Button 
                isLoading={isCouponFetching}
                onPress={() => setIsVisibleCameraModal(false)}
              >
                  <Button.Title>Voltar</Button.Title>
              </Button>
            </View>
        </Modal>
    </View>
  )
}