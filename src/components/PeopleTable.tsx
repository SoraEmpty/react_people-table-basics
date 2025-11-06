import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug: string | undefined;
  peopleByName: Map<string, Person>;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  peopleByName,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? peopleByName.get(person.motherName.toLowerCase().trim())
            : undefined;

          const father = person.fatherName
            ? peopleByName.get(person.fatherName.toLowerCase().trim())
            : undefined;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                  {mother
                    ? <PersonLink person={mother} />
                    : person.motherName
                      ? person.motherName
                      : "-"
                  }
              </td>

                              <td>
                  {father
                    ? <PersonLink person={father} />
                    : person.fatherName
                      ? person.fatherName
                      : "-"
                  }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
