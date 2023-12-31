import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id: parseInt(id) } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.projectById.name}</h1>
          <p>{data.projectById.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.projectById.status}</p>

          <ClientInfo client={data.projectById.clientByClientId} />

          <EditProjectForm project={data.projectById} />

          <DeleteProjectButton projectId={data.projectById.id} />
        </div>
      )}
    </>
  );
}
