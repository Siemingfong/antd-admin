import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  RecentSales,
  Comments,
  Completed,
} from './components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({
  avatar: app.user.avatar,
  username: app.user.username,
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  render() {
    const { dashboard, loading } = this.props
    const {
      numbers,
      recentSales,
      comments,
      completed,
    } = dashboard

    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <RecentSales data={recentSales} />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <ScrollBar>
                <Comments data={comments} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
