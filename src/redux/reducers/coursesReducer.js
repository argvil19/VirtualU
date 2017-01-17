export default function (state = [], action) {
  switch (action.type) {
    case 'NEW_COURSES':
      return action.courses;
    default:
      return state;
  }
}
