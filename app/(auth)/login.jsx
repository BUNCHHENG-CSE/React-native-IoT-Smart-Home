import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const [showToggle, setShowToggle] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const demoEmail = "demo@gmail.com";
  const demoPassword = "demo12345";
  const logIn = (email, password) => {
    if (demoEmail === email && demoPassword === password) {
      AsyncStorage.setItem("token","YVhRZ2FYTnVKM1FnWVNCd1lYTnpkMjl5WkE9PQ==")
      return true;
    } else {
      return false;
    }
  };
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const loginUser = logIn(form.email, form.password);

      //const result = await getCurrentUser();
      //setUser(result);
      if (loginUser) {
        setIsLogged(true);
        Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View
          className={`w-full flex justify-center items-center ${
            showToggle ? "" : "h-full"
          } px-4 my-2`}
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />
          <Text className="text-2xl text-black mt-7 font-pbold">
            Login your Account
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
          />

          <CustomButton
            title="Log In"
            handlePress={submit}
            containerStyles="mt-5 bg-cyan-300 w-full"
            textStyles="text-white "
            isLoading={isSubmitting}
          />

          <View className="mt-2 -mb-16">
            <TouchableOpacity
              className=" text-black font-pbold text-lg"
              onPress={() => setShowToggle(!showToggle)}
            >
              {showToggle ? (
                <Text className="font-pbold">Hide</Text>
              ) : (
                <Text className="font-pbold">Show</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {showToggle ? (
          <View className="flex items-center -mt-10">
            <Text className="text-[14px] font-psemibold">
              Demo account {"\n"}
              Email : demo@gmail.com {"\n"}
              Password : demo12345
            </Text>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
