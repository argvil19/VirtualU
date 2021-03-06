import React, { PropTypes, Component }    from 'react';
import { 
  fetchCourseQuiz,
  postSendQuiz
}                                         from '../../redux/actions/quizActions';
import { connect }                        from 'react-redux';
import TextField                          from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup }  from 'material-ui/RadioButton';
import Divider                            from 'material-ui/Divider';
import Checkbox                           from 'material-ui/Checkbox';
import { List, ListItem }                 from 'material-ui/List';
import CodeMirror                         from 'react-codemirror';
import CodeMirrorCSS                      from '../../../../node_modules/codemirror/lib/codemirror.css';
import RaisedButton                       from 'material-ui/RaisedButton';
import Upload                              from 'material-ui-upload/Upload';

import 'codemirror/mode/octave/octave';

const propTypes = {
  dispatch: PropTypes.func
};

class Assignment extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questions: []
    };
  }
  
  componentWillMount() {
    this.props.dispatch(fetchCourseQuiz({
      courseName: this.props.routeParams.name,
      chapterName: this.props.routeParams.chapter,
      isAssignment: true
    }));
  }

  renderQuestions() {
    const component = this;

    if (this.props.courses && this.props.courses.assignments) {
      return component.props.courses.assignments.map((item) => {
        switch (item.questionType) {
          case 'short answer':
            return component.renderShortAnswer(item);

          case 'multiple select':
            return component.renderMultipleSelect(item);

          case 'multiple choice':
            return component.renderMultipleChoice(item);

          case 'coding':
            return component.renderCodeQuestion(item);

          default:
            return <div>{'ERROR: question format error'}</div>;
        }
      });
    }
  }

  renderShortAnswer(item) {
    const component = this;
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <div>
          <TextField hintText='Type your answer here' onChange={(e, val) => {
            const toState = {}
            
            toState[item._id] = {
              questionId: item._id,
              questionType: item.questionType,
              answer: val
            };
            
            component.setState(toState);
          }}/>
        </div>
        {this.renderSendButton(item)}
        {this.renderDivider()}
      </div>
    );
  }

  renderMultipleChoice(item) {
    const component = this;
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <div>
          {component.renderSpace(20)}
          <RadioButtonGroup
            onChange={(e, val) => {
              const toState = {};
              toState[item._id] = {
                questionId: item._id,
                questionType: item.questionType,
                answer: val
              };
              component.setState(toState);
            }}
          >
            {item.questionOptionsChoice.map((choiceOption) => {
              return (
                <RadioButton
                  value={choiceOption}
                  label={choiceOption}
                />
              )}
            )}
          </RadioButtonGroup>
        </div>
        {this.renderSendButton(item)}
        {this.renderDivider()}
      </div>
    );
  }

  renderMultipleSelect(item) {
    const component = this;
    
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <div>
          <List>
            {item.questionOptionsSelect.map((selectOption) => {
              return (
                <ListItem
                  leftCheckbox={<Checkbox onCheck={(e, isChecked) => {
                    const checkedList = component.state[item._id]? component.state[item._id].answer : [];
                    const toState = {};
                    
                    if (isChecked) {
                      checkedList.push(selectOption);
                    } else {
                      checkedList.splice(checkedList.indexOf(selectOption), 1);
                    }
                    
                    toState[item._id] = {
                      questionId: item._id,
                      questionType: item.questionType,
                      answer: checkedList
                    };
                    
                    component.setState(toState);
                  }}/>}
                  primaryText={selectOption}
                />
              );
            })}
          </List>
        </div>
        {this.renderSendButton(item)}
        {this.renderDivider()}
      </div>
    );
  }

  renderCodeQuestion(item) {
    const component = this;

    return (
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: item.questionTitle }} />
        <div style={{ textAlign: 'center' }}>
          {item.isRandom? item.expectedResult : ''}
        </div>
        <CodeMirror value={component.state[item._id]? component.state[item._id].answer : ''} options={{ lineNumbers: true, mode: 'octave' }} onChange={(val) => {
          const toState = {};
          
          toState[item._id] = {
            questionId: item._id,
            questionType: item.questionType,
            answer: val
          };
          
          component.setState(toState);
        }}/>
        <Upload onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const toState = {};
                
            toState[item._id] = {
              questionId: item._id,
              questionType: item.questionType,
              answer: e.target.result
            };
                
            component.setState(toState);
          }
            
          reader.readAsText(file);
          }}
          fileTypeRegex={/.m/}
          title="Upload a Matlab file"
          label="Add"
          primary={true}
        />
        
        {this.renderSendButton(item)}
        {this.renderDivider()}
      </div>
    );
  }

  renderSendButton(sendInfo) {
    return (
      <div style={{ textAlign:'right' }}>
        <div>
          <p>{typeof sendInfo.isCorrect === 'boolean'? (sendInfo.isCorrect? 'Correct answer!' : 'Wrong answer!') : ''}</p>
        </div>
        <RaisedButton
          primary={true}
          label='Send'
          onClick={() => {
            this.props.dispatch(postSendQuiz({
              questionId: sendInfo._id,
              questionType: sendInfo.questionType,
              answer: this.state[sendInfo._id]? this.state[sendInfo._id].answer : '',
              isAssignment: true,
              answerFromClient: sendInfo.expectedResult
            }));
          }}
        />
      </div>

    );
  }

  renderDivider() {
    return <Divider style={{ marginTop: '50px', marginBottom: '50px' }} />;
  }
  
  renderSpace(px) {
    return <div style={{ marginBottom: px + 'px' }}></div>;
  }
  

  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        <h1>{'Assignments'}</h1>
        {this.renderDivider()}
        {this.renderQuestions()}
      </div>
    );
  }
}

Assignment.propTypes = propTypes;

function mapStateToProps(state) {
  const user = state.user;
  const userAgent = state.theme.userAgent;
  const menu = state.menu.items;
  const courses = {
    ...state.courses,
    ...state.quizzes
  };

  return {
    user,
    userAgent,
    menu,
    courses
  };
}

export default connect(mapStateToProps)(Assignment);
