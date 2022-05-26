export const initialState = 1;

export const COUNT_PLUS = 'COUNT_PLUS';
export const COUNT_MINUS = 'COUNT_MINUS';

export const countPlusAction = () => ({
    type: COUNT_PLUS
});

export const countMinusAction = () => ({
    type: COUNT_MINUS
})

const reducer = (state = initialState, action) => { // 리듀서
    switch (action.type) {  // 액션의 type이 COUNT_PLUS일땐 state에 + 1 COUNT_MINUS 일 땐 state에 -1
        case COUNT_PLUS:
            return state + 1;
        case COUNT_MINUS:
            return state - 1;
        default:
            return state;
    }
};

export default reducer;