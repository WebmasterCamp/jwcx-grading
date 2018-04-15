import React from 'react'
import {css} from 'react-emotion'
import {connect} from 'react-redux'
import {Link} from 'react-static'
import {Checkbox} from 'antd'

import Button from '../components/Button'
import Records from '../components/Records'

import {topCampersSelector} from '../ducks/campers.selector'

const fields = {
  number: {
    title: '　',
    width: 50,
    render: (text, record, index) => <code>{index + 1}</code>,
  },
  selected: {
    title: 'เลือก',
    render: () => <Checkbox />,
    width: 50,
  },
  id: {
    title: 'รหัสอ้างอิง',
    render: text => <small>{text}</small>,
  },
  totalScore: {
    title: 'คะแนนรวม 100',
    render: num => num && num.toFixed(2),
  },
  coreScore: {
    title: 'คะแนนกลาง 40',
    render: num => num && num.toFixed(2),
  },
  majorScore: {
    title: 'คะแนนสาขา 60',
    render: num => num && num.toFixed(2),
  },
  more: {
    title: 'ดูเพิ่มเติม',
    render: (text, record) => (
      <Link to={`/preview/${record.id}`}>
        <Button icon="export" />,
      </Link>
    ),
    width: 100,
  },
}

const alternateStyle = css`
  background: #dfe4ea;
`

const selectedStyle = css`
  background: #dfe4ea;
`

function highlightRows(record, index) {
  if (record.alternate) {
    return alternateStyle
  }

  if (record.selected) {
    return selectedStyle
  }
}

const CampersRecord = ({campers, ...props}) => (
  <Records
    fields={fields}
    maxWidth={130}
    rowClassName={highlightRows}
    rowKey="id"
    pagination={{pageSize: 30}}
    {...props}
  />
)

const mapStateToProps = state => ({
  data: topCampersSelector(state),
})

const enhance = connect(mapStateToProps)

export default enhance(CampersRecord)
