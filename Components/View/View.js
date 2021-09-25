import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS, FONTS,icons } from "../../constants";

const ViewHotel = ({ navigation, route }) => {
  const [index, setIndex] = useState();

  const { data } = route.params;

  const RoomCard = ({ item, index }) => {
    // 

    return (
      <TouchableOpacity onPress={()=>setIndex(index)}>

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

  useState(() => {
    const setClickedPicker = () => {
      const { index } = route.params;
      setIndex(index);
    };
    setClickedPicker();
    console.log('pressed index>>>',index)
  }, [index]);

  return (
    <SafeAreaView style={styles.container}>
        
      <Image
        source={data[index]}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      <View style={{ position: "absolute", bottom: 50,paddingLeft:10,paddingRight:10 }}>
        <Text style={{ color: COLORS.white, fontWeight: "bold", ...FONTS.h2,marginBottom:10 }}>
          Detail Preview
        </Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RoomCard item={item} index={index} />
          )}
        />
      </View>
        <TouchableOpacity style={styles.backbtn} onPress={()=>navigation.navigate('Home')}>
            <Image source={icons.back} style={{ width: 20, height: 20, tintColor: COLORS.white }}/>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardview: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    borderColor:'rgba(255,255,255,.2)',
    borderWidth:1,
  },
  header: {
    height: "40%",
  },
  backbtn: {
    backgroundColor: "rgba(0,0,0,.2)",
    position: "absolute",
    top: StatusBar.currentHeight+10,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 10,
  },
});
export default ViewHotel;
