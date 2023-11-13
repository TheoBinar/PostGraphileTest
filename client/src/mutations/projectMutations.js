import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: String!
    $clientId: Int!
  ) {
    createProject(
     input: {project: { 
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    }}) {
        project {
          id
          name
          description
          status
          clientByClientId {
            id
            name
            email
            phone
          }
        }
    }
}
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    deleteProjectById(input: {id: $id}) {
      project {
        id
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: Int!
    $name: String!
    $description: String!
    $status: String!
  ) {
    updateProjectById(
        input: {
            projectPatch: {
              id: $id
              name: $name
              description: $description
              status: $status
            },
            id: $id
        }
    ) {
      project{
          id
          name
          description
          status
          clientByClientId {
            id
            name
            email
            phone
          }
      }
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
