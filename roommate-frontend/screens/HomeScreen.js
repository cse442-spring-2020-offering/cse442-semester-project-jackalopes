import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

import * as SecureStore from 'expo-secure-store';
import { determineURL } from '../utils'

const pageBackground = '#4FD0E9'

const CircleButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 50,
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2
    }}
  >
    {children}
  </TouchableOpacity>
)

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.reloadCards()
    });

    this.reloadCards()
  }

  reloadCards = async () => {
    const token = await SecureStore.getItemAsync('token')
    fetch(`${determineURL()}/api/v1/matches/`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    })
      .then(response => response.json())
      .then(matches => {
        console.log(matches)
        this.setState({ cards: matches, token })
        if (this.swiper) this.swiper.setCardIndex(0)
      })
  }

  likeUser = (index) => {
    const { cards, token } = this.state;

    fetch(`${determineURL()}/api/v1/like/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }),
      body: JSON.stringify({
        user_liked: cards[index].id
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
  }

  dislikeUser = (index) => {
    const { token } = this.state;

    fetch(`${determineURL()}/api/v1/dislike/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }),
      body: JSON.stringify({
        user_disliked: cards[index].id
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
      })
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: card.picture_url }} />
        <View style={styles.cardText}>
          <Text style={styles.text}>{`${card.first_name} ${card.last_name}`}</Text>
          <Text>{card.username}</Text>
        </View>
      </View>
    )
  };

  onSwiped = (type, card) => {
    console.log(`on swiped ${type}`)
    console.log(card)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  render() {
    const { cards, cardIndex, swipedAllCards } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {cards && cards.length ? <Swiper
            ref={swiper => {
              this.swiper = swiper
            }}
            style={styles.swiper}
            // onSwiped={() => this.onSwiped('general')}
            onSwipedLeft={(index) => this.dislikeUser(index)}
            onSwipedRight={(index) => this.likeUser(index)}
            // onSwipedTop={() => this.onSwiped('top')}
            // onSwipedBottom={() => this.onSwiped('bottom')}
            onTapCard={this.swipeLeft}
            cards={cards}
            cardIndex={cardIndex}
            cardVerticalMargin={20}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            cardStyle={{
              height: "95%"
            }}
            backgroundColor={pageBackground}
            stackSize={3}
            stackSeparation={15}
            animateCardOpacity
          /> : <></>}
        </View>
        <View style={styles.buttons}>
          <CircleButton onPress={() => !swipedAllCards && this.swiper.swipeLeft()}>
            <Ionicons
              name="md-close"
              size={30}
              style={{ marginBottom: -3 }}
              color="#990000"
            />
          </CircleButton>
          <CircleButton onPress={() => !swipedAllCards && this.swiper.swipeRight()}>
            <Ionicons
              name="md-home"
              size={30}
              style={{ marginBottom: -3 }}
              color="#009900"
            />
          </CircleButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pageBackground
  },
  swiper: {
    marginTop: 32
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  pickButton: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2
  },
  image: {
    flex: 1
  },
  cardText: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, .80);',
    paddingLeft: 5,
    paddingBottom: 5
  },
  text: {
    textAlign: 'left',
    fontSize: 35,
  }
})
