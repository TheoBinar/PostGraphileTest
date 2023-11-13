import { gql } from '@apollo/client';

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    createClient(input: {client: {name: $name, email: $email, phone: $phone}}) {
        client {
          id
          name
          email
          phone
        }
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: Int!) {
    deleteClientById(input: {id: $id}) {
        client {
          id
          name
          email
          phone   
        }
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT };
