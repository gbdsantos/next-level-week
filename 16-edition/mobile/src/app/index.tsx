import { useEffect, useState } from "react"
import { Alert, Image, Keyboard, Text, View } from "react-native"

import dayjs from "dayjs"
import { router } from "expo-router"
import { ArrowRight, AtSign, Calendar as CalendarIcon, MapPin, Settings2, UserRoundPlus } from "lucide-react-native"
import { DateData } from "react-native-calendars"

import { Button } from "@/components/button"
import { Calendar } from "@/components/calendar"
import { GuestEmail } from "@/components/email"
import { Input } from "@/components/input"
import { Loading } from "@/components/loading"
import { Modal } from "@/components/modal"

import { tripServer } from "@/server/trip-server"
import { tripStotrage } from "@/storage/trip"

import { colors } from "@/styles/colors"
import { calendarUtils, DatesSelected } from "@/utils/calendarUtils"
import { validateInput } from "@/utils/validateInput"


enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2
}

export default function Index() {
  // LOADING
  const [isCreatingTrip, setIsCreatingTrip] = useState(false)
  const [isGettingTrip, setIsGettingTrip] = useState(false)

  // DATA
  const [destination, setDestination] = useState("")
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected)
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS)
  const [emailToInvite, setEmailToInvite] = useState("")
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([""])

  // const today = new Date().toISOString() // Get date using only JS API
  // const todayDayjs = dayjs().toISOString() // Get date using library dayjs
  // console.log("new Date: ", today)
  // console.log("dayjs: ", todayDayjs)

  // MODAL
  const [showModal, setShowModal] = useState(MODAL.NONE)

  function handleNextStepForm() {
    if (destination.trim().length === 0 || !selectedDates.startsAt || !selectedDates.endsAt) {
      return Alert.alert(
        "Detalhes da viagem",
        "Preencha todas as informações da viagem para seguir."
      )
    }

    if (destination.length < 4) {
      return Alert.alert(
        "Detalhes da viagem",
        "O destino deve ter pelo menos 4 caracteres."
      )
    }

    if (stepForm === StepForm.TRIP_DETAILS) {
      return setStepForm(StepForm.ADD_EMAIL) 
    }

    Alert.alert(
      "Nova viagem",
      "Confirmar viagem?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: createTrip }
      ]
    )
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay
    })

    setSelectedDates(dates)
  }

  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((prevState) => 
      prevState.filter((email) => email !== emailToRemove)
    )
  }

  function handleAddEmail() {
    if(!validateInput.email(emailToInvite)) {
      return Alert.alert("Convidado", "E-mail inválido!")
    }

    const emailAlreadyExists = emailsToInvite.find((email) => email === emailToInvite)

    if(emailAlreadyExists) {
      return Alert.alert("Convidado", "E-mail já foi adicionado!")
    } 

    setEmailsToInvite((prevState) => [...prevState, emailToInvite])
    setEmailToInvite("")
  }
 
  async function saveTrip(tripId: string) {
    try {
      await tripStotrage.save(tripId)

      router.navigate("/trip/" + tripId)
    } catch (error) {
      Alert.alert(
        "Salvar viagem",
        "Não foi possível salvar o id da viagem no dispositivo."
      )
    }
  }

  async function createTrip() {
    try {
      setIsCreatingTrip(true)

      const newTrip = await tripServer.create({
        destination,
        starts_at: dayjs(selectedDates.startsAt?.dateString).toString(),
        ends_at: dayjs(selectedDates.endsAt?.dateString).toString(),
        emails_to_invite: emailsToInvite
      })

      console.log("NEWTRIP: ", newTrip)

      Alert.alert(
        "Nova viagem",
        "Viagem criada com sucesso!",
        [
          { 
            text: "Ok. Continuar.", 
            onPress: () => saveTrip(newTrip.tripId) 
          }
        ]
      )
    } catch (error) {
      setIsCreatingTrip(false)
      console.log(error)
    }
  }

  async function getTrip() {
    try {
      const tripID = await tripStotrage.get()

      if (!tripID) {
        return setIsGettingTrip(false)
      }

      const trip = await tripServer.getById(tripID)
      console.log(trip)

      if (trip) {
        return router.navigate(`trip/ + ${tripID}`)
      }

    } catch (error) {
      setIsGettingTrip(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getTrip()
    console.log("TELA RENDERIZADA")
  }, [])

  if (isGettingTrip) {
    return <Loading />
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image 
        className="h-8"
        resizeMode="contain"
        source={require("@/assets/logo.png")} 
      />

      <Image className="absolute" source={require("@/assets/bg.png")} />

      <Text className="font-regular mt-3 text-center text-lg text-zinc-400 ">
        Convide seus amigos e planeje sua{"\n"} próxima viagem
      </Text>

      <View className="w-full bg-zinc-900 p-4 rounded-lg my-8 border border-zinc-800"> 
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field 
            editable={stepForm === StepForm.TRIP_DETAILS} 
            onChangeText={setDestination}
            placeholder="Para onde?"
            value={destination}
          />
        </Input>
 
        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            editable={stepForm === StepForm.TRIP_DETAILS}
            onFocus={() =>  Keyboard.dismiss()}
            onPressIn={() => stepForm === StepForm.TRIP_DETAILS && setShowModal(MODAL.CALENDAR)}
            placeholder="Quando?" 
            showSoftInputOnFocus={false}
            value={selectedDates.formatDatesInText}
          />
        </Input>

        { stepForm === StepForm.ADD_EMAIL &&
          <>
            <View className="border-b py-3 border-zinc-800">
              <Button onPress={() => setStepForm(StepForm.TRIP_DETAILS)} variant="secondary">
                <Button.Title>Alterar local/data</Button.Title>
                <Settings2 color={colors.zinc[200]} size={20} />
              </Button>
            </View>

            <Input>
              <UserRoundPlus color={colors.zinc[400]} size={20} />
              <Input.Field 
                autoCorrect={false} 
                placeholder="Quem estará na viagem?" 
                onPress={() => {
                  Keyboard.dismiss()
                  setShowModal(MODAL.GUESTS)
                }}
                showSoftInputOnFocus={false}
                value={
                  emailsToInvite.length > 0 
                    ? `${emailsToInvite.length} pessoas(a) convidadas(s)`
                    : ""
                }  
              />
            </Input>
          </>
          }
        <Button isLoading={isCreatingTrip} onPress={handleNextStepForm}>
            <Button.Title>
              { 
                stepForm === StepForm.TRIP_DETAILS
                ? "Continuar" 
                : "Confirmar Viagem" 
              }
            </Button.Title>
            <ArrowRight color={colors.lime[950]} size={20} />
          </Button>
      </View>

      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos{" "}
        <Text className="text-zinc-300 underline">
          termos de uso e políticas de privacidade
        </Text>
        .
      </Text>

      <Modal 
        title="Selecionar datas" 
        subtitle="Selecione a data de ida e volta da viagem"
        onClose={() => setShowModal(MODAL.NONE)}
        visible={showModal === MODAL.CALENDAR}
      >
      <View className="gap-4 mt-4">
        <Calendar 
          markedDates={selectedDates.dates}
          minDate={dayjs().toISOString()} // new Date().toISOString()
          onDayPress={handleSelectDate}
        />

        <Button onPress={() => setShowModal(MODAL.NONE)}>
          <Button.Title>Confirmar</Button.Title>
        </Button>
      </View>
      </Modal>

      <Modal 
        title="Selecionar convidados"
        subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem"
        onClose={() => setShowModal(MODAL.NONE)}
        visible={showModal === MODAL.GUESTS}
      >
        <View className="border-b border-zinc-800 my-2 flex-wrap gap-2 items-center py-5">
          {
            emailsToInvite.length > 0 ? (
              emailsToInvite.map(email => (
                <GuestEmail 
                  email={email} 
                  key={email} 
                  onRemove={() => handleRemoveEmail(email)}
                />
              )) 
            ) : (
              <Text className="text-zinc-600 text-base font-regular">
                Nenhum e-mail adicionado
              </Text>
          )}
          
        </View>

        <View className="gap-4 mt-4">
          <Input variant="secondary">
              <AtSign color={colors.zinc[400]} size={20} />
              <Input.Field 
                keyboardType="email-address" 
                onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
                onSubmitEditing={handleAddEmail}
                placeholder="Digite o e-mail do convidado"
                returnKeyType="send"
                value={emailToInvite}
              />
          </Input>

          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}