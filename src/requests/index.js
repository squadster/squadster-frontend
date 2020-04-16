import gql from  'graphql-tag'

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
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
      squadMember {
        role
        queueNumber
        squad {
          id
          advertisment
          classDay
          squadNumber
          requests {
            id
            approvedAt
            user {
              id
              firstName
              lastName
              faculty
              smallImageUrl
              vkUrl
            }
          }
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

const GET_SQUADS = gql`
  {
    squads {
      id
      squadNumber
      members {
        role
        user {
          lastName
          firstName
        }
      }
      requests {
        id
        user {
          id
        }
      }
    }
  }
`

const DELETE_SQUAD_REQUEST = gql`mutation deleteSquadRequest($id: Int) {
  deleteSquadRequest(
    id: $id
  ) {
    id
  }
}`

const CREATE_SQUAD_REQUEST = gql`mutation createSquadRequest($squadId: Int) {
  createSquadRequest(
    squadId: $squadId
  ) {
    id
  }
}`

const APPROVE_SQUAD_REQUEST = gql`mutation approveSquadRequest($id: Int) {
  approveSquadRequest(
    id: $id
  ) {
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
}`

export { GET_CURRENT_USER, GET_SQUADS, UPDATE_ADVERTISMENT, APPROVE_SQUAD_REQUEST, DELETE_SQUAD_MEMBER, UPDATE_SQUAD_MEMBER, DELETE_SQUAD_REQUEST, CREATE_SQUAD_REQUEST }

