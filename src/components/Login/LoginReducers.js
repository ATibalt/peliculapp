export const emailReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        ...state,
        value: action.val,
        isValid: action.val.includes('@')
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        wasTouched: true
      };
    default:
      throw new Error();
  }
};

export const emailConfReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        ...state,
        value: action.val.emailConf,
        isValid: action.val.emailConf === action.val.emailInput
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        wasTouched: true
      };
    default:
      throw new Error();
  }
};

export const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        ...state,
        value: action.val,
        isValid: action.val.trim().length > 6
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        wasTouched: true
      };
    default:
      throw new Error();
  }
};

export const passwordConfReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        ...state,
        value: action.val.passwordConf,
        isValid: action.val.passwordConf === action.val.passwordInput
      };
    case 'INPUT_BLUR':
      return {
        ...state,
        wasTouched: true
      };
    default:
      throw new Error();
  }
};
