import * as React from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
} from "react-native";
import {
  Separator,
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Input,
  Text,
  Body,
  Right,
  Left,
  ListItem,
  Picker,
  Item,
  Form,
  Button,
  Icon,
} from "native-base";
// import { Picker } from "@react-native-community/picker";
import { ScrollView } from "react-native-gesture-handler";
import shortid from "shortid";
import { Ionicons } from "@expo/vector-icons";
import { MonoText } from "../components/StyledText";

const allItems = [
  { name: "bread", category: "bakery", active: true },
  { name: "eggs", category: "dairy", active: true },
  { name: "paper towels", category: "paperGoods", active: true },
  { name: "milk", category: "dairy", active: true },
  { name: "apples", category: "produce", active: true },
  { name: "broccoli", category: "produce", active: true },
  { name: "limes", category: "produce", active: true },
  { name: "tequila", category: "booze", active: true },
  { name: "beer", category: "booze", active: true },
  { name: "tylenol", category: "pharmacy", active: true },
  { name: "frozen corn", category: "frozen", active: true },
  { name: "hot sauce", category: "dryGoods", active: true },
  { name: "onions", category: "produce", active: true },
  { name: "cauliflour", category: "produce", active: true },
  { name: "cilantro", category: "produce", active: true },
  { name: "dill", category: "produce", active: true },
  { name: "oranges", category: "produce", active: true },
  { name: "lemons", category: "produce", active: true },
];

export default function HomeScreen(props) {
  const [selectedId, setSelectedId] = React.useState(null);
  const [listItems, setList] = React.useState([]);
  const [itemDraft, modifyDraft] = React.useState("");
  const [category, setCategory] = React.useState("produce");
  const [order, setOrder] = React.useState([
    "produce",
    "bakery",
    "dairy",
    "booze",
    "paperGoods",
    "pets",
    "frozen",
    "dryGoods",
    "pharmacy",
    "random",
    "fridge",
  ]);
  function compare(a, b) {
    let aOrder = order.indexOf(a.category);
    let bOrder = order.indexOf(b.category);
    if (aOrder > bOrder) return 1;
    if (bOrder > aOrder) return -1;
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
  }
  // async function addNewProduct(name, category) {
  //   setList([...listItems, { [name]: category }]);
  //   await AsyncStorage.setItem('@allItems', JSON.stringify(newProductsList));
  //   setList({
  //     listItems: newProductsList,
  //   });
  // }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allItems.sort(compare)}
        ListHeaderComponent={
          <ListItem style={styles.form}>
            <Input style={styles.input} placeholder='new item...' />
            <Picker
              iosIcon={
                <Icon
                  name='arrow-dropdown-circle'
                  style={{ color: "#08805B" }}
                />
              }
              selectedValue={category}
              style={{
                height: 40,
                width: 130,
              }}
              onValueChange={(data) => {
                console.log(data);
                setCategory(data);
                modifyDraft(category);
              }}
            >
              <Picker.Item label='Produce' value='produce' />
              <Picker.Item label='Bakery' value='bakery' />
              <Picker.Item label='Dairy' value='dairy' />
              <Picker.Item label='Paper Goods' value='paperGoods' />
              <Picker.Item label='Booze' value='booze' />
              <Picker.Item label='Forzen' value='frozen' />
              <Picker.Item label='Dry Goods' value='dryGoods' />
              <Picker.Item label='Pharmacy' value='pharmacy' />
              <Picker.Item label='Random' value='random' />
              <Picker.Item label='Fridge' value='fridge' />
            </Picker>
            <Button iconLeft success transparent>
              <Ionicons
                name='ios-add-circle-outline'
                size={30}
                color='#c7c6c1'
                style={styles.button}
              />
            </Button>
          </ListItem>
        }
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const backgroundColor =
            item.name === selectedId ? "#08805B" : "#D0F1E7";
          let category = getCatEmoji(item.category);
          return (
            <ListItem
              style={{ backgroundColor }}
              onPress={() => setSelectedId(item.name)}
            >
              <Text>
                {category} {item.name}
              </Text>
            </ListItem>
          );
        }}
      />
    </SafeAreaView>
  );
}

function getCatEmoji(category) {
  switch (category) {
    case "produce":
      return "🥦";
    case "dairy":
      return "🐮";
    case "frozen":
      return "🧊";
    case "fridge":
      return "🥶";
    case "booze":
      return "🥃";
    case "pharmacy":
      return "💊";
    case "paperGoods":
      return "🧻";
    case "bakery":
      return "🍞";
    case "dryGoods":
      return "🍪";
    case "pets":
      return "🐈";
    case "random":
      return "🔪";
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  left: {
    width: 150,
  },
  form: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  plus: {
    position: "absolute",
  },
  input: { width: 140 },
  button: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#D0F1E7",
    marginTop: 0,
    paddingTop: 0,
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

{
  /* <Picker
selectedValue={category}
style={{
  height: 30,
  width: '50%',
  marginBottom: 190,
}}
onValueChange={(data) => {
  console.log(data);
  setCategory(data);
  modifyDraft(intputText);
}}
>
<Picker.Item label="Produce" value="produce" />
<Picker.Item label="Bakery" value="bakery" />
<Picker.Item label="Dairy" value="dairy" />
<Picker.Item label="Paper Goods" value="paperGoods" />
<Picker.Item label="Pets" value="pets" />
<Picker.Item label="Booze" value="booze" />
<Picker.Item label="Forzen" value="frozen" />
<Picker.Item label="Dry Goods" value="dryGoods" />
<Picker.Item label="Pharmacy" value="pharmacy" />
<Picker.Item label="Random" value="random" />
<Picker.Item label="Fridge" value="fridge" />
</Picker> */
}
