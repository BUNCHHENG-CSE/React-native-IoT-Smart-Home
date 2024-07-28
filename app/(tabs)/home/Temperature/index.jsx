import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useEMQXConnectionContext } from "../../../../context/EMQXConnectionProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { base_url } from "../../../../components/BaseUrl";
import { LineChart } from "react-native-chart-kit";
const index = () => {
  const { payload } = useEMQXConnectionContext();
  const [data, setData] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [tempDataKey, setTempDataKey] = useState([]);
  const [tempDataValue, setTempDataValue] = useState([]);
  const [postData, SetPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (payload !== "") {
      console.log(payload)
      // setTempDataKey(Object.keys(JSON.parse(payload)));
      // setTempDataValue(Object.values(JSON.parse(payload)));
      if (tempDataKey[0] == "temperature" && tempDataKey[1] == "humidity") {
        setTemperature(tempDataValue[0]);
        setHumidity(tempDataValue[1]);
        // SetPostData({
        //   temperature: Number(tempDataValue[0]),
        //   humidity: Number(tempDataValue[1]),
        // });
        setTempDataValue([]);
        setTempDataKey([]);
      }
    }
  }, [payload]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/getData`);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        className="flex items-center justify-center mt-10"
        size='large'
      />
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (postData !== null) {
  //       axios
  //         .post(`${base_url}/postData`, postData)
  //         .then((response) => {
  //           setData([...data, response.data]);
  //         })
  //         .catch((error) => {
  //           console.error("There was an error adding the data!", error);
  //         });
  //     }
  //   }, 20000);
  //   return () => clearInterval(interval);
  // }, []);
  const tempLists = [
    {
      id: 1,
      name: "Temperature",
      data: `${temperature.toFixed(2)}`,
      icon: <FontAwesome6 name="temperature-low" size={32} color="black" />,
      bgc: " bg-[#30fffa]",
    },
    {
      id: 2,
      name: "Humidity",
      data: `${humidity.toFixed(2)}`,
      icon: (
        <MaterialCommunityIcons name="water-percent" size={40} color="black" />
      ),
      bgc: " bg-[#8093b1]",
    },
  ];

  return (
    <View>
      <ScrollView>
        <View className="mb-18 flex items-center">
          {tempLists.map((tl) => (
            <View
              className={`w-72 h-fit px-10 py-7 rounded-3xl mt-4 shadow-2xl shadow-zinc-800 transition-all duration-300 ease ${tl.bgc}`}
              key={tl.id}
            >
              <View className="flex flex-row  justify-between">
                <View>
                  <Text className=" font-pbold text-[20px] text-white">
                    {tl.name}
                  </Text>
                  <Text className=" font-psemibold text-[18px] text-white">
                    {tl.data}
                    {tl.name === "Temperature" ? (
                      <> &#8451;</>
                    ) : tl.name === "Humidity" ? (
                      <> &#37;</>
                    ) : (
                      <></>
                    )}
                  </Text>
                </View>
                <View>{tl.icon}</View>
              </View>
            </View>
          ))}
        </View>

        {loading ? (
          <></>
        ) : (
          <>
            <View className="mt-10 flex flex-col justify-center">
              <View>
                <Text className="text-[16px] text-center font-pextrabold">
                  Temperature Line Chart
                </Text>
                <LineChart
                  data={{
                    labels: data.map((d) => formatDate(d.timestamp)),
                    datasets: [
                      {
                        data: data.map((dT) => dT.temperature),
                        color: (opacity = 255) =>
                          `rgba(216, 255, 246, ${opacity})`,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 10} // from react-native
                  height={220}
                  yAxisSuffix=" ℃"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "#659999",
                    backgroundGradientFrom: "#659999",
                    backgroundGradientTo: "#f4791f",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 50) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "1",
                      stroke: "#d8fff6",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    marginLeft: 4,
                    borderRadius: 16,
                  }}
                />
              </View>
              <View>
                <Text className="text-[16px] text-center font-pextrabold">
                  Humidity Line Chart
                </Text>
                <LineChart
                  data={{
                    labels: data.map((d) => formatDate(d.timestamp)),
                    datasets: [
                      {
                        data: data.map((dH) => dH.humidity),
                        color: (opacity = 255) =>
                          `rgba(26, 54, 120, ${opacity})`,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 10} // from react-native
                  height={220}
                  yAxisSuffix=" %"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "#bfd6d8",
                    backgroundGradientFrom: "#acb6e5",
                    backgroundGradientTo: "#86fde8",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 50) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "1",
                      stroke: "#1a3678",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    marginLeft: 4,
                    borderRadius: 16,
                  }}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default index;
