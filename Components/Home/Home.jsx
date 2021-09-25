import React,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";
import { icons, img, SIZES, COLORS, FONTS } from "../../constants/index";
import { Houses } from "../../Data";
const width = Dimensions.get("screen").width / 2 + 70;
const height = Dimensions.get("screen").height / 2 - 20;
const w=Dimensions.get("screen").width
const h=Dimensions.get("screen").height/7

const RenderHeader = () => {
  return (
    <>
      <View style={styles.header}>
        <View>
          <View style={styles.locationtext}>
            <Text style={{ ...FONTS.body3, fontWeight: "200" }}>Location</Text>
          </View>
          <View style={styles.locationheader}>
            <Image
              source={icons.location}
              resizeMode="contain"
              style={{ width: 30, height: 30, tintColor: COLORS.primary }}
            />
            <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>
              Solo,Indonesia
            </Text>
          </View>
        </View>

        <View style={styles.notifView}>
          <Image
            source={icons.notification}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </View>
      </View>
    </>
  );
};
const RenderSearchBar = () => {
  return (
    <View style={styles.searchbarview}>
      <TextInput
        placeholder="Search favorite house"
        style={{
          height: 40,
          padding: 10,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,.1)",
          borderRadius: 10,
          color: COLORS.black,
          flex: 1,
        }}
      />
      <TouchableOpacity style={styles.touchable}>
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{ width: 30, height: 40, tintColor: COLORS.white }}
        />
      </TouchableOpacity>
    </View>
  );
};

const HouseListCard = ({ item ,nav}) => {

  return (
    <TouchableOpacity onPress={()=>nav.nav.navigate('DetailView',{item:item})}>
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Image
          source={item.outsideImg}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <View style={styles.detailcontainer}>
        <View>
          <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>
            {item.HouseName}
          </Text>
          <Text style={{ color: COLORS.darkgray }}>
            {item.location.country + "," + item.location.city}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: "#FFD700" }}
          />
          <Text>{item.stars}</Text>
        </View>
      </View>

      <View style={styles.roomDetails}>
        <View style={{flexDirection:'row',alignItems:'center',}}>
          <View
            style={{
              height:30,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 5,
              borderWidth:1,
              padding:10,
              borderRadius:10,
              borderColor:'rgba(0,0,0,.2)',
            }}
          >
            <Image
              source={icons.bedrooms}
              resizeMode="contain"
              style={{ width: 20, height: 20, marginRight: 5,tintColor:COLORS.primary }}
            />
            <Text>{item.bedrooms + " Bedrooms"}</Text>
          </View>
          <View
            style={{
              height:30,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 5,
              borderWidth:1,
              padding:10,
              borderRadius:10,
              borderColor:'rgba(0,0,0,.2)'
            }}
          >
            <Image
              source={icons.wifiavaliable}
              resizeMode="contain"
              style={{ width: 20, height: 20, marginRight: 5 ,tintColor:COLORS.primary}}
            />
            <Text>{"Wifi"}</Text>
          </View>
        </View>
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              width: 30,
              height: 30,
            }}
          >
            <Image
              source={icons.next}
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const RenderHouseList = (nav) => {
  return (
    <View style={{  marginTop: 20, marginBottom: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Houses}
        renderItem={({item})=>{
          return <HouseListCard item={item} nav={nav}/>
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const PopularHouse=({navigation})=>{
  const [popHouses,setPopHouses]=useState();
  const [popHouse,setPopHouse]=useState();
  useEffect(()=>{

    const getPopHouse=(houses)=>{
      let rating=houses[0];
      houses.forEach((house)=>{
        if(house.stars>=rating.stars){
          rating=house
        }
      });
      setPopHouse(rating);

    }


    let arr=[];
    Houses.forEach((house) => {
      if(house.isPopular)
      {
        arr.push(house)
      }
    });
    setPopHouses(arr)
    getPopHouse(arr)
  },[])

  const ViewPop=()=>(
    <TouchableOpacity onPress={()=>navigation.navigate('DetailView',{item:popHouse})}>
    <View style={{width:w,height:h,backgroundColor:COLORS.white,borderRadius:20,marginTop:20,padding:10,flexDirection:'row'}}>
      <View style={{width:100,height:'100%',borderRadius:10,overflow:'hidden',marginRight:10,}}>
      <Image source={popHouse.outsideImg} resizeMode='cover' style={{width:'100%',height:'100%'}}/>
      </View>
      <View style={{marginLeft:10,}}>
        <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>{popHouse.HouseName}</Text>
        <Text style={{ color: COLORS.darkgray }}>{popHouse.location.country+','+popHouse.location.city}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: "#FFD700" }}
          />
          <Text>{popHouse.stars}</Text>
        </View>
        </View>
      </View>
      </TouchableOpacity>
  )
  const ViewEmptyPop=()=>(
    <View>
          <Text>Empty</Text>
      </View>
  )
  
  return(
    <View>
      
      <Text style={{...FONTS.h4,fontWeight:'bold'}}>Popular House</Text>
      <View>
        {
          popHouse?<ViewPop/>:<ViewEmptyPop/>

        }
      </View>
    </View>
  )

}

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader />
      <RenderSearchBar />
      <RenderHouseList nav={navigation}/>
      <PopularHouse navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 10,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationtext: {
    marginBottom: 10,
  },
  locationheader: {
    flexDirection: "row",
    alignItems: "center",
  },
  notifView: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.01)",
    padding: 5,
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,.2)",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    elevation: 10,
  },
  searchbarview: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  touchable: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    // padding:5,
    borderRadius: 10,
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  card: {
    width: width,
    height: height,
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderRadius: 20,
    padding: 10,
  },
  imgContainer: {
    width: "100%",
    height: "65%",
    borderRadius: 10,
    overflow: "hidden",
  },
  detailcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'space-between'
  },
});
export default Home;
