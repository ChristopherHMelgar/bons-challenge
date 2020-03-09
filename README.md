# bons-challenge
Backend NodeJS Challenge
## Api Doc

>### Create Game

* **Method**: POST
* **Route**: /game/create
* **Body**: 

| Name  | Type | Description | Required |
| ------------- | ------------- | ------------- | ------------- |
| maxTurn  | Number  | Number of turns in the game | yes |
| hero  | Object  | Object with the name of the hero | yes | 
| monster  | Object  | Object with the name of the monster | no | 

  >Hero

| Name  | Typindice del la carta a jugare | Description | Required |
| ------------- | ------------- | ------------- | ------------- |
| name  | string  | Hero's name | yes |

  >Monster
  
| Name  | Type | Description | Required |
| ------------- | ------------- | ------------- | ------------- |
| name  | string  | Monster's name | yes |


>### Get Game

* **Method**: GET
* **Route**: /game
* **Parameters**: None

>### Play next turn
If you send the body empty, plays the monster.

* **Method**: POST
* **Route**: /game/next
* **Body**:

| Name  | Type | Description | Required |
| ------------- | ------------- | ------------- | ------------- |
| cardIndex  | Number  | Index the card to play | no | 


>### Player cards
* **Method**: GET
* **Route** /player/cards
* **Parameters**: None


>### Get player
* **Method**: GET
* **Route**: /player
* **Parameters**: 

| Name  | Type | Description | Required |
| ------------- | ------------- | ------------- | ------------- |
| type  | string  | Type of player (hero or monster) | yes |

