import * as React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import {
  Separator,
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Input,
  // Text,
  Body,
  Right,
  Left,
  ListItem,
  Picker,
  Item,
  Button,
  Icon,
  Form,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import Autocomplete from 'react-native-autocomplete-input';
// import { Picker } from "@react-native-community/picker";
import { ScrollView } from 'react-native-gesture-handler';
import shortid from 'shortid';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';

// const allItems = [
//   { name: "bread", category: "bakery", active: true },
//   { name: "eggs", category: "dairy", active: true },
//   { name: "paper towels", category: "paperGoods", active: true },
//   { name: "milk", category: "dairy", active: true },
//   { name: "apples", category: "produce", active: true },
//   { name: "broccoli", category: "produce", active: true },
//   { name: "limes", category: "produce", active: true },
//   { name: "tequila", category: "booze", active: true },
//   { name: "beer", category: "booze", active: true },
//   { name: "tylenol", category: "pharmacy", active: true },
//   { name: "frozen corn", category: "frozen", active: true },
//   { name: "hot sauce", category: "dryGoods", active: true },
//   { name: "onions", category: "produce", active: true },
//   { name: "cauliflour", category: "produce", active: true },
//   { name: "cilantro", category: "produce", active: true },
//   { name: "dill", category: "produce", active: true },
//   { name: "oranges", category: "produce", active: true },
//   { name: "lemons", category: "produce", active: true },
// ];

export default function HomeScreen(props) {
  const [selectedId, setSelectedId] = React.useState(null);
  const [listItems, setList] = React.useState([]);
  const [allItems, setAllItems] = React.useState([
    { name: 'bread', category: 'bakery', active: true },
    { name: 'eggs', category: 'dairy', active: true },
    { name: 'paper towels', category: 'paperGoods', active: true },
    { name: 'milk', category: 'dairy', active: true },
    { name: 'apples', category: 'produce', active: true },
    { name: 'broccoli', category: 'produce', active: true },
    { name: 'limes', category: 'produce', active: true },
    { name: 'tequila', category: 'booze', active: true },
    { name: 'beer', category: 'booze', active: true },
    { name: 'tylenol', category: 'pharmacy', active: true },
    { name: 'frozen corn', category: 'frozen', active: true },
    { name: 'hot sauce', category: 'dryGoods', active: true },
    { name: 'onions', category: 'produce', active: true },
    { name: 'cauliflour', category: 'produce', active: true },
    { name: 'cilantro', category: 'produce', active: true },
    { name: 'dill', category: 'produce', active: true },
    { name: 'oranges', category: 'produce', active: true },
    { name: 'lemons', category: 'produce', active: true },
  ]);
  const [itemDraft, modifyDraft] = React.useState('');
  const [category, setCategory] = React.useState('produce');
  const [order, setOrder] = React.useState([
    'produce',
    'bakery',
    'dairy',
    'booze',
    'paperGoods',
    'pets',
    'frozen',
    'dryGoods',
    'pharmacy',
    'random',
    'fridge',
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

  function findItems(draftItem) {
    if (draftItem.length < 2) {
      return [];
    }
    const regex = new RegExp(`${itemDraft}`, 'i');
    return allItems.filter((item) => item.name.search(regex) >= 0);
  }
  function comp(a, b) {
    return a.toLowerCase() === b.toLowerCase();
  }

  const rowTranslateAnimatedValues = {};
  Array(allItems.length)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if (value < -Dimensions.get('window').width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...allItems];
        newData[key].active = false;
        setAllItems(newData);
        this.animationIsRunning = false;
      });
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? '#08805B' : '#D0F1E7';
    let category = getCatEmoji(item.category);
    // const index = allItems.findIndex(item)

    return (
      <Animated.View
        style={{
          height: rowTranslateAnimatedValues[
            allItems.indexOf(item)
          ].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
          }),
        }}
      >
        <TouchableHighlight
          style={{ backgroundColor }}
          onPress={() => setSelectedId(item.name)}
        >
          <View>
            <Text>
              {category} {item.name}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };
  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  );
  // async function addNewProduct(name, category) {
  //   setList([...listItems, { [name]: category }]);
  //   await AsyncStorage.setItem('@allItems', JSON.stringify(newProductsList));
  //   setList({
  //     listItems: newProductsList,
  //   });
  // }
  return (
    <SafeAreaView style={styles.container}>
      <Form style={styles.form}>
        {/* <Input style={styles.input} placeholder='new item...' /> */}
        <Autocomplete
          data={
            findItems(itemDraft).length === 1 &&
            comp(itemDraft, findItems(itemDraft)[0].name)
              ? []
              : findItems(itemDraft)
          }
          style={styles.input}
          defaultValue={itemDraft}
          // inputContainerStyle={styles.input}
          listContainerStyle={styles.listStyle}
          // listStyle={styles.listStyle}
          placeholder="new item..."
          keyExtractor={(item) => item.name + shortid()}
          onChangeText={(text) => {
            modifyDraft(text);
          }}
          renderItem={({ item, i }) => (
            <TouchableOpacity
              onPress={() => {
                modifyDraft(item.name);
                setCategory(item.category);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <Body>
          <Picker
            iosIcon={
              <Icon name="arrow-dropdown-circle" style={{ color: '#08805B' }} />
            }
            selectedValue={category}
            style={styles.picker}
            onValueChange={(data) => {
              setCategory(data);
            }}
          >
            <Picker.Item label="Produce" value="produce" />
            <Picker.Item label="Bakery" value="bakery" />
            <Picker.Item label="Dairy" value="dairy" />
            <Picker.Item label="Paper Goods" value="paperGoods" />
            <Picker.Item label="Booze" value="booze" />
            <Picker.Item label="Forzen" value="frozen" />
            <Picker.Item label="Dry Goods" value="dryGoods" />
            <Picker.Item label="Pharmacy" value="pharmacy" />
            <Picker.Item label="Random" value="random" />
            <Picker.Item label="Fridge" value="fridge" />
          </Picker>
        </Body>
        <Right>
          <Button
            iconLeft
            transparent
            style={styles.button}
            onPress={() => {
              if (
                listItems.some(
                  (item) =>
                    item.category === category && item.name === itemDraft
                )
              ) {
                console.log(
                  'we should add a message to user that the item is already in list'
                );
              } else if (itemDraft === '') {
                console.log('grey button in the future so the user knows');
              } else if (itemDraft !== '') {
                setList([
                  ...listItems,
                  { name: itemDraft, category: category, active: true },
                ]);
              }
              modifyDraft('');
            }}
          >
            <Ionicons name="ios-add-circle-outline" size={22} color="#08805B" />
          </Button>
        </Right>
      </Form>
      <SwipeListView
        disableRightSwipe
        data={allItems}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={onSwipeValueChange}
      />
      {/* <FlatList
        data={listItems.sort(compare)}
        keyExtractor={(item) => item.name + item.category}
        renderItem={({ item }) => {
          const backgroundColor =
            item.name === selectedId ? '#08805B' : '#D0F1E7';
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
      /> */}
    </SafeAreaView>
  );
}

function getCatEmoji(category) {
  switch (category) {
    case 'produce':
      return '🥦';
    case 'dairy':
      return '🐮';
    case 'frozen':
      return '🧊';
    case 'fridge':
      return '🥶';
    case 'booze':
      return '🥃';
    case 'pharmacy':
      return '💊';
    case 'paperGoods':
      return '🧻';
    case 'bakery':
      return '🍞';
    case 'dryGoods':
      return '🍪';
    case 'pets':
      return '🐈';
    case 'random':
      return '🔪';
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginLeft: 16,
    marginRight: 16,
    padding: 0,
    zIndex: 13,
  },
  plus: {},
  picker: {
    justifyContent: 'flex-end',
    minWidth: 160,
  },
  listStyle: {
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  input: {
    width: 120,
    borderWidth: 0,
    fontSize: 17,
  },
  button: {
    justifyContent: 'center',
    padding: 0,
    width: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#D0F1E7',
    marginTop: 0,
    paddingTop: 0,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
