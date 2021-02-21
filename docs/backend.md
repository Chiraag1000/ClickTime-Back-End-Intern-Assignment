# Back-end Track

The server-side of this application is built using TypeScript and Node. If you're new to this setup, the files should feel similar to any other statically-typed, object oriented language setup. We've created an API that follows a standard Router, Controller, Services architecture.

We've also created separate pages for the back-end exercises, which attempt to use endpoints that you will be creating. You can go to these pages from our homepage, and will be able to use them to test your solutions.

## Exercises

The first exercise should help you get familiar with our setup, and structure, and requires fewer changes. The second exercise is much more open, and you will need to write more new code yourself rather than relying on the existing setup. For both exercises, the models that define the contract between the client-side and server-side have already been created in `src/server/models`.

1. Our phrases have a `difficultyLevelId`, and we even have `data/difficulty_levels.json`. We would like to let users choose the difficulty level they want to play on, and we want to display the difficulty of the phrase chosen for each game. Our front-end display is already ready, but our API doesn't currently support retrieving difficulty level data.

    **Task: Add support in our API to make a GET request for Difficulty Level data like we do with a Category. Once you've constructed your API appropriately, go to the `Back-end Exercise One` link. You should see difficulty levels as an option in the game loading screen, and you should see the current difficulty level for a chosen phrase once you are playing.**

    *Note: The endpoint created for this should be `GET /api/difficultyLevels`.*

    When you're done, it should look something like this:

    <img src="./backend-exercise-1.gif" width="1000px">

2. Users want to have a better understanding of how well they've been doing while playing our game. While we have built a user, we cannot currently PATCH the user object using our API to update the number of wins and losses a user has faced.

    **Task: Implement the ability to PATCH a user. While the files and methods exist, you'll need to fill out the code from a few different methods that currently just contain `throw new Error('Not implemented')` in order to do this. You can go to the `Back-end Exercise Two` link to test out your endpoint, as the page is built using the expected contract based on the created models. When you win or lose, the number of wins and losses displayed should get updated. Consider edge cases for what requests can be sent to this endpoint.**

    *Note: Entity service currently doesn't have any functionality to PATCH entities. You will need to add this! You should be able to draw some inspiration from the way POST works.*

    When you're done, it should look something like this:

    <img src="./backend-exercise-2.gif" width="1000px">

## Background Information

You are free to modify any files as you see fit. There are three locations you specifically need to know about:

- `src/data` - This folder contains the data used for our application.
- `src/pages/api` - This structure of this folder is the structure of our API routes, and you will be adding files here for the new routes you are creating.
- `src/server` - This folder contains most of the code that is run server-side. You will be adding and modifying files here for your new endpoints.

### Structure

Our API routes are available under `src/pages/api` and the URL path for calls to the API is `http://localhost:3000/api/...`. The URL path matches the folder structure - `/api/phrases/index.ts` is called with `/api/phrases`, while `/api/phrases/random.ts` is called with `/api/phrases/random`. It's important to note that we also have dynamic URLs - any URL with square brackets, such as `/api/phrases/[id].ts`, will match a URL like `/api/phrases/3` and put the `3` down as a query parameter `id = 3`. The files in `src/pages/api` serve as routers, routing the information to a controller. If you'd like, you can learn more about our routing [here](https://nextjs.org/docs/routing/introduction).

Controllers live in the `src/server/controllers` folder. It contains a base class, `entity.controller.ts`, and entity specific controllers that build on the base class. Controllers parse the information passed in through the API by validating any models to make sure that they are of the correct type, grabbing filters, etc. The controllers call services to perform the requested action.

Services live in the `src/server/services` folder. Similar to the controllers, it contains a base class, `entity.service.ts`, and entity specific services that build on the base class. The entity specific services reference one entity contained within the `data/` folder. They are responsible for any database validation necessary and perform reads / writes on the JSON file in `data/`.

We've defined the models representing data in `src/server/models`. These models are used throughout our code for static type-checking.

### Debugging

Since the API logic is server-side, a `console.log` will output to the terminal that is running `npm run dev`. Additionally, you can open up your your browser's dev tools and see the API requests and responses through the Network tab.

You can also test making API calls on Postman or using curl by hitting `http://localhost:3000/api/...`
