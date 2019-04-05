import * as db from './_data'

export const CARD_TYPE = 'CARD'
export const DECK_TYPE = 'DECK'

export function getInitialData(){
  return Promise.all(
    [getAll(DECK_TYPE), 
    getAll(CARD_TYPE)]
  ).then(
    ([decks, cards]) => {
      return {
        decks,
        cards,
      }
    }
  )
}

export function saveDeck(title) {
    let deck = formatDeck(title, 'verify')
    return db.submitEntry(DECK_TYPE, deck)
}
export function deleteEntry(key) {
    return db.removeEntry(key)
}
export function saveCard(deckId, question, answer) {
    let card = formatCard(deckId, question, answer, 'verify')
    return db.submitEntry(CARD_TYPE, card)
}

export function getAll(type){
  return db.getAll(type)
}

function formatCard (deckId, question, answer, author) {
  return {
    deckId,
    timestamp: Date.now(),
    author,
    question,
    answer,
  }
}

function formatDeck (title, author) {
  return {
    timestamp: Date.now(),
    author,
    title,
    cards:[]
  }
}