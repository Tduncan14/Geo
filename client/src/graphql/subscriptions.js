import gql from 'graphql-tag';


export const PIN_ADDED_SUBSCRIPTION = gql `

Subscription {

    pinAdded{
        _id
        createdAt
        title 
        image
        content
        latitude
        longitude
        author {
          _id
          name
          email
          picture
        }
    }
}




`

export const PIN_UPDATED_SUBSCRIPTION = gql `

Subscription{

    pinUpdated {

        _id
        createdAt
        title
        content
        image
        latitude
        longitude
        author {
          _id
          name
        }
        comments {
          text
          createdAt
          author {
            name
            picture
          }
    }
}



`