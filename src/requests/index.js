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
        id
        role
        queueNumber
        squad {
          id
          advertisment
          classDay
          squadNumber
          linkInvitationsEnabled
          hashId
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
      linkInvitationsEnabled
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

const SET_SQUAD = gql`
  mutation createSquad($squad_number: String!, $class_day: Int!) {
    createSquad(squadNumber: $squad_number, classDay: $class_day) {
      advertisment
      classDay
      id
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

const UPDATE_SQUAD_MEMBERS = gql`mutation updateSquadMembers($members: SquadMembersBatch) {
  updateSquadMembers(
    batch: $members
  ) {
    id
  }
}`

const DELETE_SQUAD = gql(`mutation deleteSquad($id: Int) {
  deleteSquad(id: $id) { id }
}`)

const UPDATE_LINK_OPTION = gql`mutation updateSquad($id: Int, $linkOption: Boolean) {
  updateSquad(
    id: $id,
    linkInvitationsEnabled: $linkOption
  ) {
    linkInvitationsEnabled
  }
}`

export {
  GET_CURRENT_USER,
  GET_SQUADS,
  SET_SQUAD,
  UPDATE_ADVERTISMENT,
  APPROVE_SQUAD_REQUEST,
  DELETE_SQUAD_MEMBER,
  UPDATE_SQUAD_MEMBER,
  DELETE_SQUAD_REQUEST,
  CREATE_SQUAD_REQUEST,
  UPDATE_SQUAD_MEMBERS,
  DELETE_SQUAD,
  UPDATE_LINK_OPTION
}
