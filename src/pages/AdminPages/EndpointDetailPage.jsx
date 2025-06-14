import { useParams, Navigate } from 'react-router-dom';
import { collections } from '../../utils/data';
import EndpointPage from '../../ui-components/AdminPage/EndpointPage';

export default function EndpointDetailPage() {
  const { endpointName } = useParams();
  
  const allEndpoints = collections.flatMap(collection => collection.endpoints);
  const endpoint = allEndpoints.find(ep => ep.slug === endpointName);

  if (!endpoint) {
    return <Navigate to="/" />;
  }

  return <EndpointPage endpoint={endpoint} />;
}