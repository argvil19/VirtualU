import React, { PropTypes, Component }    from 'react';
// import http from 'http';

import { connect }                          from 'react-redux';
import { GridList, GridTile } from 'material-ui/GridList';

import { loadCoursesFromDB } from '../../redux/actions/userActions';

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
    this.props.dispatch(loadCoursesFromDB());
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
