import React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import styled from 'react-emotion'

import WebPreview from '../components/WebPreview'

import {getQuestions} from '../core/grading'

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 1.5em;
  background: white;

  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1.5px 1px;
  transition: all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);

  margin-bottom: 1.5em;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 9.5px 2px;
  }
`

const Question = styled.p`
  color: #666;
  font-size: 0.98em;

  white-space: pre-line;
  word-break: break-word;
  word-wrap: break-word;
`

const Answer = styled.p`
  color: #555;
  font-size: 1.28em;
  font-weight: bold;
  margin-bottom: 0;

  white-space: pre-line;
  word-break: break-word;
  word-wrap: break-word;
`

const coreFields = ['generalAnswer1', 'generalAnswer2', 'generalAnswer3']
const majorFields = ['majorAnswer1', 'majorAnswer2', 'majorAnswer3']

function getAnswer(data, role, index) {
  let field = majorFields[index]

  if (role === 'core') {
    field = coreFields[index]
  }

  return data[field]
}

const PreviewAnswer = ({data, role, index}) => {
  const answer = getAnswer(data, role, index)

  if (role === 'programming' && index === 2) {
    return (
      <div>
        <WebPreview src={answer} />
        <code>
          <pre>{answer}</pre>
        </code>
      </div>
    )
  }

  if (role === 'design' && index === 2) {
    return <img src={answer} />
  }

  return <Answer>{answer}</Answer>
}

const Grading = ({data, role}) => (
  <div>
    <h1>ตรวจคำถาม</h1>

    {getQuestions(role).map((item, index) => (
      <Card key={index}>
        <Question>
          {item.question} (Points: {item.max})
        </Question>
        <PreviewAnswer data={data} role={role} index={index} />
      </Card>
    ))}
  </div>
)

const entrySelector = createSelector(
  s => s.camper.campers,
  (s, p) => p.match.params.id,
  (entries, id) => {
    return entries.find(camper => camper.id === id)
  },
)

const mapStateToProps = (state, props) => ({
  role: state.user.role,
  data: entrySelector(state, props),
})

const enhance = connect(mapStateToProps)

export default enhance(Grading)
