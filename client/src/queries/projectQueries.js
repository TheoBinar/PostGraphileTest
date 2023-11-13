import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjects {
    allProjects {
      nodes{
          id
          name
          status    
      }
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: Int!) {
    projectById(id: $id) {
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
`;

export { GET_PROJECTS, GET_PROJECT };
