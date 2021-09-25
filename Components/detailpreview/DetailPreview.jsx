import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
  Button,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { icons, img, SIZES, COLORS, FONTS } from "../../constants/index";
import { Houses } from "../../Data";

const DetailView = ({ navigation, route }) => {
  //
  const { item } = route.params;
  // const item=Houses[0];

  const rooms = item.insideImg;


  const RoomCard = ({item,index}) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('ViewHotel',{'data':rooms,'index':index})}>
      <View style={styles.cardview}>
        <Image
          source={item}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Image
          source={item.outsideImg}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.backbtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={icons.back}
            style={{ width: 20, height: 20, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.title}>
            <View>
              <Text style={{ ...FONTS.h1, fontWeight: "bold" }}>
                {item.HouseName}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={icons.location}
                  resizeMode="contain"
                  style={{ width: 30, height: 30, tintColor: COLORS.primary }}
                />
                <Text style={{ color: COLORS.darkgray }}>
                  {item.location.country + "," + item.location.city}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={icons.star}
                resizeMode="contain"
                style={{ width: 20, height: 20, tintColor: "#FFD700" }}
              />
              <Text>{item.stars}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={{ color: COLORS.darkgray }}>{item.dsc}</Text>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Facilities
            </Text>
            <FlatList
              data={rooms}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item,index }) => <RoomCard item={item} index={index}/>}
              keyExtractor={({ index }) => index}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft:10,
          paddingRight:10,
          paddingTop:5,
        }}
      >
        <View>
          <Text style={{ color: COLORS.darkgray }}>Price</Text>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              ...FONTS.h2,
              marginTop: 10,
            }}
          >
            {item.price}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            paddingBottom: 10,
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "40%",
  },
  backbtn: {
    backgroundColor: "rgba(0,0,0,.1)",
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  body: {
    height: "70%",
    padding: 10,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardview: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
export default DetailView;
