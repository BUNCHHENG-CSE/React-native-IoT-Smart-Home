import { View, Text, Image } from "react-native";

import { Link } from "expo-router";

const FeatureCard = ({ title, icon, id }) => {
  return (
    <>
      <Link
        href={`/home/${title.replaceAll(" ", "")}`}
        className={`h-fit px-2 py-2 rounded-3xl ml-1 `}
      >
        <View
          className={`h-max w-40 px-2 py-5 rounded-3xl mt-3 shadow-lg bg-white shadow-zinc-800 
          `}
        >
          <View className="flex items-center flex-col">
            <View className="w-[60px] h-[60px] rounded-lg flex justify-center items-center p-0.5">
              <Image
                source={icon}
                className="w-full h-full rounded-lg "
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className="mt-4 mb-1 text-base font-pextrabold">
                {title}
              </Text>
            </View>
          </View>
        </View>
      </Link>
    </>
  );
};

export default FeatureCard;
