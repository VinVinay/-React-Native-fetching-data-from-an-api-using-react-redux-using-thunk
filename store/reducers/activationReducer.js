import { ACTIVATION_ON_SUCCESS, ACTIVATION_IN_PENDING } from '../../constants';

const initialState = {
  loading: false,
  activated: false
};

const activationReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTIVATION_IN_PENDING:
        return {
          ...state,
          loading: true,
          activated: false
        };
    case ACTIVATION_ON_SUCCESS:
      return {
        ...state,
        loading: false,
        activated: true
      };

    default:
      return state;
  }
}
export default activationReducer;

