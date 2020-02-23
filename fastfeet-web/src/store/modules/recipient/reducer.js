import { produce } from 'immer';

const INITIAL_VALUE = {
  name: null,
  addressLine: null,
  addressLineTwo: null,
  number: null,
  cityState: null,
  street: null,
  id: null,
  city: null,
  zipCode: null,
  recipients: [],
};

export default function recipient(state = INITIAL_VALUE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipient/SAVE_SUCCESS': {
        const {
          name,
          addressLine,
          addressLineTwo,
          number,
          street,
          id,
          city,
          zipCode,
        } = action.payload;

        draft.name = name;
        draft.addressLine = addressLine;
        draft.addressLineTwo = addressLineTwo;
        draft.number = number;
        draft.cityState = action.payload.state;
        draft.street = street;
        draft.city = city;
        draft.zipCode = zipCode;
        draft.id = id;
        break;
      }
      case '@recipient/LOAD_SUCCESS': {
        draft.recipients = action.payload;
        break;
      }
      default:
        break;
    }
  });
}
