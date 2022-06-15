# Personal Quiz 🙂
- Team Number: 1
- Git Repository: [GitHub Link](https://github.com/yumin-jung/ID311-Final-Project)
- Live Demo: [YouTube Link](https://www.youtube.com/)

## Contents
- [Personal Quiz 🙂](#personal-quiz-)
  - [Contents](#contents)
- [Description of the Application 📚](#description-of-the-application-)
  - [Flow Chart](#flow-chart)
  - [User Interfaces](#user-interfaces)
- [Organization of Code 💻](#organization-of-code-)
  - [Overall Structure](#overall-structure)
  - [Directory Structure](#directory-structure)
    - [Client Directory](#client-directory)
    - [Server Directory](#server-directory)
  - [Design Patterns](#design-patterns)
    - [Atomic Design Pattern](#atomic-design-pattern)
    - [Observer Design Pattern](#observer-design-pattern)
    - [Provider Design Pattern](#provider-design-pattern)
    - [Routing Design Pattern](#routing-design-pattern)
  - [Main Functions](#main-functions)
    - [Functions in Client](#functions-in-client)
      - [pages/_app.js](#pages_appjs)
      - [context/AppContext.js](#contextappcontextjs)
      - [components directory](#components-directory)
      - [pages directory](#pages-directory)
    - [Functions in Server](#functions-in-server)
      - [index.js](#indexjs)
      - [routes/{path}.js](#routespathjs)
      - [model/{schema}.model.js](#modelschemamodeljs)
- [Main Challenge 🔥](#main-challenge-)
  - [Work in Collaboration](#work-in-collaboration)
    - [Challenge](#challenge)
    - [How to Overcome](#how-to-overcome)
  - [Libraries & Frameworks](#libraries--frameworks)
    - [Challenge](#challenge-1)
    - [How to Overcome](#how-to-overcome-1)
  - [User Interfaces](#user-interfaces-1)
    - [Challenge](#challenge-2)
    - [How to Overcome](#how-to-overcome-2)
- [What We Learned 🧑‍💻](#what-we-learned-)
  - [Work in Collaboration](#work-in-collaboration-1)
  - [Libraries / Frameworks / Tools](#libraries--frameworks--tools)
    - [Details](#details)
- [Issue and Known Bug 🐞](#issue-and-known-bug-)
- [References 🌿](#references-)
    - [Work in Collaboration](#work-in-collaboration-2)
    - [React](#react)
    - [Next.js](#nextjs)
    - [Material UI](#material-ui)
    - [Node.js](#nodejs)
    - [Axios](#axios)
    - [Heroku](#heroku)
    - [UI design & CSS](#ui-design--css)

# Description of the Application 📚

## Flow Chart
This is flow chart of our application.
<img src="data/flowchart.jpg" width="100%">

## User Interfaces
<!-- How It Works & What the User Has to Do -->
- ### Home Page
  <img src="data/main_page.png" width="80%" height="80%">

  - Input the maker's quiz code.
  - When writing the quiz code, the button for next page appears.
  
- ### SignIn/Up Page
  <img src="data/sign up.png" width="80%" height="80%">
  <img src="data/sign in.png" width="80%" height="80%">

  - Putting first name, last name, username, and password, users can sign up our website.
  - By matching the username and password, users can access their personal page.

- ### Personal Page
  <img src="data/my page_make quiz.png" width="80%" height="80%">
  <img src="data/my page_no one.png" width="80%" height="80%">
  <img src="data/my page.png" width="80%" height="80%">
  <img src="data/my page_yellow.png" width="80%" height="80%">

  - If there is no quiz made before, there is a 'make quiz' button in the personal page.
  - By clicking the button, the maker will make his/her own quiz.
  - After making a quiz, personal unique patterns are generated.
  - If friends solve quizzes, the patterns start to be completed.
  - They can filter the results according to the colors.

- ### MakeQuiz Page
  <img src="data/make_quiz.png" width="80%" height="80%">

  - Makers can modify options and question contents.
  - They can add question, add options or delete options.

- ### ShareLink Page
  <img src="data/share_quiz.png" width="80%" height="80%">

  - By clicking 'share quiz' button, users can copy the texts with quiz link in clipboard.

- ### StartQuiz Page
  <img src="data/start_quiz.png" width="80%" height="80%">

  - Solvers can set their own nickname before starting the quiz.
  - The nickname cannot be overlapped with each other.

- ### SolveQuiz Page
  <img src="data/solve_quiz_unselected.png" width="80%" height="80%">
  <img src="data/solve_quiz.png" width="80%" height="80%">
  <img src="data/solve_quiz_hover.png" width="80%" height="80%">

  - On the top, there is a progress bar to show how many questions remain.
  - There are at least 2 options, and maximum is 4.
  - By right arrow button, they can go to the next page.

- ### LeaveResult Page
  <img src="data/check_result.png" width="80%" height="80%">
  <img src="data/leave_result.png" width="80%" height="80%">

  - Solvers can view the remaining patterns they can fill up and their scores.
  - They will choose one of colors and one postion they want to leave their results, and they can leave a small message with their name and score.


# Organization of Code 💻
## Overall Structure
<img src="data/code_structure.png" width="100%">

## Directory Structure
This is **Directory Structure** of our application

### Client Directory
<img src="data/client-structure.png" width="100%">

- **Reusable components** are stored in the `component` directory.
- **Global store component** is stored in the `context` directory.
- **Pages of the application** are stored horizontally in the `pages` directory.

### Server Directory
<img src="data/server-structure.png" width="100%">

- **Schema of the model** is stored in the `models` directory.
- **Paths that request data from DB** are stored in the `routes` directory.

## Design Patterns
<!-- If you used patterns, what did you use them for, and how do different parts of your code speak to each other? -->
### Atomic Design Pattern
<img src="data/atomic-design-pattern.png" width="80%">

- Divide the components and pages by `Atomic Design Pattern`.
- Why did we use Atomic Design Pattern?
  - Increase `reusability` of components.
  - Increase `scalability` of pages and components.

### Observer Design Pattern
- Pages communicate with components by `props`.
  
  ```js
  return (
    <ThemeProvider theme={theme}>
      <Nav isUser={isUser} quizCode={quizCode} />
    ...
  )
  ```

- Why did we use Observer Design Pattern?
  - Increase `reusability` because components receive data only through props.
  - Components and pages can be managed `independently`.
  - Make pages and components `speak to each other`.

### Provider Design Pattern
- Share data across the tree descendant nodes with Context API
  
  ```js
  function App({ Component, pageProps }) {
  const [isUser, setIsUser] = useState(false)
  const [quizCode, setQuizCode] = useState(null);
  const [quizNickname, setQuizNickname] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <AppContext.Provider
      value={{
        isUser,
        setIsUser,
        quizCode,
        setQuizCode,
        quizNickname,
        setQuizNickname,
        score,
        setScore
      }}
    >
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )}
  ```
- Why did we use Provider Design Pattern?
  - Every components and pages can `share the same state` of application.
  - Solving `prop drilling` in React.
  - Make pages `speak to each other`.

### Routing Design Pattern
- In server, request from client was divided into routes directory by `path`.
  
  ```js
  app.use('/api/users', require('./routes/users'));
  app.use('/api/quizzes', require('./routes/quizzes'));
  app.use('/api/scores', require('./routes/scores'));
  app.use('/api/messages', require('./routes/messages'));
  ```

- Why did we use Routing Design Pattern?
  - Increase `readability` and `ease of management` by Store code separately.
  - `Easy to debug` by tying them together with the same personality.

## Main Functions
<!-- What are the main functions/classes? -->
### Functions in Client
#### pages/_app.js
- `APP()`
  - Top component of every React components.
  - Wrap all pages with the global layout.
  - Especially, wrap all components with a global state using **Context API**.

#### context/AppContext.js
- `createContext(null)`
  - Creates a **global store** used in the application.

#### components directory
- Components like Nav are rendered differently depending on the **state of the page**.
- State of the page is transferred with **props**.

#### pages directory
- **Render** each page of the application.
- Pages created with [id] directory like scoreBoard provides **dynamic routing** using **queries**.

### Functions in Server
#### index.js
- `app.use('/api/{path}', require('./routes/{path}'))`
  - By using the router, the structure of the server has been **simplified and easily scalable**.
- `mongoose.connect()`
  - Connect Node.js server & MongoDB

#### routes/{path}.js
- `router.post()`
  - Post CRUD-related requests to MongoDB.

#### model/{schema}.model.js
- `mongoose.model("{Name}", {name}Schema)`
  - Specify the structure and conditions of the information to be stored in the DB.

# Main Challenge 🔥

## Work in Collaboration

### Challenge
- Lack of **collaborative development experience**.
  - Expressing what we want about codes in words was difficult.
  - Distributing works among team members was not efficient initially.
- Difficulty in **communication** between team members.
  - Lack of uniformity among team members' codes.

### How to Overcome
- Re-divided our tasks
  - Maker flow, Solver flow, Database, and CSS(design).
- Set Development rules
  - In **commit messages**, **division of branch**, and **pull requests**
  - Try to understand others' codes and improve `communication quality`.
- Using collaboration tools
  - Figma, Miro, and Notion for works other than development
  - Fully understood what each member said by `visualizating screen(GUI)` and `diagrams`.

## Libraries & Frameworks

### Challenge
- Lack of libraries and frameworks experience
  - Dealing with `dynamic routing` in Next.js.
  - Understanding concept of `SSR` and `SSG` in Next.js.
  - Understanding and utilizing `Grid` in Material-UI.

### How to Overcome
- Sharing contents that learned newly or applied to the code
  - Share the reference links or videos.
  - Try to understand the `philosophy` and `patterns` of libraries and frameworks.
- Sharing built codes regularly
  - Tried to fully understand features of functions in each frameworks with two weekly team meetings.

## User Interfaces

### Challenge
- Hard to modify code neatly with desired UI.
  - As UI was changed, we needed to modify code structures. 
  - To implement immediate feedback on users' actions without errors for better UX was difficult.

### How to Overcome
- Make `consistent` and `resuable` UI for high utilization.
- Rather than js file, modifying css to make visual variations of components.

# What We Learned 🧑‍💻

## Work in Collaboration
- Define overall `structure` and `flow` in application makes efficient progress
- Importance of `sharing progress`
  - Set Development rules
  - Review team member's code
- Importance of `visualization`
  - Visualize material (flowchart or GUI) so that we can look in the same direction.

## Libraries / Frameworks / Tools
- Libraries and frameworks have their philosophy.
- Have to choose a framework that fits the concept of project.
  - Facilitate high `scalability` and `maintenance`.

### Details
- React
   - Designed to `separate` and `synthesize` components to maximize the reusability.
   - Write code `concisely` using React hooks.
- Next.js
   - Easy to develop separate pages and components.
   - Easy to implement `dynamic routing`.
   - Easy to implement with `SSR` and `SSG` for `SEO`.
   - Provides functions related to `router` and `image`.
- Material UI
   - `Easily implement UI` without writing css one by one.
   - MUI's sx option allows to insert the specific css.
- Mongo DB
   - Can store many different forms of data.
   - MongoDB has a good `scalability` and `flexibility`.
- Vercel & Heroku
   - `Easy to deploy` of client and server

# Issue and Known Bug 🐞
- We implement our application with `React Hooks`
  - But, Next.js unsupport some React Hooks.
  - So, we initialize contextAPI's value with query.
  - You can see this information in [here](https://nextjs.org/docs/advanced-features/react-18/server-components#unsupported-nextjs-apis)

# References 🌿

### Work in Collaboration
- [What is Good Commit?](https://blog.ull.im/engineering/2019/03/10/logs-on-git.html)

### React
- React Hooks
  - [useContext Hook](https://ko.reactjs.org/docs/context.html)
  - [useEffect Hook](https://ko.reactjs.org/docs/hooks-effect.html)
  - [useState Hook](https://ko.reactjs.org/docs/hooks-state.html)
- State Management
  - [Context API vs Redux vs React Query](https://mingule.tistory.com/74)

### Next.js
- Documentation
  - [Next.js Documentation](https://nextjs.org/docs/getting-started)
- Features of Next.js
  - [44Bits YouTube](https://www.youtube.com/watch?v=jg2ha2RIWN0&ab_channel=44BITS)
  - [코딩앙마 YouTube](https://www.youtube.com/watch?v=Ujjdn2wMIew&list=PLZKTXPmaJk8Lx3TqPlcEAzTL8zcpBz7NP&ab_channel=%EC%BD%94%EB%94%A9%EC%95%99%EB%A7%88)
  - [데브리 YouTube](https://www.youtube.com/watch?v=pdWQvfQBSGg&ab_channel=%EB%8D%B0%EB%B8%8C%EB%A6%AC)
- CSR, SSR, and SSG
  - [NAVER - What is SSR](https://d2.naver.com/helloworld/7804182)
  - [SSR & SSG](https://velog.io/@longroadhome/FE-SSRServer-Side-Rendering-%EA%B7%B8%EB%A6%AC%EA%B3%A0-SSGStatic-Site-Generation-feat.-NEXT%EB%A5%BC-%EC%A4%91%EC%8B%AC%EC%9C%BC%EB%A1%9C)
- Resolving Error 
  - [React Hydration Error](https://nextjs.org/docs/messages/react-hydration-error)

### Material UI
- [MUI Documentation](https://mui.com/material-ui/getting-started/overview/)

### Node.js
- Connect Node.js Server and MongoDB
  - [John Ahn YouTube](https://www.youtube.com/watch?v=fM0Vj7dBcm8&list=PL9a7QRYt5fqnlSRu--re7N_1Ean5jFsh3&index=4&ab_channel=JohnAhn)
  - [run_dev_aiden Tech Blog](https://velog.io/@run_dev_aiden/MongoDB-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0)

### Axios
  - [Ajax vs Axios vs fetch](https://velog.io/@kysung95/%EA%B0%9C%EB%B0%9C%EC%83%81%EC%8B%9D-Ajax%EC%99%80-Axios-%EA%B7%B8%EB%A6%AC%EA%B3%A0-fetch)

### Heroku
  - [Deploy Node.js Server with Heroku](https://rkdvnfma90.tistory.com/224)

### UI design & CSS
  - [Bauhaus pattern generator](https://dribbble.com/shots/15187819-bauhaus-pattern-generator)