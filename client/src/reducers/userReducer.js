export const initialState = null;
export const reducer = (state, action) => {
  if (action.type == "USER") {
    return action.payload;
  }
  if (action.type == "CLEAR") {
    return null;
  }
  return state;
};

// Basically reducers are there to manage state in an application. For instance, if a user writes something in an HTML input field, the application has to manage this UI state (e.g. controlled components).
// (state, action) => newState
// The reducer function is a pure function without any side-effects, which means that given the same input (e.g. state and action), the expected output (e.g. newState) will always be the same. This makes reducer functions the perfect fit for reasoning about state changes and testing them in isolation. You can repeat the same test with the same input as arguments and always expect the same output:

// expect(counterReducer(0)).to.equal(1); // successful test

// The action is normally defined as an object with a type property. Based on the type of the action, the reducer can perform conditional state transitions:

// const counterReducer = (count, action) => {
//   if (action.type === 'INCREASE') {
//     return count + 1;
//   }

//   if (action.type === 'DECREASE') {
//     return count - 1;
//   }

//   return count;
// };

// If the action type doesn't match any condition, we return the unchanged state. Testing a reducer function with multiple state transitions -- given the same input, it will always return the same expected output -- still holds true as mentioned before which is demonstrated in the following test cases:

// // successful tests
// // because given the same input we can always expect the same output
// expect(counterReducer(0, { type: 'INCREASE' })).to.equal(1);
// expect(counterReducer(0, { type: 'INCREASE' })).to.equal(1);

// // other state transition
// expect(counterReducer(0, { type: 'DECREASE' })).to.equal(-1);

// // if an unmatching action type is defined the current state is returned
// expect(counterReducer(0, { type: 'UNMATCHING_ACTION' })).to.equal(0);

// const counterReducer = (count, action) => {
//     switch (action.type) {
//       case 'INCREASE':
//         return count + 1;
//       case 'DECREASE':
//         return count - 1;
//       default:
//         return count;
//     }
//   };
