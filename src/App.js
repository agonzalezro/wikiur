import React, { Component } from 'react'
import Header from './Header'
import WarningAboutURLSharing from './WarningAboutURLSharing'
import NoContent from './NoContent.js'
import Wiki from './Wiki'
import Form from './Form'

class App extends Component {
  state = {
    wiki: {
      items: [],
    },
  }

  setStateAndPushState = wiki => {
    this.setState(wiki)
    window.history.pushState({}, null, btoa(JSON.stringify(this.state.wiki)))
  }

  removeItem = indexToDelete => {
    const { wiki } = this.state
  
    wiki.items = wiki.items.filter((item, _) => {
       return item.id !== indexToDelete
    })

    this.setStateAndPushState(wiki)
  }

  handleSubmit = item => {
    const { wiki } = this.state

    if (wiki.items.length === 0) {
      item.id = 1
    } else {
      item.id = wiki.items[wiki.items.length-1].id + 1
    }
    wiki.items.push(item)

    this.setStateAndPushState(wiki)
  }

  componentDidMount() {
    const pathname = window.location.pathname
      .replace("/wikifromlink", "") // TODO: Probably there is a better way, let me know if you know it
    const encodedWiki = (pathname[0] === "/") ? pathname.substring(1) : pathname

    if (encodedWiki.length > 0) {
      this.setState({
        wiki: JSON.parse(atob(encodedWiki))
      })
    }
  }

  render() {
    const { wiki } = this.state
    // const { characters } = this.state

    return (
      <div className="container">
        <Header />
        <WarningAboutURLSharing />
        <NoContent items={wiki.items} />
        <Wiki items={wiki.items} removeItem={this.removeItem}/>
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App
