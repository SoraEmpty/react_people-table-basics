import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleByName, setPeopleByName] = useState<Map<string, Person>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(receivedPeople => {
        const peopleWithSlug = receivedPeople.map(person => ({
          ...person,
          slug: `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`,
        }));

        setPeople(peopleWithSlug);
        setPeopleByName(
          new Map(peopleWithSlug.map(p => [p.name.toLowerCase().trim(), p])),
        );
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !error && people.length > 0 && (
        <PeopleTable
          people={people}
          selectedSlug={slug}
          peopleByName={peopleByName}
        />
      )}
    </>
  );
};
