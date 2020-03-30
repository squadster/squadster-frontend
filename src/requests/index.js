import gql from  'graphql-tag'

const GET_USER_SQUAD = gql`
  query getUserSquad($id: ID!) {
    user(id: $id) {
      squadMember {
        role
        queueNumber
        squad {
          id
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

const UPDATE_ADVERTISMENT = gql`mutation updateSquad($id: Int, $advertisment: String) {
  updateSquad(
    id: $id,
    advertisment: $advertisment
  ) {
    advertisment
  }
}`



export { GET_USER_SQUAD, UPDATE_ADVERTISMENT }

