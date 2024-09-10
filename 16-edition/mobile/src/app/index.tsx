import { useState } from "react"
import { Image, Text, View } from "react-native"

import { Button } from "@/components/button"
import { Input } from "@/components/input"

import { colors } from "@/styles/colors"
import { ArrowRight, Calendar as CalendarIcon, MapPin, Settings2, UserRoundPlus } from "lucide-react-native"

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS)

  function handleNextStepForm() {
    if (stepForm === StepForm.TRIP_DETAILS) {
      return setStepForm(StepForm.ADD_EMAIL) 
    }
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
            placeholder="Para onde?"
          />
        </Input>
 
        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            editable={stepForm === StepForm.TRIP_DETAILS}
            placeholder="Quando?" 
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
              <Input.Field placeholder="Quem estará na viagem?" />
            </Input>
          </>
          }
        <Button onPress={handleNextStepForm}>
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
    </View>
  )
}