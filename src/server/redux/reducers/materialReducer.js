import {
  REQUEST_COURSE_MATERIAL,
  RECEIVE_COURSE_MATERIAL,
  ERROR_COURSE_MATERIAL
} from '../actions/mediaActions';

const initialState = {
  materials: [],
  videos: [],
  error: null,
  loaded: false,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_COURSE_MATERIAL:
      return {
        ...state,
        loading: true
      };

    case RECEIVE_COURSE_MATERIAL:
      return {
        ...state,
        loading: false,
        loaded: true,
        materials: action.mediaType === 'PDF' ? action.payload : state.materials.materials,
        videos: action.mediaType === 'Video' ? action.payload : state.materials.videos
      };

    case ERROR_COURSE_MATERIAL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
