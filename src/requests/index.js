import gql from  'graphql-tag'

const GET_USER_SQUAD = gql`
  query getUserSquad($id: ID!) {
    user(id: $id) {
      squadMember {
        role
        queueNumber
        squad {
          advertisment
          classDay
          squadNumber
          members {
            role
            queueNumber
            user {
              firstName
              lastName
              mobilePhone
              faculty
              university
              imageUrl
              smallImageUrl
              vkUrl
              birthDate
            }
          }
        }
      }
    }
  }
`

export { GET_USER_SQUAD }