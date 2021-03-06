import React from 'react';
import { Segment, Container, Header, Button, Icon, Transition } from 'semantic-ui-react';

class Home extends React.Component {
  state = {visible: false};

  componentDidMount() {
    this.setState({
      visible: true
    })
    console.log('mounting');
  }

  componentDidUpdate() {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <Transition visible={this.state.visible} animation='fade up' duration={1500}>
        <Segment textAlign='center' vertical style={{ minHeight: 700, padding: '1em 0em' }}> 
          <Container text>
            {this.props.user && (
              <Header
                as='h1'
                content={`Welcome ${this.props.user}`}
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
              />
            )}
            {!this.props.user && ([
              <Header
                as='h1'
                content='Fitbud'
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
              />,
              <Header
                as='h2'
                content='Life is better with a buddy.'
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />,
              <Button primary size='huge'>
                Get Started
                <Icon name='right arrow' />
              </Button>
            ])}
          </Container>
        </Segment>
      </Transition>)
  }
}


export default Home;