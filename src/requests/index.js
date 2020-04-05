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
            id
            role
            queueNumber
            user {
              id
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

const DELETE_SQUAD_MEMBER = gql`mutation deleteSquadMember($id: Int) {
  deleteSquadMember(
    id: $id
  ){
    id
  }
}`

const UPDATE_SQUAD_MEMBER = gql`mutation updateSquadMember($id: Int, $role: String, $quequeNumber: Int) {
  updateSquadMember(
    id: $id,
    queueNumber: $quequeNumber,
    role: $role
  ) {
    id
  }
}`



export { GET_USER_SQUAD, UPDATE_ADVERTISMENT, DELETE_SQUAD_MEMBER, UPDATE_SQUAD_MEMBER }

