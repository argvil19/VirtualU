import React, { PropTypes, Component } from 'react';
import { fetchCourseMaterial } from '../../redux/actions/mediaActions';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { FontIcon } from 'material-ui';
import YouTube from 'react-youtube';
import './Materials.css';
// import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
  dispatch: PropTypes.func,
  routeParams: PropTypes.object,
  courses: PropTypes.object
};

function extractYouTubeID(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
}

class Material extends Component {
  componentWillMount() {
    const type = this.props.routeParams.mediaType;

    this.props.dispatch(fetchCourseMaterial({
      courseName: this.props.routeParams.name,
      chapterName: this.props.routeParams.chapter,
      fileType: type === 'videos' ? 'Video' : 'PDF'
    }));
  }

  renderFiles() {
    let toReturn;

    if (this.props.routeParams.mediaType === 'videos') {
      const videos = this.props.courses.videos;

      if (videos && !this.props.courses.error) {
        const opts = {
          height: '290',
          width: '550',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          }
        };

        toReturn = videos.map((item, index) => {
          const last = index === videos.length - 1;

          return (
            <div key={index}>
              <ListItem>
                <h4>{item.name}</h4>
                <YouTube
                  videoId={extractYouTubeID(item.youtubeLink)}
                  opts={opts}
                />
                <p>{item.description}</p>
              </ListItem>
              {!last && <div className='videoDivider'><Divider /></div>}
            </div>
          );
        });
      } else {
        toReturn = <div>There was an error fetching the course videos</div>;
      }
    } else if (this.props.courses.materials && !this.props.courses.error) {
      toReturn = this.props.courses.materials.map((item, index) => (
        <ListItem
          key={index}
          hoverColor='#ddd'
          leftAvatar={
            <Avatar icon={<FontIcon className='material-icons' style={{ color: '#fff' }}>picture_as_pdf</FontIcon>} />}
        >
          <a href={item.file.url}>{item.name}</a>
        </ListItem>
      ));
    } else {
      toReturn = <div>There was an error fetching the course material</div>;
    }

    return toReturn;
  }

  render() {
    const title = this.props.routeParams.mediaType === 'videos' ? 'Videos' : 'Materials';

    return (
      <div>
        <h1>Course {title}</h1>
        <Divider/>
        <List>
          {this.renderFiles()}
        </List>
      </div>
    );
  }
}

Material.propTypes = propTypes;

function mapStateToProps(state) {
  const user = state.user;
  const userAgent = state.theme.userAgent;
  const menu = state.menu.items;
  const courses = {
    ...state.courses,
    ...state.quizzes,
    ...state.materials
  };

  return {
    user,
    userAgent,
    menu,
    courses
  };
}

export default connect(mapStateToProps)(Material);
