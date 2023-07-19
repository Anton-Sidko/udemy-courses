const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountReducer = function (state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case 'account/requestLoan':
      if (state.loan > 0) return state;

      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case 'account/payLoan':
      if (!state.loan || state.balance < state.loan) return state;

      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: '',
      };

    case 'account/convertingCurrency':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export const deposit = function (amount, currency) {
  if (currency === 'USD') {
    return { type: 'account/deposit', payload: amount };
  }

  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });

    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;

    // dispatch action
    dispatch({ type: 'account/deposit', payload: converted });
  };
};

export const withdraw = function (amount) {
  return { type: 'account/withdraw', payload: amount };
};

export const requestLoan = function (amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount: amount, purpose: purpose },
  };
};

export const payLoan = function () {
  return {
    type: 'account/payLoan',
  };
};

export default accountReducer;
