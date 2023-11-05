import{j as e}from"./jsx-runtime-ffb262ed.js";import{M as i}from"./index-3487d5dd.js";import{u as r}from"./index-a1cf9e47.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-3fe02b9c.js";import"../sb-preview/runtime.js";import"./chunk-H6ZRF7XV-146ce0bc.js";import"./index-d475d2ea.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./index-d893ea64.js";import"./assert-a1982797.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function s(t){const n=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",a:"a",h2:"h2",ol:"ol",pre:"pre",code:"code",h3:"h3",h4:"h4",blockquote:"blockquote"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{name:"Notes/Client State/Redux",title:"Notes/Client State/Redux"}),`
`,e.jsx(n.h1,{id:"redux",children:"Redux"}),`
`,e.jsx(n.p,{children:"Nov 5, 2023"}),`
`,e.jsx("hr",{}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://redux.js.org/introduction/getting-started",target:"_blank",rel:"nofollow noopener noreferrer",children:"Redux"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow",target:"_blank",rel:"nofollow noopener noreferrer",children:"Redux Core Concepts"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://redux-toolkit.js.org/introduction/getting-started",target:"_blank",rel:"nofollow noopener noreferrer",children:"Redux Toolkit"})}),`
`]}),`
`,e.jsx(n.h2,{id:"table-of-contents",children:"Table of contents"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#overview",children:"Overview"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#one-way-data-flow",children:"One-Way Data Flow"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#actions",children:"Actions"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#reducers",children:"Reducers"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#selectors",children:"Selectors"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#optimizing-selectors-with-memoization",children:"Optimizing Selectors with Memoization"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#slice",children:"Slice"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#middleware",children:"Middleware"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#redux-thunk-middleware",children:"Redux Thunk Middleware"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#async-thunk",children:"Async Thunk"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#store-normalization",children:"Store Normalization"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#rtk-query",children:"RTK Query"})}),`
`]}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(n.p,{children:"Redux is a library for managing client application state using a global store with a variation of a pub/ sub pattern."}),`
`,e.jsx(n.p,{children:`The store is intended to be a single source of truth: a singular place where any bit of data exists only once, as well as the only place
where state can be updated or read from.`}),`
`,e.jsx(n.p,{children:"View components are only allowed to dispatch events (what occurred in the UI) and are not permitted to update state directly."}),`
`,e.jsx(n.p,{children:"Redux is most useful in cases where:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"You have large amounts of application state that are needed in many places in the app."}),`
`,e.jsx(n.li,{children:"The app state is updated frequently."}),`
`,e.jsx(n.li,{children:"The logic to update that state may be complex."}),`
`,e.jsx(n.li,{children:"The app has a medium or large-sized codebase, and might be worked on by many people."}),`
`,e.jsx(n.li,{children:"You need to see how that state is being updated over time."}),`
`]}),`
`,e.jsx(n.h2,{id:"one-way-data-flow",children:"One-Way Data Flow"}),`
`,e.jsx(n.p,{children:"One-way data flow is a fundamental concept of redux in which data always flows in a unidirectional cycle like so:"}),`
`,e.jsx("p",{align:"center",children:e.jsx("a",{href:"https://github.com/JonnyPickard/JonnyPickard.github.io",children:e.jsx("img",{src:"./src/assets/diagrams/ReduxDataFlowDiagram.gif",alt:"Redux Data Flow",width:"320px"})})}),`
`,e.jsx(n.p,{children:"Using the above diagram:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"The view component (UI) subscribes to the store enabling it to:"}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Request the data it requires (bank balance: $0).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"When the bank balance changes the view component recieves the new balance then rerenders."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Dispatch events back to the store."}),`
`]}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsx(n.li,{children:"The user deposits $10 using the UI:"}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ah action is constructed (An object containing event data)."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`const depositAction = {
  type: "bank/deposit",
  payload: 10,
};
`})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsx(n.li,{children:"The action is then dispatched back to the store which decides how to update it's state."}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Current bank balance: $0"})," + ",e.jsx(n.code,{children:"$10"})," = ",e.jsx(n.code,{children:"New bank balance: $10"})]}),`
`]}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsxs(n.li,{children:["The UI will recieve the updated bank balance of ",e.jsx(n.code,{children:"$10"})," and rerender accordingly."]}),`
`]}),`
`,e.jsx(n.h2,{id:"actions",children:"Actions"}),`
`,e.jsxs(n.p,{children:["An ",e.jsx(n.code,{children:"Action"})," is a javascript object that has a type field."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Action object can have other fields containing additional information about what happened."}),`
`,e.jsxs(n.li,{children:["The additional data by convention is put in a field called ",e.jsx(n.code,{children:"payload"}),"."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const addTodoAction = {
  type: "todos/todoAdded",
  payload: "Buy milk",
};
`})}),`
`,e.jsx(n.h2,{id:"reducers",children:"Reducers"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.code,{children:"Reducer"})," is a function that receives the current ",e.jsx(n.code,{children:"state"})," and an ",e.jsx(n.code,{children:"action"}),` object, then decides
how to update state if necessary.`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The store registers the reducer functions on initialisation/ configuration."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const store = configureStore({ reducer: counterReducer });
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["They must only calculate the ",e.jsx(n.code,{children:"new state"})," value based on the ",e.jsx(n.code,{children:"current state"})," + ",e.jsx(n.code,{children:"action"})]}),`
`,e.jsxs(n.li,{children:["They are not allow to modify existing state. They must make ",e.jsx(n.code,{children:"immutable updates"})," by copying the existing state."]}),`
`,e.jsxs(n.li,{children:["They must not do any ",e.jsx(n.code,{children:"async logic"})," or cause ",e.jsx(n.code,{children:"side effects"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"selectors",children:"Selectors"}),`
`,e.jsx(n.p,{children:"A function used to extract specific pieces of data from the store."}),`
`,e.jsx(n.p,{children:"They are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Reusable: a single way to access same piece of derived data across different locations in the view."}),`
`,e.jsx(n.li,{children:"Maintainable: they decouple components from the store structure allowing for easier testing."}),`
`]}),`
`,e.jsx(n.p,{children:"Basic example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import React from "react";
import { useSelector } from "react-redux";

export const TodoListItem = (props) => {
  const todo = useSelector((state) => state.todos[props.id]);
  return <div>{todo.text}</div>;
};
`})}),`
`,e.jsx(n.p,{children:"However, it makes more sense to define selectors as reusable functions in case:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Multiple components need to access the same piece of state."}),`
`,e.jsx(n.li,{children:"If you change the store structure, you then only need to modify the selector."}),`
`]}),`
`,e.jsx(n.p,{children:"Because of this, it's often a good idea to define reusable selectors directly inside slice files, rather than always defining them inside of a component."}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"optimizing-selectors-with-memoization",children:"Optimizing Selectors with Memoization"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization",target:"_blank",rel:"nofollow noopener noreferrer",children:"Optimizing Selectors with Memoization"})}),`
`,e.jsx(n.h4,{id:"context",children:"Context"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Selectors used with ",e.jsx(n.code,{children:"useSelector"})," or ",e.jsx(n.code,{children:"mapState"})," will be re-run after every dispatched action."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useSelector"})," and ",e.jsx(n.code,{children:"mapState"})," use the ",e.jsx(n.code,{children:"==="}),` reference equality check on the selectors return values to determine if the component
needs to rerender.`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// Example 1. Forever rerendering.
function TodoList() {
  const completedTodos = useSelector((state) =>
    state.todos.map((todo) => todo.completed)
  );
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Example 1. As the map function always returns a new array the reference equality check ",e.jsx(n.code,{children:"==="})," will fail & the component will therefor rerender on each dispatched action!"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// Example 2. Expensive filtering.
function ExampleComplexComponent() {
  const data = useSelector((state) => {
    const initialData = state.data;
    const filteredData = expensiveFiltering(initialData);

    return filteredData;
  });
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Example 2. This expensive logic will be rerun after every dispatched action when, theoretically, it would ever need to rerun if state.data changes."}),`
`]}),`
`,e.jsx(n.h4,{id:"solution",children:"Solution"}),`
`,e.jsxs(n.p,{children:["We can use a form of caching called ",e.jsx(n.code,{children:"Memoization"}),` to decide whether the function needs to be rerun.
`,e.jsx(n.code,{children:"Memoization"}),` works by storing the inputs and results of a function when it is first called.
If the function inputs are the same on subsequent calls it will skip the function call and return the cached return value.
If the function inputs change it will rerun the function and store the new inputs and return values to enable memoizing subsequent calls`]}),`
`,e.jsxs(n.p,{children:["The most common pattern for memoizing selectors is using a library called ",e.jsx(n.a,{href:"https://github.com/reduxjs/reselect",target:"_blank",rel:"nofollow noopener noreferrer",children:"Reselect"}),"."]}),`
`,e.jsxs(n.p,{children:["Reselect exports a ",e.jsx(n.a,{href:"https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc-selectoroptions",target:"_blank",rel:"nofollow noopener noreferrer",children:"createSelector"})," API, which generates memoized selector functions."]}),`
`,e.jsxs(n.p,{children:["If the selector created with ",e.jsx(n.code,{children:"createSelector"})," is called again with the same arguments, the previously cached result is returned instead of recalculating a new result."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// Create selector accepts one or more \`input\` selectors.
// and an output selector which recieves the results of the input selectors and returns a derived value.
// An output selector should always contain some transformation logic!
const selectUsersOver30 = createSelector(
  // Input selector
  (state) => state.usersList,
  // Output selector
  (usersList) => usersList.filter((user) => user.age > 30)
);
`})}),`
`,e.jsx(n.h2,{id:"slice",children:"Slice"}),`
`,e.jsxs(n.p,{children:[`A function that accepts an initial state, an object of reducer functions, and a "slice name",
and `,e.jsx(n.code,{children:"automatically generates action creators and action types"})," that correspond to the reducers and state."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState = { value: 0 } as CounterState;

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
`})}),`
`,e.jsx(n.h2,{id:"middleware",children:e.jsx(n.a,{href:"https://redux.js.org/understanding/thinking-in-redux/glossary#middleware",target:"_blank",rel:"nofollow noopener noreferrer",children:"Middleware"})}),`
`,e.jsx(n.p,{children:"Redux Middleware is higher order function that composes a dispatch function to return a new dispatch function."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`type Middleware = ({ dispatch: Dispatch; getState: () => State }) => (next: Dispatch) => Dispatch;
`})}),`
`,e.jsx("p",{align:"center",children:e.jsx("a",{href:"https://github.com/JonnyPickard/JonnyPickard.github.io",children:e.jsx("img",{src:"./src/assets/diagrams/ReduxAsyncDataFlowDiagram.gif",alt:"Redux Data Flow Async",width:"320px"})})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"Example middleware that makes an api request."}),`
`]}),`
`,e.jsx(n.p,{children:"It's mainly used for writing logic that has side effects such as logging, routing and asynchronous api calls."}),`
`,e.jsxs(n.p,{children:["Middleware is composable using ",e.jsx(n.a,{href:"https://redux.js.org/api/compose",target:"_blank",rel:"nofollow noopener noreferrer",children:"function composition"}),`: a technique in which you combine two or more functions to produce a new function.
The idea is to take the output of one function and use it as the input for another.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// 1. slice(bread)
// 2. toast(slicedBread)
// 3. spreadButter(slicedToast)
// 4. addJam(butteredToast)

const makeSandwich = (bread) => addJam(spreadButter(toast(sliceBread(bread))));

makeSandwich("Sourdough Loaf");
`})}),`
`,e.jsx(n.h3,{id:"redux-thunk-middleware",children:e.jsx(n.a,{href:"https://redux.js.org/usage/writing-logic-thunks",target:"_blank",rel:"nofollow noopener noreferrer",children:"Redux Thunk Middleware"})}),`
`,e.jsx(n.p,{children:'The word "thunk" is a programming term that means "a piece of code that does some delayed work".'}),`
`,e.jsx(n.p,{children:"Redux Thunk is middleware for redux that allows you to dispatch functions instead of actions."}),`
`,e.jsx(n.p,{children:"A thunk function may contain any arbitrary logic, sync or async, and can call dispatch or getState at any time."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`const thunkFunction = (dispatch, getState) => {
  // logic here that can dispatch actions or read state
};

store.dispatch(thunkFunction);
`})}),`
`,e.jsx(n.p,{children:`For consistency with dispatching normal action objects, we typically write these as thunk action creators, which return the thunk function.
These action creators can take arguments that can be used inside the thunk.`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`const depositFunds = (amount) => {
  return (dispatch, getState) => {
    const balanceBefore = getState().balance;
    dispatch(incrementByAmount(amount));
    const balanceAfter = getState().balance;
  };
};

store.dispatch(depositFunds(10));
`})}),`
`,e.jsx(n.h3,{id:"async-thunk",children:"Async Thunk"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://redux.js.org/usage/writing-logic-thunks#using-createasyncthunk",target:"_blank",rel:"nofollow noopener noreferrer",children:"Using Async Thunk"})}),`
`,e.jsxs(n.p,{children:[`Because writing async logic with thunks can be tedious (you have to write logic to handle pending/ fulfilled/ rejected states)
Redux toolkit has a special thunk api for handling async logic: `,e.jsx(n.code,{children:"createAsyncThunk"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"createAsyncThunk"})," is a function that accepts a Redux action type string and a callback function that should return a promise."]}),`
`,e.jsx(n.p,{children:"The Async Thunk api will then automatically generate & dispatch actions based on the promise status returned by the callback function."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// todosSlice.js

export const saveNewTodo = createAsyncThunk(
  "todos/saveNewTodo",
  async (text) => {
    const initialTodo = { text };
    const response = await client.post("/fakeApi/todos", { todo: initialTodo });
    return response.todo;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // omit reducer cases
  },
  // The extraReducers allows you to respond to an action in your slice reducer but does not create an action creator function.
  extraReducers: (builder) => {
    builder
      .addCase(saveNewTodo.pending, (state, action) => {
        state.status = "saving";
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload.newTodo];
        state.status = "save successful";
      });
  },
});
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// NewTodoForm.js

const handleSubmit = async () => {
  await dispatch(saveNewTodo(todoText));
};
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"saveNewTodo.pending"})," & ",e.jsx(n.code,{children:"saveNewTodo.fulfilled"}),` actions are automatically dispatched and are therefor able to be caught by the
todosSlice reducers.`]}),`
`,e.jsx(n.h2,{id:"store-normalization",children:e.jsx(n.a,{href:"https://redux.js.org/usage/structuring-reducers/normalizing-state-shape#designing-a-normalized-state",target:"_blank",rel:"nofollow noopener noreferrer",children:"Store Normalization"})}),`
`,e.jsx(n.p,{children:"When dealing with data that is relational or nested the resulting structure can end up rather complex & repeated in places."}),`
`,e.jsx(n.p,{children:"This presents various issues:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"When there is duplicate data across the store it becomes harder to make sure it's updated appropriately."}),`
`,e.jsx(n.li,{children:"Nested data means the corresponding reducer logic has to be more nested/ complicated and quickly becomes significantly more complicated to maintain."}),`
`,e.jsx(n.li,{children:`Since immutable data updates require all ancestors in the state tree to be copied and updated as well,
and new object references will cause connected UI components to re-render, an update to a deeply nested data object could force totally unrelated UI components to re-render even if the data they're displaying hasn't actually changed.`}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// 1. Unnormalized state

const blogPosts = [
  {
    id: "post1",
    author: { username: "user1", name: "User 1" },
    body: "......",
    comments: [
      {
        id: "comment1",
        author: { username: "user2", name: "User 2" },
        comment: ".....",
      },
      {
        id: "comment2",
        author: { username: "user3", name: "User 3" },
        comment: ".....",
      },
    ],
  },
];
`})}),`
`,e.jsx(n.p,{children:"The basic concepts of normalizing data are:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:'Each type of data gets its own "table" in the state.'}),`
`,e.jsx(n.li,{children:'Each "data table" should store the individual items in an object, with the IDs of the items as keys and the items themselves as the values.'}),`
`,e.jsx(n.li,{children:"Any references to individual items should be done by storing the item's ID."}),`
`,e.jsx(n.li,{children:"Arrays of IDs should be used to indicate ordering."}),`
`]}),`
`,e.jsxs(n.p,{children:["Here is an example of how you could normalize the ",e.jsx(n.code,{children:"blogPosts"})," state shape:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// 2. After Normalization

{
  posts: {
    byId: {
      post1: {
        id: "post1",
        author: "user1",
        body: "......",
        comments: ["comment1", "comment2"],
      },
    },
    allIds: ["post1"],
  },
  comments: {
    byId: {
      comment1: {
        id: "comment1",
        author: "user2",
        comment: ".....",
      },
      comment2: {
        id: "comment2",
        author: "user3",
        comment: ".....",
      },
    },
    allIds: ["comment1", "comment2"],
  },
  users: {
    byId: {
      user1: {
        username: "user1",
        name: "User 1",
      },
      user2: {
        username: "user2",
        name: "User 2",
      },
      user3: {
        username: "user3",
        name: "User 3",
      },
    },
    allIds: ["user1", "user2", "user3"],
  },
};
`})}),`
`,e.jsx(n.h2,{id:"rtk-query",children:e.jsx(n.a,{href:"https://redux-toolkit.js.org/rtk-query/overview",target:"_blank",rel:"nofollow noopener noreferrer",children:"RTK Query"})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"🚧 I think it's worth covering this in a separate post as theres a lot of in depth knowledge/ features."}),`
`]})]})}function y(t={}){const{wrapper:n}=Object.assign({},r(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(s,t)})):s(t)}export{y as default};
//# sourceMappingURL=Redux-8a1c930b.js.map
