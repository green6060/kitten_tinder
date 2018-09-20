import React, { Component } from 'react';
import { Header, Image, Card, Button, Icon  } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = { cats: [] }

  componentDidMount() {
    axios.get('/api/cats')
      .then( res => this.setState({ cats: res.data }) )
    }

    //Creates a random index, which is used as a parameter in the cats[] array
    sample = () => {
      const { cats } = this.state
      if (cats.length) {
        const index = Math.floor(Math.random() * cats.length)
        return cats[index]
      } else {
        return null
      }
    }

    //if downVote is called, passes in id, and sets the filter to EXCLUDE that id
    downVote = (id) => {
      let { cats } = this.state;
      this.setState({ cats: cats.filter( c => c.id !== id ) })
    }
    //if upvote is called, passes in id, and sets the filter to EXCLUDE that id
    upvote = (id) => {
      let { cats } = this.state;
      axios.put(`/api/cats/${id}`)
        .then( () => this.setState({ cats: cats.filter( c => c.id !== id ) }) )
    }

    render() {
      const cat = this.sample()
      if (cat) {
        return(
          <div>
            <Card key={cat.id}>
              <Image src={cat.avatar} />
              <Card.Content>
                <Card.Header>
                  {cat.name}
                </Card.Header>
                <Card.Description>
                  {cat.breed}
                </Card.Description>
                <Card.Meta>
                  {cat.registry}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
              <Button basic onClick={() => this.upvote(cat.id)}>
                <Icon name="thumbs up" />
              </Button>
                <Button basic onClick={() => this.downVote(cat.id)}>
                  <Icon name="thumbs down" />
                </Button>
              </Card.Content>
            </Card>
            <Link to="/my_cats">My Cats</Link>
          </div>
        );
      } else {
        return <Header textAlign="center">No More Cats</Header>
      }
    }
}

export default Home;