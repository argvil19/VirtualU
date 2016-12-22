const initialState = {
  items: [
    {
      label: 'Home',
      url: '/',
      icon: 'home'
    },
    {
      label: 'Lessons',
      url: '/lessons',
      icon: 'library_books'
    },
    {
      label: 'Quizes',
      url: '/quizes',
      icon: 'assignment_turned_in'
    },
    {
      label: 'About',
      url: '/about',
      icon: 'description'
    }
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
