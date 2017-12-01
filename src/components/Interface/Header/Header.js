import React, { Component } from 'react'
import styles from './header.module.scss'

import HeaderTopLine from './HeaderTopLine/HeaderTopLine.js'
import HeaderSubLine from './HeaderSubLine/HeaderSubLine.js'

export default class Header extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <HeaderTopLine />
        <HeaderSubLine />
      </div>
    )
  }
}
