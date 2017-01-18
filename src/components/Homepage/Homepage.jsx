import React, { PropTypes, Component }    from 'react';
import http from 'http';
import { connect }                          from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';

import { loadCourses } from '../../redux/actions/userActions';

const propTypes = {
  title: PropTypes.string,
  dispatch: PropTypes.func,
  courses: PropTypes.array
};

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    // width: 500,
    height: 450,
    overflowY: 'auto'
  }
};

const defaultProps = { title: 'This is homepage of project HVU!' };

class Homepage extends Component {
  componentDidMount() {
    const options = {
      host: window.location.hostname,
      port: window.location.port,
      method: 'GET',
      path: '/API/courses'
    };
    const req = http.request(options, res => {
      let str = '';
      res.on('data', chunk => {
        str += chunk;
      }).on('end', () => {
        this.props.dispatch(loadCourses(JSON.parse(str).data));
      });
    });
    req.end();
    req.on('error', e => {
      console.log(`error:${e.message}`);
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div style={styles.root} >
          <GridList
            cols={4}
            cellHeight={180}
            style={styles.gridList}
          >
            {this.props.courses.map((course) =>
              <GridTile
                key={course.name}
                title={course.name}
              >
                <img src={course.courseImage.secure_url} />
              </GridTile>
            )}
          </GridList>
        </div>
      </div>
    );
  }
}

Homepage.propTypes = propTypes;
Homepage.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

export default connect(mapStateToProps)(Homepage);
