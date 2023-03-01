# Description of the Features

## Overview

The main focus of the app is to help with practicing music. You can create practice plans with your pieces and exercises and track the progress of these in the statistics. While practicing you start a practice session in the app and have access to tools like a metronom, tuner or a recorder. You can add a plan or piece to your session and practice from that. All your exercises and pieces get stored in your library and you can add them to multiple plans. In the statistics section you can see how much and when you practiced each piece and how you rated yourself. You can also track your general practice hours and what you practiced on certain days in the calendar.

## Practice Plans

The core of the app.

### Use case

- Order pieces and exercises in plans

### Features

- A practice plan is a ordered list of pieces/exercises/category.
- Plans have a title.
- You can add pieces/exercises or whole categories from the library to the plan.
- You can add a time amount (how long you should practice the piece) to each item of the plan.
- For pieces that have subitems/movements or for categorys of pieces you can specify how many subitems/movements you want to practice.
- In practice sessions with a plan, the items appear in the order of the plan.
- You can reorder the items in the plan.

## Practice Session

### Use Case

- Track the time you practice
- Have useful tools you need while practicing
- Track which pieces and plans you practice

### Features

- You start a practice session when you also start a practice session in real life.
- On the session screen you have access to a metronome, a tuner, pedal notes and a recorder (microphone)
- You can add a practice plan to a session to start practicing this plan
  - The current piece will be displayed
  - You can rate your progress with the piece from 1-5
  - If the piece has a time amount you get a notification when you have 1 minute left (if amount >1min) and when the time is up.
  - You can decide when you want to go to the next piece.
  - The time you practice a piece gets tracked.
- Your practice time gets tracked, it is hidden by default but you can press sth to show it
- If you navigate the app, your practice session continues but a bar at the top/bottom will appear, where you also can stop the session
- There is a stop button: after pressing you can decide if you want to save the session or not.
- Any practice plan that is not finished can be continued on the same day.

## Library of Exercises and Pieces

### Features

- Overview of pieces/exercises.
- Add pieces/exercises to a category.
- Add subexercises/movements to a piece/exercise.
- Delete pieces/exercises.
- See statistics on pieces/exercises (--> Statistics).

## Statistics

### Features

- Calendar overview of practice days.
- Day view
  - how many hours per day and from when to when
  - how long on which piece
  - average rating on the day
  - ratings of the pieces
- Exercise/piece view
  - when it was practiced and for how long
  - average rating over a time span that can be specified (default last practice)

## Future Ideas

- Set practice goals for individual pieces and plans
- Share practice plans with other users
- Notes in practice sessions that get added to plans and pieces
