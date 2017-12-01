import React, { Component } from 'react'

import Header from '@src/components/Interface/Header/Header'
import LeftSideBar from '@src/components/Interface/LeftSideBar/LeftSideBar'
import RightSideBar from '@src/components/Interface/RightSideBar/RightSideBar'

import styles from './interfaceStyles.module.scss'

export default class Interface extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <LeftSideBar />
        <Header />
        <RightSideBar />
      </div>
    )
  }
}
