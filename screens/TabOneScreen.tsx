import * as React from 'react'
import { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Emoji from 'react-native-emoji'
import CardFlip from 'react-native-card-flip'
import { Text, View } from '../components/Themed'

const EMOJI_LIST = [
    ':coffee:', ':christmas_tree:', ':birthday:', ':fireworks:', ':pizza:', ':heart:',
]

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createCards(): string[][] {

    const cards: string[][] = [new Array(4), new Array(4), new Array(4), new Array(4)]
    let i = 0;
    let length = 0;
    let emoji;
    while (length < 16) {
        const x1 = Math.floor(i / 4),
            y1 = Math.floor(i % 4),
            x2 = getRandomInt(4),
            y2 = getRandomInt(4);
        console.log(x1, y1, x2, y2, cards[x1][y1], cards[x2][y2])
        if (!emoji) {
            emoji = EMOJI_LIST[getRandomInt(EMOJI_LIST.length)]
            if (cards[x1][y1]) {
                i = (i + 1) % 16
                emoji = null
                continue
            } else {
                cards[x1][y1] = emoji
            }
        }
        if (!cards[x2][y2]) {
            cards[x2][y2] = emoji
            emoji = null
            i = (i + 2) % 16
            length += 2
        }
        console.log(i)
    }
    return cards
}


function Card ({ value, flip }) {
    const cardRef = useRef(null)
    return <CardFlip style={styles.cardContainer} ref={card => (cardRef.current = card)}>
        <TouchableOpacity
            activeOpacity={1}
            style={[ styles.card, styles.card1 ]}
            onPress={() => flip(cardRef.current, value)}>
            {/*<Text style={styles.label}>X</Text>*/}
        </TouchableOpacity>
        <TouchableOpacity
            activeOpacity={1}
            style={[ styles.card, styles.card2 ]}
            onPress={() => flip(cardRef.current, value)}>
            {/*<Text >{value}</Text>*/}
            <Emoji name={value} style={{ ...styles.label, fontSize: 75 }}/>
        </TouchableOpacity>
    </CardFlip>
}

const cards: string[][] = createCards()
export default function TabOneScreen () {

    const [count, setCount] = useState(0)
    const [successCount, setSuccessCount] = useState(0)
    const [prevCard, setPrevCard] = useState(null)
    const [openedCard, setOpenedCard] = useState(null)

    function flip (card, value) {
        card.flip()
        setCount(count + 1)
        if (openedCard) {
            if (openedCard === value) {
                setSuccessCount(successCount + 1)
                setOpenedCard(null)
                return
            } else {
                setTimeout(() => {
                    card.flip()
                    prevCard.flip()
                    setOpenedCard(null)
                }, 500)
            }
        } else {
            setOpenedCard(value)
            setPrevCard(card)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Count of tries: {count}</Text>
            {successCount === 8
                ? <Text>Success!</Text>
                : <Text>Pairs: {successCount}</Text>
            }

            {/*<Text style={9styles.title}>{index}+{index}={index+index}</Text>*/}
            {/*  <TouchableOpacity style={{padding: 100, backgroundColor: 'grey'}} onPress={()=>setIndex(index-1)}><Text>{index}</Text></TouchableOpacity>*/}
            {cards.map(row => {
                return <View style={styles.rowContainer}>{row.map(val => <Card value={val} flip={flip}/>)}</View>
            })}
            {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
            {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // height: 00
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'green',
        // flex: 1,
        // width: 100,
        // height: 100, backgroundColor: 'red'
    },
    cardContainer: {
        flex: 1,
        height: 80,
        margin: 3,
        padding: '3rem',
        // width: 30,
        // height: '100%',
    },
    card: {
        // width: 320,
        height: '100%',
        textAlignVertical: 'center',
        backgroundColor: '#FE474C',
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    card1: {
        backgroundColor: '#FE474C',
    },
    card2: {
        backgroundColor: '#FEB12C',
    },
    label: {
        // lineHeight: 470,
        textAlign: 'center',
        fontSize: 75,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 20
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
